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
        async loadDepartment({commit}, ID) {
            await api.load("departments", ID)
                .then((res) => {
                    commit("setDepartment", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async createDepartment({commit, getters}, department) {
            if(department) {
                department.ID = getters.getLastDepartment ? (getters.getLastDepartment.ID + 1) : 0;
                console.log(department.ID)
                department.AuthorID = 1;
                department.Created = new Date();
                await api.create("departments", department)
                    .then(() => {
                        commit("addDepartment", department);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async updateDepartment({commit, getters}, {key, values}) {
            const department = getters.getDepartment(key);
            if(department && department.ID) {
                department.EditorID = 1;
                department.Modified = new Date();
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
        async deleteDepartment({commit}, ID) {
            await api.delete("departments", ID)
                .then(() => {
                    commit("removeDepartment", {ID});
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
        getDepartmentCount: (state) => {
            return state.departments.length;
        },
        getDepartment: (state) => (ID) => {
            return state.departments.find(t => t.ID == ID);
        },
        getLastDepartment: (state) => {
            if(state.departments.length == 0) return null;
            return state.departments.reduce((a, c) => a.ID > c.ID ? a : c);
        }
    }
}