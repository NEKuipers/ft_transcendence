import { Injectable } from '@nestjs/common';
// import { HttpModule, HttpService } from '@nestjs/axios';

@Injectable()
export class LoginService {
    // constructor(private readonly httpService: HttpService) {}

    returnToken(): void {
        const auth = 'https://api.intra.42.fr/oauth/authorize?'
        // console.log(this.httpService.get('https://ecosia.com'))
    }
}
