<template>
    <div v-if="channel!=null" class="chat-column">
        <div v-if="channel.type != `direct`"> 
            <h2>{{channel.name}}</h2>
        </div>
        <div id="messages">
            <div v-for="message in messages" :key="message.id" >
				<div v-if="message.user === loginStatusStore.loggedInStatus?.userID" >
					<div v-if="checkIfLink(message) == true">
						<a class="from-me" v-bind:href="message.message">Click here to join!</a>
					</div>
					<div v-else>
						<p class="from-me">{{message.message}}</p>
					</div>
				</div>
				<div v-else>
					<p v-if="haveYouBlockedUser(message.user)"  class="from-them">[message from blocked user]</p>
					<div v-else-if="checkIfLink(message) == true">
						<a v-if="dmOpen" class="from-them" v-bind:href="message.message">Click here to join!</a>
						<a v-else class="from-them" v-bind:href="message.message">{{findUsername(message.user)}} : Click here to join!</a>
					</div>
					<div v-else>
						<p v-if="dmOpen" class="from-them">{{message.message}}</p>
						<p v-else class="from-them">{{findUsername(message.user)}} : {{message.message}}</p>
					</div>
				</div>
            </div>
        </div>
        <div>
            <form ref="TextBox" @submit="sendMsg">
                <input id="input-box" type="text" v-model="text" placeholder="Message" :disabled="mutedUntil && mutedUntil > new Date()"/>
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

type Message = {
	channel_id: number,
	user: number,
	message: string
}

export default defineComponent({
    name: "ChatBox",
    props: {
        channel_id: {
            type: Number
        },
        mutedUntil: {
            type: Date
        },
        allUsers: {
            type: Array as any,
        },
        dmOpen: {
            type: Boolean
        },
        messages: Array as any // Maaaaybe could import interfaces and stuff
        // channel_name: String // TODO
    },
    data() {
        return {
            loginStatusStore: loginStatusStore(),
            channel: null as any,
            text: "",
            user: null as any,
            usersWhoYouHaveBlocked: new Array<number>(),
        };
    },
    watch: {
        channel_id: {
            handler(newValue) {
                if (!newValue) {
                    return;
                }
                fetch("/api/channels/" + this.channel_id)
                    .then(res => res.json())
                    .then(data => { this.channel = data[0]; })
                    .catch(err => console.log("Error retrieving channel", err));
            }
        },
        messages: {
            handler(newValue) {
                const container = this.$el.querySelector("#messages");
                setTimeout(function () {
                    if (!container) {
                        return;
                    }
                    container.scrollTop = container.scrollHeight;
                }, 2);
            },
            deep: true
        },
    },
    methods: {
        sendMsg(e: any) {
            e.preventDefault();
            if (this.text) {
                this.$emit("sentMsg", this.channel_id, this.text);
            }
            this.text = "";
        },
        haveYouBlockedUser(sender_id: number): boolean {
			console.log("Checking for blocked user")
            for (let x = 0; x < this.usersWhoYouHaveBlocked.length; x++) {
				console.log("Blocked users: ", this.usersWhoYouHaveBlocked[x])
				console.log("User who sent message:", sender_id)
                if (this.usersWhoYouHaveBlocked[x] == sender_id) {
                    return true;
                }
            }
            return false;
        },
        findUsername(user_id: number): string {
            for (let x = 0; x < this.allUsers.length; x++) {
                if (this.allUsers[x].id == user_id) {
                    return this.allUsers[x].username;
                }
            }
            return "user " + user_id;
        },

		/* generate random game link */ 
		dec2hex(dec: number) {
			return dec.toString(16).padStart(2, "0")
		},
		generateGameId() : string {
			var arr = new Uint8Array((16 || 40) / 2)
			window.crypto.getRandomValues(arr)
			return Array.from(arr, this.dec2hex).join('')
		},
        sendGameInvite(to_username: string, game_mode: string) {
            this.$emit("sentMsg", this.channel_id, `Hey ${to_username}, I want to play a game of Pong ${game_mode} with you!`);
            this.$emit("sentMsg", this.channel_id, `/pong/${game_mode}/${this.generateGameId()}`);
        },
		checkIfLink(message: Message) : boolean {
			return (message.message.startsWith(`/pong/`))
		},
    },
    async mounted() {
        let loggedInStatus = await loginStatusStore().logIn();
        if (loggedInStatus) {
            await fetch("/api/blocked_users/all_who_i_have_blocked/" + loggedInStatus.userID)
			// await fetch("/api/vw_blocked_users?user_id?eq." + loggedInStatus.userID)
                .then(res => res.json())
                .then(data => { this.usersWhoYouHaveBlocked = data ; console.log(this.usersWhoYouHaveBlocked)})
                .catch(err => console.log(err));
        }
    },
    emits: ["sentMsg"],
})
</script>

<style scoped>
#messages {
  background-color: #fff;
  min-width: 600px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
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

#messages a {
  border-radius: 1.15rem;
  line-height: 1.25;
  max-width: 75%;
  padding: 0.5rem .875rem;
  position: relative;
  word-wrap: break-word;
}

a.from-me {
  align-self: flex-end;
  float: right;
  background-color: #05315c;
  color: #fff; 
  
}

a.from-me::before {
  border-bottom-left-radius: 0.8rem 0.7rem;
  border-right: 1rem solid #05315c;
  right: -0.35rem;
  transform: translate(0, -0.1rem);
}

a.from-me::after {
  background-color: #fff;
  border-bottom-left-radius: 0.5rem;
  right: -40px;
  transform:translate(-30px, -2px);
  width: 10px;
}

a.from-them {
  align-items: flex-start;
  background-color: #05315c;
  color: #000;
}

a.from-them:before {
  border-bottom-right-radius: 0.8rem 0.7rem;
  border-left: 1rem solid #e5e5ea;
  left: -0.35rem;
  transform: translate(0, -0.1rem);
}

a.from-them::after {
  background-color: #fff;
  border-bottom-right-radius: 0.5rem;
  left: 20px;
  transform: translate(-30px, -2px);
  width: 10px;
}

a[class^="from-"] {
  margin: 0.5rem 0;
  width: fit-content;
}

a.from-me ~ a.from-me {
  margin: 0.25rem 0 0;
}

a.from-me ~ a.from-me:not(:last-child) {
  margin: 0.25rem 0 0;
}

a.from-me ~ a.from-me:last-child {
  margin-bottom: 0.5rem;
}

a.from-them {
	display: flex;
  align-items: flex-start;
  background-color: #42b983;
  color: white;
}

a.from-them:before {
  border-bottom-right-radius: 0.8rem 0.7rem;
  border-left: 1rem solid #e5e5ea;
  left: -0.35rem;
  transform: translate(0, -0.1rem);
}

a.from-them::after {
  background-color: #fff;
  border-bottom-right-radius: 0.5rem;
  left: 20px;
  transform: translate(-30px, -2px);
  width: 10px;
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
