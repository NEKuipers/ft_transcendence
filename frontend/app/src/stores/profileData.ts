import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'

// interface login {
//     loggedIn: boolean,
// }

class LoginData {
	userID: number;
	userName: string;

	authString: string;	// Not %100 sure this is the correct place for this

	constructor(userID: number, userName: string, authString: string) {
		this.userID = userID;
		this.userName = userName;

		this.authString = authString;
	}
}


export const useLoginStatusStore = defineStore ('login', {
    state: () => ({
        loggedInStatus: false, // This should default to false but is true for testing.
        diocane: 0
    }),
    actions: {
        logIn() {
            this.loggedInStatus = true
            this.diocane++
            console.log('So I have logged in', this.loggedInStatus)
        },
        logOut() {
            this.loggedInStatus = false
        }
    },
    getters: {
        getLoginStatus: (state) => state.loggedInStatus
    }

<<<<<<< HEAD
=======
	state: () => ({
		// All these defaults shuold be changed, but currently set to these for testing.

		loggedInStatus: new LoginData(3, "nkuipers", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjMsInVzZXJuYW1lIjoibmt1aXBlcnMifQ.h3HAJiIKBKXJgx8f3fOKVl7ssz0BLMwfx0eD_BjmJzs") as undefined | LoginData
	}),
	getters: {},
	actions: {
		logIn(loginData: LoginData): void {
			this.loggedInStatus = loginData   
		},
		logOut(): void {
			this.loggedInStatus = undefined
		}
	}
>>>>>>> ec1c7e910452b878e9e37bff058201b801891b29
})
