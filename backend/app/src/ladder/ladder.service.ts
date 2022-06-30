import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Ladder } from './ladder.interface';

@Injectable()
export class LadderService {
	constructor(private readonly httpService: HttpService) {}
	ladder: Ladder[];

	findAll(): Observable<AxiosResponse<Ladder[]>> {		
		return this.httpService.get('https://localhost:3000');
	}

	findOne(id: number): Observable<AxiosResponse<Ladder>> {
		return this.httpService.get('https://localhost:3000' + id.toString());
	}
}
