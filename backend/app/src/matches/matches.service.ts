import { Injectable } from '@nestjs/common';
import { Match, OngoingMatch, CompletedMatch } from './matches.interface';

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
			match_id: 46,
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

	findAllCompleted(): CompletedMatch[] {
		return this.matches;
	}

	findAllOngoing(): OngoingMatch[] {
		/*
		This is where a GET request needs to be made to the database.
		The response will replace the above placeholder variables.
		*/
		return this.ongoing_matches;
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
