import { Injectable } from '@nestjs/common';
import { Match, OngoingMatch, CompletedMatch } from './matches.interface';
import { request, createServer, IncomingMessage } from "http";

import axios from 'axios';

@Injectable()
export class MatchesService {
	findLastMatchesFromUser(id: number): Promise<CompletedMatch[]> {
		return new Promise((accept, reject) => {
			axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_matches?user_id=eq.${id}&limit=15&order=start_time.desc`)
				.then((response) => {
					if (response.status != 200) {
						console.log(`Got statusCode: ${response.status} (${response.statusText}): ${JSON.stringify(response.headers, null, 4)}`)
						reject(response);
						return;
					}
					accept(response.data);
				}).catch((error) => {
					console.log(`Got error: ${error}`)
					reject(error);
				});
		});
	}

	findAllOngoing(): Promise<OngoingMatch[]> {
		/*
		This is where a GET request needs to be made to the database.
		*/

		return new Promise((accept, reject) => {
			axios.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_spectate`)
				.then((response) => {
					if (response.status != 200) {
						console.log(`Got statusCode: ${response.status} (${response.statusText}): ${JSON.stringify(response.headers, null, 4)}`)
						reject(response);
						return;
					}
					accept(response.data);
				}).catch((error) => {
					console.log(`Got error: ${error}`)
					reject(error);
				});
		});
	}
}
