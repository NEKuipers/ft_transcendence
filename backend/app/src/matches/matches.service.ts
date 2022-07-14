import { Injectable } from '@nestjs/common';
import { Match, OngoingMatch, CompletedMatch } from './matches.interface';
import { request, createServer, IncomingMessage } from "http";

import axios from 'axios';

@Injectable()
export class MatchesService {
	ongoing_matches: OngoingMatch[] =  [
		{
			match_id: 42,
			player_one: "nkuipers",
			player_two: "tmullan",
			mode: "Classic",
		},
		{
			match_id: 45,
			player_one: "jsimonis",
			player_two: "mrpers",
			mode: "Speedup",
		},
		{
			match_id: 270,
			player_one: "jevan-de",
			player_two: "cwinner",
			mode: "Classic",
		},
	];

	matches: CompletedMatch [] = [
		{
			match_id: 1,
			player_one: "nkuipers",
			player_two: "tmullan",
			mode: "Classic",
			player_one_score: 3,
			player_two_score: 2,
		},
		{
			match_id: 2,
			player_one: "aaaa",
			player_two: "bbbb",
			mode: "Speedup",
			player_one_score: 5,
			player_two_score: 0,
		},
		{
			match_id: 3,
			player_one: "cccc",
			player_two: "dddd",
			mode: "Classic",
			player_one_score: 1,
			player_two_score: 4,
		},
		{
			match_id: 4,
			player_one: "jevan-de",
			player_two: "nkuipers",
			mode: "Classic",
			player_one_score: 1,
			player_two_score: 4,
		},
		{
			match_id: 5,
			player_one: "jsimonis",
			player_two: "nkuipers",
			mode: "Speedup",
			player_one_score: 1,
			player_two_score: 4,
		},
	];

	updateOngoingMatchesFromDataBase(): Promise<OngoingMatch[]> {
		return new Promise((accept, reject) => {
			axios.get(`http://localhost:${process.env.PGREST_PORT}/vw_spectate`)
				.then((response) => {
					if (response.status != 200) {
						console.log(`Got statusCode: ${response.status} (${response.statusText}): ${JSON.stringify(response.headers, null, 4)}`)
						reject(response);
						return;
					}

					//let json = JSON.parse(response.data);
					let json = response.data;

					let new_matches = [];
					for (let match of json) {
						new_matches.push(
							{
								match_id: match.match_id as number,
								player_one: match.player_one as string,
								player_two: match.player_two as string,
								mode: match.game_mode as string,
							}
						)
					}

					accept(new_matches);
				}).catch((error) => {
					console.log(`Got error: ${error}`)
					reject(error);
				});
		});
	}

	findAllCompleted(): CompletedMatch[] {
		return this.matches;
	}

	findAllOngoing(): Promise<OngoingMatch[]> {
		/*
		This is where a GET request needs to be made to the database.
		The response will replace the above placeholder variables.
		*/

		return this.updateOngoingMatchesFromDataBase();

		/*
		this.updateOngoingMatchesFromDataBase()
			.then((matches) => {
				this.ongoing_matches = matches;
			}).catch((error) => {
				console.error(`Got error doing request: ${error}`);
			});

		return this.ongoing_matches;
		*/
	}

	findOne(id: number): OngoingMatch {
		return this.ongoing_matches.find(ongoing_matches => ongoing_matches.match_id == id);
	}

	createMatch(match: Match) {
		//send POST request to database
		return "Match created";
	}

	updateMatch(id: number, match: Match) {
		//update match by id with new match content
		return "Match updated";
	}

}
