import { defineStore } from 'pinia'

// interface login {
//     loggedIn: boolean,
// }


export const loginStatusStore = defineStore ({
    id: 'login',
    state: () => ({
        loggedInStatus: false // This should default to false but is true for testing.
    }),
    getters: {},
    actions: {
        logIn(): void {
            this.loggedInStatus = true   
        },
        logOut(): void {
            this.loggedInStatus = false
        }
    }
})
