import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
// import * as redis from 'redis'
// import * as connectRedis from 'connect-redis'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const client = redis.createClient({url: process.env.REDIS_URL})
  // const RedisStore = connectRedis(session)
  // client.on('connect', () => console.log('connected to redis'))
  app.enableCors();
  app.use(session({
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    secret: 'diorandagio',
    resave: false,
    saveUninitialized: false,
    // store: new RedisStore({client})
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(parseInt(process.env.NESTJS_PORT) || 3030);
}
bootstrap();