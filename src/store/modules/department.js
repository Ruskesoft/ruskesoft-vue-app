import api from "@/api"

export default {
    actions: {
        async loadDepartments({commit}) {
            await api.load("departments")
                .then((res) => {
                    commit("setDepartments", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async loadDepartment({commit}, key) {
            await api.load("departments", key)
                .then((res) => {
                    commit("setDepartment", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async createDepartment({commit, getters}, values) {
            const department = getters.getDepartmentByTitle(values.Title);
            if(!department) {
                await api.create("departments", values)
                    .then(() => {
                        commit("addDepartment", values);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async updateDepartment({commit, getters}, {key, values}) {
            const department = getters.getDepartmentByID(key);
            if(department && department.ID) {
                Object.assign(department, values);
                await api.update("departments", department.ID, department)
                    .then(() => {
                        commit("setDepartment", department);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async deleteDepartment({commit}, key) {
            await api.delete("departments", key)
                .then(() => {
                    commit("removeDepartment", {ID:key});
                })
                .catch(e => {
                    throw e;
                })
        }
    },
    mutations: {
        setDepartments(state, departments) {
            state.departments = departments;
        },
        setDepartment(state, department) {
            const stateDepartment = state.departments.find(t => t.ID == department.ID);
            if(stateDepartment) {
                Object.assign(stateDepartment, department);
            }
        },
        addDepartment(state, department) {
            state.departments.push(department);
        },
        removeDepartment(state, department) {
            state.departments = state.departments.filter(t => t.ID != department.ID);
        },
    },
    state: {
        departments: [],
    },
    getters:{
        getDepartments: (state) => {
            return state.departments;
        },
        getDepartmentByID: (state) => (ID) => {
            return state.departments.find(d => d.ID == ID);
        },
        getDepartmentByTitle: (state) => (Title) => {
            return state.departments.find(d => d.Title == Title);
        }
    }
}