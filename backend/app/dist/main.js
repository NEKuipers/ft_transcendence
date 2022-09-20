"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(session({
        cookie: {
            maxAge: 60000 * 60 * 24,
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(parseInt(process.env.NESTJS_PORT) || 3030);
}
bootstrap();
//# sourceMappingURL=main.js.map