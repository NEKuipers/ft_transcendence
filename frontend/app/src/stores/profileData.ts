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

})
