<template>
	<div class ="friendlist">
		<h5 id="title">Friends</h5>
		<div v-if="!friends">
			<h3>Friend list failed to load</h3>
		</div>
		<div class="list" v-else-if="friends.length">
			<div v-for="friend in friends" :key="friend?.id">
				<section class="listed-friend">
					<div id="name-image">
						<img class="profilePictureThumbnail" width="30" height="30" v-bind:src="'/api/avatars/' + friend.friend_avatar_id"/> 
						<a class="username" v-bind:href="'/profile/' + friend.to_user_id">{{friend.to_username}}</a>
					</div>
					<div id="statusAndButton">
						<div class="online-status">
							<h4 class="online-status" v-if="friend?.friend_status == 'online'" id="online">Online</h4>
							<h4 class="online-status"  v-else-if="friend?.friend_status == 'ingame'" id="ingame">In game</h4>
							<h4 class="online-status" v-else>Offline</h4>
						</div>
						<SmallButton id="dm-btn" text="DM" @click="openDirectMessage(friend.from_user_id, friend.to_user_id)"/>
					</div>
				</section>
			</div>
		</div>
		<div v-else>
			<h3>No friends yet</h3>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from './SmallButton.vue'

export default defineComponent({
	name: 'ChatFriendsList',
	props: {
		user: {
			type: Number
		},

	},
	data () {
		return {
			friends: null as any,
		}
	},
	watch: {
		user: {
			handler(newValue) {				
				if (!newValue) { return; }
				this.updateFriendList(newValue)
			},
			immediate: true
		}
	},
	components: {
		SmallButton,
	},
	methods: {
		async updateFriendList(user_id: number) {
			if (user_id == undefined) {
				return;
			}
			fetch('/api/friends/' + user_id)
				.then(res => res.json())
				.then(data => this.friends = data)
				.catch(err => console.log(err));
		},
		openDirectMessage(user_id_1: number, user_id_2: number) {
			this.$emit('openDM', user_id_1, user_id_2);
		}
	},
	emits: ['openDM']
})
</script>

<style scoped>
.friendlist {
	display: flex;
	flex-direction: column;
	overflow: auto;
	align-items: flex-start;
	width: 100%;
}

.username {
	margin-left: 10px;
	margin-top: 12px;
	font-size: 13pt;
	font-weight: bold;
	text-decoration: none;
	/* padding-left: 5px; */
	float: left;

}

a:visited {
  color: #2c3e50;
}

a:hover {
	text-decoration: underline;
}


#statusAndButton {
	width:200px;
	justify-content: right;
	display: flex;
	align-items: flex-start;
	box-sizing: border-box;

}

#name-image {
	display: flex;
	box-sizing: border-box;
	align-items: flex-start;
}

#title {
	margin-top: 20px;
	font-size: 24px;
	margin-bottom: 15px;
}

.list {
	margin-top: -20px;
}

.listed-friend{
	display: flex;
	justify-content: space-between;
	font-size: large;
	box-sizing: border-box;
	align-items: flex-start;
	margin-left: -20px;
	margin-right: 40px;
	min-width: 300px;
	max-width: 450px;
	max-height: 40px;
	margin-top: 0px;
	margin-bottom: 0px;
}

#online {
  color: #42b983;

}

#ingame {
  color: #42b983;

}

#name-image {
	margin-top: 10px;
}

#online-status {
	float: left;
}

#dm-btn {
	margin-left: 20px;
	margin-right: 5px;
	margin-top: 25px;
}

.profilePictureThumbnail {
	margin-top: 5px;
	margin-left: 20px;
	padding-top: 0px;
	float: left;

}
</style>