export class LoginData {
	userID: number;
	userName: string;
	TFAEnabled: boolean;

	constructor(userID: number, userName: string, TFAEnabled: boolean) {
		this.userID = userID;
		this.userName = userName;
		this.TFAEnabled = TFAEnabled;
	}
}