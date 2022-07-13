import { Injectable } from '@nestjs/common';
import { Match, OngoingMatch, CompletedMatch } from './matches.interface';
import { request, createServer, IncomingMessage } from "http";

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
			mode: "HyperPong",
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
			mode: "Hyperpong",
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
			mode: "Hyperpong",
			player_one_score: 1,
			player_two_score: 4,
		},
	];

	updateOngoingMatchesFromDataBase(): Promise<OngoingMatch[]> {
		return new Promise((accept, reject) => {
			let req = request({
				hostname: 'localhost',
				port: +process.env.PGREST_PORT,
				path: "/matches?status=eq.ongoing",
				method: "GET",
			}, res => {
				//console.log("Got res: ", res);
	
				if (res.statusCode != 200) {
					console.log(`Got statusCode: ${res.statusCode} (${res.statusMessage}): ${JSON.stringify(res.headers, null, 4)}`)
					reject(res);
					return;
				}
	
				res = res.setEncoding('utf8');
	
				let combined = "";
				res.on("data", chunk => {
					//console.log("Got chunk:", chunk)
					combined += chunk;
				})
				res.on("end", () => {
					//console.log("End of transmission")
					let json = JSON.parse(combined);
	
					//console.log(`Its ret is: ${JSON.stringify(json, null, 4)}`);
	
					var new_matches = [];
					for (var match of json) {
						new_matches.push(
							{
								match_id: match.id as number,
								player_one: "player" + (match.player_one as number),
								player_two: "player" + (match.player_two as number),
								mode: "unknown",
							}
						)
					}

					accept(new_matches);
				})
			});
		
			req.on("error", error => {
				//console.error(`Got error doing request: ${error}`);
				reject(error);
			})
	
			req.end();
		})

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
