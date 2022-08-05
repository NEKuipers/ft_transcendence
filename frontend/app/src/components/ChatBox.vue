<template>
    <div v-if="channel!=null" class="column">
        <div> 
            <h2>{{channel.name}}</h2>
        </div>
        <!-- <div id="chat-column"> -->
        <div class="messages">
            <div v-for="message in messages" :key="message.id" >
                <p v-if="message.user_id !== loginStatusStore.loggedInStatus?.userID" class="from-them">
                    {{ message.message }}
                </p>
                <p v-else class="from-me">
                    {{message.message}}
                </p>
            </div>
        <!-- </div> -->
        </div>
        <div>
            <form ref="TextBox" @submit="sendMsg">
                <input id="input-box" type="text" v-model="text" placeholder="Message"/>
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
        }
    },
    data() {
        return {
            loginStatusStore: loginStatusStore(),
            channel: null,
            messages: null, // Retrieve these from channel ID
            text: ''
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
                fetch('/api/messages/channel/' + this.channel_id)
                .then(res => res.json())
                .then(data => { /* console.log(data) ;*/ this.messages = data })
                .catch(err => console.log('Error retrieving messages for channel', err))
            }
        },
        
        // messages: {
        //     handler(newValue) {
        //         fetch('/api/messages/channel/' + this.channel_id)
        //         .then(res => res.json())
        //         .then(data => { /* console.log(data) ;*/ this.messages = data })
        //         .catch(err => console.log('Error retrieving messages for channel', err))
        //     }
        // }
    },
    methods: {
        sendMsg(e: any) {
            e.preventDefault()
            if (this.text) {
                fetch('/api/messages/', {
                    method: "POST",
                    body: JSON.stringify({
                        "channel_id": this.channel_id,
                        "user_id": loginStatusStore().loggedInStatus?.userID,
                        "message": this.text
                    }),
                    headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
                })
                .then(() => { this.updateMessages(); this.text = "" })
                .catch(err => console.log('Problem sending text', err))
            }
        },
        updateMessages() {
            fetch('/api/messages/channel/' + this.channel_id)
            .then(res => res.json())
            .then(data => { /* console.log(data) ;*/ this.messages = data })
            .catch(err => console.log('Error retrieving messages for channel', err))  
        }
    }
})

</script>

<style scoped>

/* .column {
	background-color: #f4f4f4;
	display: flex;
	flex-direction:column;
	float:left;
	padding:10px;
	box-sizing: border-box; /*this adds the border+padding into the width. can also look at flexbox*/
	/* height: 850px; */
/* }

/* .msg {
    background-color: teal;
    border: 2px solid teal;
    border-radius: 10px;
    text-align:left;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    height: 40px;
    width: 200px;
} */

.messages {
  background-color: #fff;
  /* border: 1px solid #e5e5ea;
  border-radius: 0.25rem; */
  width: 800px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  font-family: "SanFrancisco";
  font-size: 1.25rem;
  margin: 0 auto 1rem;
  max-height: 800px;
  max-width: 800px;
  overflow: auto;
  padding: 0.5rem 1.5rem;
  /* box-sizing: border-box; */
  justify-content: space-between;
}

.messages p {
  border-radius: 1.15rem;
  line-height: 1.25;
  max-width: 75%;
  padding: 0.5rem .875rem;
  position: relative;
  word-wrap: break-word;
}

p.from-me {
  align-self: flex-end;
  /* margin-left: auto; */
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
