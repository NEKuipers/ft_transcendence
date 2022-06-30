import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Ladder } from './ladder.interface';

@Injectable()
export class LadderService {
	//WORK IN PROGRESS... find out how to connect to DB
	// constructor(private readonly httpService: HttpService) {}
	ladder: Ladder[];

	findAll() : Ladder [] {
		return this.ladder;
	}
	findOne(id: number): Ladder {
		return this.ladder.find(ladder => ladder.user_id == id);
	}
	// findAll(): Observable<AxiosResponse<Ladder[]>> {		
	// 	return this.httpService.get('https://localhost:3000');
	// }

	// findOne(id: number): Observable<AxiosResponse<Ladder>> {
	// 	return this.httpService.get('https://localhost:3000' + id.toString());
	// }
}
