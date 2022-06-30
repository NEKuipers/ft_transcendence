import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(session({
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    secret: 'diorandagio',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(parseInt(process.env.NESTJS_PORT) || 3030);
}
bootstrap();