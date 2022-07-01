import { defineStore } from 'pinia'

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


export const loginStatusStore = defineStore ({
	id: 'login',

	state: () => ({
		// All these defaults shuold be changed, but currently set to these for testing.

		loggedInStatus: new LoginData(3, "nkuipers", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjMsInVzZXJuYW1lIjoibmt1aXBlcnMifQ.9UXbpTe67YNIz4EsQbqo0cHXDuKGL3gzaRaBtJ0o81s") as undefined | LoginData
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
})
