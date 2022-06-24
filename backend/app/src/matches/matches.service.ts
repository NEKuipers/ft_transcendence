import { Injectable } from '@nestjs/common';
import { Match, SpectateMatch } from './matches.interface';

@Injectable()
export class MatchesService {
	matches: SpectateMatch[] =  [
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

	findAll(): SpectateMatch[] {
		return this.matches;
	}
}
