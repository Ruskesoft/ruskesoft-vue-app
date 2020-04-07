import axios from "axios"

const url = "http://localhost:3000/tasks";

function initTask(task) {
    if(task.AuthorID) {
        task.Author = {};
    }
}

export default {
    actions: {
        async loadTasks({commit}) {
            await axios.get(url)
                .then((res) => {
                    commit("setTasks", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async loadTask({commit}, ID) {
            await axios.get(url + "/" + ID)
                .then((res) => {
                    commit("setTask", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async createTask({commit, getters}, task) {
            if(task) {
                task.ID = getters.getLastTask ? (getters.getLastTask.ID + 1) : 0;
                task.AuthorID = 1;
                task.Created = new Date();
                task.StatusID = 1;
                await axios.post(url, task)
                    .then(() => {
                        commit("addTask", task);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async updateTask({commit, getters}, {key, values}) {
            const task = getters.getTask(key);
            if(task && task.ID) {
                task.EditorID = 1;
                task.Modified = new Date();
                Object.assign(task, values);
                await axios.put(url + "/" + task.ID, task)
                    .then(() => {
                        commit("setTask", task);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async deleteTask({commit}, ID) {
            await axios.delete(url + "/" + ID)
                .then(() => {
                    commit("removeTask", {ID});
                })
                .catch(e => {
                    throw e;
                })
        }
    },
    mutations: {
        setTasks(state, tasks) {
            for(const task of tasks) {
                initTask(task);
            }
            state.tasks = tasks;
        },
        setTask(state, task) {
            initTask(task);
            state.tasks = state.tasks.filter(t => t.ID != task.ID).push(task);
        },
        addTask(state, task) {
            initTask(task);
            state.tasks.push(task);
        },
        removeTask(state, task) {
            state.tasks = state.tasks.filter(t => t.ID != task.ID);
        },
    },
    state: {
        tasks: [],
    },
    getters:{
        getTasks: (state) => {
            return state.tasks;
        },
        getTaskCount: (state) => {
            return state.tasks.length;
        },
        getTask: (state) => (ID) => {
            return state.tasks.find(t => t.ID == ID);
        },
        getLastTask: (state) => {
            return state.tasks.reduce((a, c) => a.ID > c.ID ? a : c);
        }
    }
}