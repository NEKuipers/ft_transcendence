import { defineStore } from 'pinia'

// interface login {
//     loggedIn: boolean,
// }

class LoginData {
	userID: number;
	userName: string;
	TFAEnabled: boolean;

	constructor(userID: number, userName: string, TFAEnabled: boolean) {
		this.userID = userID;
		this.userName = userName;
		this.TFAEnabled = TFAEnabled;
	}
}


export const loginStatusStore = defineStore ('login', {
	state: () => ({
		// All these defaults should be changed, but currently set to these for testing.

		loggedInStatus: new LoginData(1, "nkuipers", false) as undefined | LoginData
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
