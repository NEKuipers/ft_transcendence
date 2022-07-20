import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'

// interface login {
//     loggedIn: boolean,
// }

class LoginData {
	userID: number;
	userName: string;
	TFAEnabled: boolean;

	authString: string;	// Not %100 sure this is the correct place for this

	constructor(userID: number, userName: string, TFAEnabled: boolean, authString: string) {
		this.userID = userID;
		this.userName = userName;
		this.TFAEnabled = TFAEnabled;

		this.authString = authString;
	}
}


export const loginStatusStore = defineStore ('login', {
	state: () => ({
		// All these defaults should be changed, but currently set to these for testing.

		loggedInStatus: new LoginData(1, "nkuipers", false, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoibmt1aXBlcnMifQ.5P5h3p-V1fwh0h61Hd_MFzbsaglRBdE2hME6ew112y0") as undefined | LoginData
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
