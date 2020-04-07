import axios from "axios"

const url = "http://localhost:3000/users";

function initUser(user) {
    if(user.AuthorID) {
        user.Author = {};
    }
}

export default {
    actions: {
        async loadUsers({commit}) {
            await axios.get(url)
                .then((res) => {
                    commit("setUsers", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async loadUser({commit}, ID) {
            await axios.get(url + "/" + ID)
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
                await axios.post(url, user)
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
                await axios.put(url + "/" + user.ID, user)
                    .then(() => {
                        commit("setUser", user);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async deleteUser({commit}, ID) {
            await axios.delete(url + "/" + ID)
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
            for(const user of users) {
                initUser(user);
            }
            state.users = users;
        },
        setUser(state, user) {
            initUser(user);
            state.users = state.users.filter(t => t.ID != user.ID).push(user);
        },
        addUser(state, user) {
            initUser(user);
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