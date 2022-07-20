import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express'
import { AuthenticatedGuard, IntraAuthGuard } from './guards';

@Controller('login')
export class LoginController {
    // constructor(private readonly loginService: LoginService) {}

    /* 
        This is the route for intra authentication
    */
    @Get()
    @UseGuards(IntraAuthGuard)
    OAuthRequest(): any {
        return 'Ye';
    }

    /* 
        This is the redirect URL the OAuth2 Provider will call
    */
    @Get('callback')
    @UseGuards(IntraAuthGuard) // for some reason the first time, it isn't authenticated yet
    callback(@Req() req: Request, @Res() res: Response) {

        // console.log('Cookies?', req.cookies["connect.sid"])
        res.redirect('http://localhost:8081/')
    }

    @Get('status')
    @UseGuards(AuthenticatedGuard)
    status() {
        return 'ok'
    }

}


