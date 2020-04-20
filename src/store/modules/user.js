import api from "@/api"

export default {
    
    actions: {
        async loadUsers({commit}) {
            await api.load("users")
                .then((res) => {
                    commit("setUsers", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async loadUser({commit}, key) {
            await api.load("users", key)
                .then((res) => {
                    commit("setUser", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async createUser({commit, getters}, values) {
            const user = getters.getUserByTitle(values.Title);
            if(!user) {
                await api.create("users", values)
                    .then(() => {
                        commit("addUser", values);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async updateUser({commit, getters}, {key, values}) {
            const user = getters.getUserByID(key);
            if(user && user.ID) {
                Object.assign(user, values);
                await api.update("users", user.ID, user)
                    .then(() => {
                        commit("setUser", user);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async deleteUser({commit}, key) {
            await api.delete("users", key)
                .then(() => {
                    commit("removeUser", {ID:key});
                })
                .catch(e => {
                    throw e;
                })
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setUser(state, user) {
            const stateUser = state.users.find(t => t.ID == user.ID);
            if(stateUser) {
                Object.assign(stateUser, user);
            }
        },
        addUser(state, user) {
            state.users.push(user);
        },
        removeUser(state, user) {
            state.users = state.users.filter(t => t.ID != user.ID);
        },
    },
    state: {
        users: [],
    },
    getters:{
        getUsers: (state) => {
            return state.users;
        },
        getUserByID: (state) => (ID) => {
            return state.users.find(u => u.ID == ID);
        },
        getUserByTitle: (state) => (Title) => {
            return state.users.find(u => u.Title == Title);
        }
    }
}