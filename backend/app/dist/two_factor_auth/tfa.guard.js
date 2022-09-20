"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFAGuard = void 0;
const common_1 = require("@nestjs/common");
const two_factor_auth_service_1 = require("./two_factor_auth.service");
const guards_1 = require("../login/guards");
let TFAGuard = class TFAGuard extends guards_1.AuthenticatedGuard {
    constructor(twoFactorAuthService) {
        super();
        this.twoFactorAuthService = twoFactorAuthService;
    }
    async canActivate(context) {
        if (!await super.canActivate(context)) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        let userId = request.user.id;
        if (userId === undefined) {
            throw new common_1.HttpException("Cannot use TFA guard while not using OAuth", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        let needs_tfa = await this.twoFactorAuthService.is_tfa_setup(userId, request.session);
        if (needs_tfa) {
            if (!request.session.tfa_authenticated) {
                return false;
            }
        }
        return true;
    }
};
TFAGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [two_factor_auth_service_1.TwoFactorAuthService])
], TFAGuard);
exports.TFAGuard = TFAGuard;
//# sourceMappingURL=tfa.guard.js.map