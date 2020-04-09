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
        async loadUser({commit}, ID) {
            await api.load("users", ID)
                .then((res) => {
                    commit("setUser", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async createUser({commit, getters}, user) {
            if(user) {
                user.ID = getters.getLastUser ? (getters.getLastUser.ID + 1) : 0;
                user.AuthorID = 1;
                user.Created = new Date();
                await api.create("users", user)
                    .then(() => {
                        commit("addUser", user);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async updateUser({commit, getters}, {key, values}) {
            const user = getters.getUser(key);
            if(user && user.ID) {
                user.EditorID = 1;
                user.Modified = new Date();
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
        async deleteUser({commit}, ID) {
            await api.delete("users", ID)
                .then(() => {
                    commit("removeUser", {ID});
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
        getUserCount: (state) => {
            return state.users.length;
        },
        getUser: (state) => (ID) => {
            return state.users.find(t => t.ID == ID);
        },
        getLastUser: (state) => {
            return state.users.reduce((a, c) => a.ID > c.ID ? a : c);
        }
    }
}