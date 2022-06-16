import { defineStore } from 'pinia'

// interface login {
//     loggedIn: boolean,
// }


export const loginStatusStore = defineStore ({
    id: 'login',
    state: () => ({
        loggedInStatus: 'Diocane'
    }),
    getters: {},
    actions: {
        // logIn(): void {
        //     this.loggedIn = 'Ora sium'   
        // },
        // logOut(): void {
        //     this.loggedIn = 'Diocane'
        // }
    }
})
