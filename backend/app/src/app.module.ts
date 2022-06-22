import { Module } from '@nestjs/common';
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

@Module({
  imports: [UsersModule, MatchesModule, MessagesModule, ParticipantsModule, TwoFactorAuthModule, ChannelsModule, UserAchievementsModule, AchievementsModule, BlockedUsersModule, AvatarsModule, FriendsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}