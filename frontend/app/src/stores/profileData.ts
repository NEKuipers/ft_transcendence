import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'

// interface login {
//     loggedIn: boolean,
// }


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
