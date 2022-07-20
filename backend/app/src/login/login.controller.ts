import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
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
    @UseGuards(IntraAuthGuard)
    callback(@Req() req: any, @Res() res: Response) {

        console.log('Holy fuckin shit', req.user)
        res.redirect('http://localhost:8080/')
    }

    @Get('status')
    @UseGuards(AuthenticatedGuard)
    status() {
        return 'ok'
    }

}


