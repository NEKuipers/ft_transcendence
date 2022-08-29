import { defineStore } from 'pinia'

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
	state: () => {
		// All these defaults should be changed, but currently set to these for testing.

		return {
			//loggedInStatus: new LoginData(1, "nkuipers", false) as undefined | LoginData
			loggedInStatus: undefined as undefined | LoginData,
			isLoaded: false,
		}
	},
	getters: {},
	actions: {
		async logIn(): Promise<undefined | LoginData> {
			if (this.loggedInStatus) {
				return this.loggedInStatus;
			}

			return new Promise((resolve, reject) => {
				fetch("/api/login/whoami")
					.then(data => {
						if (data.ok) {
							return data.json()
						} else {
							return undefined;
						}
					})
					.then(data => {
						this.loggedInStatus = data;
						this.isLoaded = true;
						resolve(this.loggedInStatus)
					})
					.catch(_ => {
						this.loggedInStatus = undefined;
						this.isLoaded = true;
						resolve(this.loggedInStatus)
					})
			})
		},
		async logOut(): Promise<void> {
			return fetch("/api/login/logout")
				.then((data) => {
					if (!data.ok) {
						console.error("Failed to logout!", data.statusText)
					}

					// Logout anyway
					this.loggedInStatus = undefined
				})
				.catch((err) => console.error(err));
		}
	}
})
