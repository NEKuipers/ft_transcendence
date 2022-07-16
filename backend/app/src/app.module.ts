import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
// import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
=======
>>>>>>> ec1c7e910452b878e9e37bff058201b801891b29
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
import { LadderModule } from './ladder/ladder.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '../../.env',
<<<<<<< HEAD
  }),
  PassportModule.register({ session: true}),
  UsersModule, MatchesModule, MessagesModule,
  ParticipantsModule, TwoFactorAuthModule, ChannelsModule, UserAchievementsModule, AchievementsModule, BlockedUsersModule, 
  AvatarsModule, FriendsModule, LoginModule, LadderModule],
  controllers: [AppController],
  providers: [AppService],
=======
  }), UsersModule, MatchesModule, MessagesModule, ParticipantsModule, TwoFactorAuthModule, ChannelsModule, UserAchievementsModule, AchievementsModule, BlockedUsersModule, AvatarsModule, FriendsModule, LadderModule],
  controllers: [],
  providers: [],
>>>>>>> ec1c7e910452b878e9e37bff058201b801891b29
})
export class AppModule {}