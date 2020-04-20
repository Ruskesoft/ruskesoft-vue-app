import api from "@/api"

export default {
    actions: {
        async loadPositions({commit}) {
            await api.load("positions")
                .then((res) => {
                    commit("setPositions", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async loadPosition({commit}, key) {
            await api.load("positions", key)
                .then((res) => {
                    commit("setPosition", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async createPosition({commit, getters}, values) {
            const position = getters.getPositionByTitle(values.Title);
            if(!position) {
                values.IsChief = false;
                await api.create("positions", values)
                    .then(() => {
                        commit("addPosition", values);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async updatePosition({commit, getters}, {key, values}) {
            const position = getters.getPositionByID(key);
            if(position && position.ID) {
                Object.assign(position, values);
                await api.update("positions", position.ID, position)
                    .then(() => {
                        commit("setPosition", position);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async deletePosition({commit}, key) {
            await api.delete("positions", key)
                .then(() => {
                    commit("removePosition", {ID:key});
                })
                .catch(e => {
                    throw e;
                })
        }
    },
    mutations: {
        setPositions(state, positions) {
            state.positions = positions;
        },
        setPosition(state, position) {
            const statePosition = state.positions.find(t => t.ID == position.ID);
            if(statePosition) {
                Object.assign(statePosition, position);
            }
        },
        addPosition(state, position) {
            state.positions.push(position);
        },
        removePosition(state, position) {
            state.positions = state.positions.filter(t => t.ID != position.ID);
        },
    },
    state: {
        positions: [],
    },
    getters:{
        getPositions: (state) => {
            return state.positions;
        },
        getPositionByID: (state) => (ID) => {
            return state.positions.find(t => t.ID == ID);
        },
        getPositionByTitle: (state) => (Title) => {
            return state.positions.find(t => t.Title == Title);
        }
    }
}