import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';
import { getgroups } from 'process';
import { Observable } from 'rxjs';

@Injectable()
export class IntraAuthGuard extends AuthGuard('42') {
    async canActivate(context: ExecutionContext): Promise<any> {
        const activate = (await super.canActivate(context)) as boolean
        console.log(activate)
        const request = context.switchToHttp().getRequest()
        console.log(request)
        await super.logIn(request)
        return activate
    }
}