import axios from "axios"

export default {
    actions: {
        async loadUsers({commit}) {
            axios.get('http://localhost:3000/users')
            .then(response => {
                const users = response.data;
                commit("setUsers", users);
                return users;
            })
            .catch(e => {
                throw e;
            })
        },
    },
    mutations: {
        setUsers(state, users) {
            state.users = users
        },
    },
    state: {
        users: [],
    },
    getters:{
        getUsers(state){
            return state.users;
        }
    }
}