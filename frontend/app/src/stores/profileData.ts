import { defineStore } from 'pinia'

// interface login {
//     loggedIn: boolean,
// }


export const loginStatusStore = defineStore ({
    id: 'login',
    state: () => ({
        loggedInStatus: false
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
