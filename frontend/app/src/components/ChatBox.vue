<template>
    <div v-if="channel!=null" class="chat-column">
        <div> 
            <h2>{{channel.name}}</h2>
        </div>
        <div id="messages">
            <div v-for="message in messages" :key="message.id" >
				<p v-if="message.user === loginStatusStore.loggedInStatus?.userID" class="from-me">{{message.message}}</p>
				<div v-else>
					<p v-if="haveYouBlockedUser(message.user)"  class="from-them">[message from blocked user]</p>
					<p v-else class="from-them">{{findUsername(message.user)}} : {{message.message}}</p>
				</div>
            </div>
        </div>
        <div>
            <form ref="TextBox" @submit="sendMsg">
                <input id="input-box" type="text" v-model="text" placeholder="Message" :disabled="isMuted > Date.now().toString()"/>
            </form>
        </div>
    </div>
    <div v-else>
        <h2>
            Channel to be displayed here
        </h2>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { loginStatusStore } from '../stores/profileData'

export default defineComponent({
    name: 'ChatBox',
    props: {
        channel_id: {
            type: Number
		},
		isMuted: {
			type: String
		},
		allUsers: {
			type: Array as any,
		},
		dmOpen : {
			type: Boolean
		},
		messages: null as any // Maaaaybe could import interfaces and stuff
		// channel_name: String // TODO
    },
    data() {
        return {
            loginStatusStore: loginStatusStore(),
            channel: null as any,
            text: '',
			user: null as any,
			usersWhoYouHaveBlocked: new Array<any>(),
			}
    },
    watch: {
        channel_id: {
            handler(newValue) {
                if (!newValue) { return; }
                fetch('/api/channels/' + this.channel_id)
					.then(res => res.json())
					.then(data => { this.channel = data[0] })
					.catch(err => console.log('Error retrieving channel', err))
            }
        },
		messages: {
			handler(newValue) {
				const container = this.$el.querySelector("#messages")
				setTimeout(function() {
					if (!container) {
						return
					}
					container.scrollTop = container.scrollHeight
				}, 2)
			},
			deep: true	
		},
    },
    methods: {
        sendMsg(e: any) {
            e.preventDefault()
			if (this.text) {
				this.$emit("sentMsg", this.channel_id, this.text)
			}
			this.text=""
			
			// console.log(this.messages)
        },
		haveYouBlockedUser(sender_id: number): boolean {
			for (let x = 0; x < this.usersWhoYouHaveBlocked.length; x++) {
				if ( this.usersWhoYouHaveBlocked[x] == sender_id) {
					return true;
				}
			}
			return false;
		},
		findUsername(user_id: number) : string {
			for (let x = 0; x < this.allUsers.length; x++) {
				if (this.allUsers[x].id == user_id) {
					return this.allUsers[x].username;
				}
			}
			return "user " + user_id;
		}
    },
	async mounted() {
		let loggedInStatus = await loginStatusStore().logIn();
		if (loggedInStatus) {
			await fetch('/api/blocked_users/all_who_i_have_blocked/' + loggedInStatus.userID)
			.then(res => res.json())
			.then(data => this.usersWhoYouHaveBlocked = data)
			.catch(err => console.log(err));
		}
	},
	emits: ['sentMsg']
})
</script>

<style scoped>
#messages {
  background-color: #fff;
  min-width: 600px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  font-family: "SanFrancisco";
  font-size: 1.25rem;
  margin: 0 auto 1rem;
  max-height: 800px;
  max-width: 1000px;
  max-width: 90%;
  overflow: auto;
  padding: 0.5rem 1.5rem;
  justify-content: space-between;
}

#messages p {
  border-radius: 1.15rem;
  line-height: 1.25;
  max-width: 75%;
  padding: 0.5rem .875rem;
  position: relative;
  word-wrap: break-word;
}

p.from-me {
  align-self: flex-end;
  float: right;
  background-color: #248bf5;
  color: #fff; 
  
}

p.from-me::before {
  border-bottom-left-radius: 0.8rem 0.7rem;
  border-right: 1rem solid #248bf5;
  right: -0.35rem;
  transform: translate(0, -0.1rem);
}

p.from-me::after {
  background-color: #fff;
  border-bottom-left-radius: 0.5rem;
  right: -40px;
  transform:translate(-30px, -2px);
  width: 10px;
}

p.from-them {
  align-items: flex-start;
  background-color: #e5e5ea;
  color: #000;
}

p.from-them:before {
  border-bottom-right-radius: 0.8rem 0.7rem;
  border-left: 1rem solid #e5e5ea;
  left: -0.35rem;
  transform: translate(0, -0.1rem);
}

p.from-them::after {
  background-color: #fff;
  border-bottom-right-radius: 0.5rem;
  left: 20px;
  transform: translate(-30px, -2px);
  width: 10px;
}

p[class^="from-"] {
  margin: 0.5rem 0;
  width: fit-content;
}

p.from-me ~ p.from-me {
  margin: 0.25rem 0 0;
}

p.from-me ~ p.from-me:not(:last-child) {
  margin: 0.25rem 0 0;
}

p.from-me ~ p.from-me:last-child {
  margin-bottom: 0.5rem;
}

p.from-them {
  align-items: flex-start;
  background-color: #e5e5ea;
  color: #000;
}

p.from-them:before {
  border-bottom-right-radius: 0.8rem 0.7rem;
  border-left: 1rem solid #e5e5ea;
  left: -0.35rem;
  transform: translate(0, -0.1rem);
}

p.from-them::after {
  background-color: #fff;
  border-bottom-right-radius: 0.5rem;
  left: 20px;
  transform: translate(-30px, -2px);
  width: 10px;
}

p[class^="from-"].emoji {
  background: none;
  font-size: 2.5rem;
}

p[class^="from-"].emoji::before {
  content: none;
}

.no-tail::before {
  display: none;
}

.margin-b_none {
  margin-bottom: 0 !important;
}

.margin-b_one {
  margin-bottom: 1rem !important;
}

.margin-t_one {
  margin-top: 1rem !important;
}

#input-box {
	margin-top: 20px;
	width: 80%;
	height:45px;
	font-size: 20px;
	max-width: 1000px;
}

/* #messages {
	padding-bottom: 100px;
	height: 850px;
	margin-left: 20px;
	margin-right: 20px;
    width: 800px;
} */

#chat-column {
	height: 680px;
	margin-left: 20px;
	margin-right: 20px;
	overflow: auto;
	/* float: center; */
	justify-content: center;
	width: 95%;
	font-size: 14pt;
	background-color: white;

	/* flex: 1 0; */
	/* flex-wrap: wrap; */
}
</style>
