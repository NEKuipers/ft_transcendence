import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { MessagesModule } from './messages/messages.module';
import { ParticipantsModule } from './participants/participants.module';
import { TwoFactorAuthModule } from './two_factor_auth/two_factor_auth.module';
import { ChannelsModule } from './channels/channels.module';
import { UserAchievementsModule } from './user_achievements/user_achievements.module';
import { AchievementsModule } from './achievements/achievements.module';
import { BlockedUsersModule } from './blocked_users/blocked_users.module';
import { AvatarsModule } from './avatars/avatars.module';
import { FriendsModule } from './friends/friends.module';
import { LoginModule } from './login/login.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '../../.env',
  }),
  PassportModule.register({ session: true}),
  UsersModule, MatchesModule, MessagesModule,
  ParticipantsModule, TwoFactorAuthModule, ChannelsModule, UserAchievementsModule, AchievementsModule, BlockedUsersModule, 
  AvatarsModule, FriendsModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}