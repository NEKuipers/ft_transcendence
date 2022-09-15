import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { ParticipantsModule } from './participants/participants.module';
import { TwoFactorAuthModule } from './two_factor_auth/two_factor_auth.module';
import { ChannelsModule } from './channels/channels.module';
import { AchievementsModule } from './achievements/achievements.module';
import { BlockedUsersModule } from './blocked_users/blocked_users.module';
import { AvatarsModule } from './avatars/avatars.module';
import { FriendsModule } from './friends/friends.module';
import { LoginModule } from './login/login.module';
import { PassportModule } from '@nestjs/passport';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '../../.env',
  }),
  PassportModule.register({ session: true}),
  UsersModule, MatchesModule,
  ParticipantsModule, TwoFactorAuthModule, ChannelsModule, AchievementsModule, BlockedUsersModule, 
  AvatarsModule, FriendsModule, LoginModule, ProfileModule],
})
export class AppModule {}