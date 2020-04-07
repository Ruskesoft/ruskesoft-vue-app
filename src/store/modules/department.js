import axios from "axios"

const url = "http://localhost:3000/departments";

function initDepartment(department) {
    if(department.AuthorID) {
        department.Author = {};
    }
}

export default {
    actions: {
        async loadDepartments({commit}) {
            await axios.get(url)
                .then((res) => {
                    commit("setDepartments", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async loadDepartment({commit}, ID) {
            await axios.get(url + "/" + ID)
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
                await axios.post(url, department)
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
                await axios.put(url + "/" + department.ID, department)
                    .then(() => {
                        commit("setDepartment", department);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async deleteDepartment({commit}, ID) {
            await axios.delete(url + "/" + ID)
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
            for(const department of departments) {
                initDepartment(department);
            }
            state.departments = departments;
        },
        setDepartment(state, department) {
            initDepartment(department);
            state.departments = state.departments.filter(t => t.ID != department.ID).push(department);
        },
        addDepartment(state, department) {
            initDepartment(department);
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