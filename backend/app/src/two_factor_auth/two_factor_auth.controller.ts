import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TwoFactorAuthService } from './two_factor_auth.service';

@Controller('two-factor-auth')
export class TwoFactorAuthController {
	constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}
}
