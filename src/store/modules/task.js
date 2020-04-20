import api from "@/api"

function initTask(task, rootState) {
    if(task && rootState) {
        const users = rootState.user.users;
        if(users) {
            if(task.AuthorID) {
                task.Author = users.find(user => user.ID == task.AuthorID)
            }
            if(task.EditorID) {
                task.Editor = users.find(user => user.ID == task.EditorID)
            }
            if(task.InitiatorID) {
                task.Initiator = users.find(user => user.ID == task.InitiatorID)
            }
            if(task.PerformerID) {
                task.Performer = users.find(user => user.ID == task.PerformerID)
            }
        }
    }
}

export default {
    actions: {
        async loadTasks({commit, rootState}) {
            await api.load("tasks")
                .then((res) => {
                    for(const task of res.data) {
                        initTask(task, rootState);
                    }
                    commit("setTasks", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async loadTask({commit, rootState}, key) {
            await api.load("tasks", key)
                .then((res) => {
                    initTask(res.data, rootState);
                    commit("setTask", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async createTask({commit, rootState}, values) {
            values.StatusID = 1;
            await api.create("tasks", values)
                .then(() => {
                    initTask(values, rootState);
                    commit("addTask", values);
                })
                .catch(e => {
                    throw e;
                })
        },
        async updateTask({commit, getters, rootState}, {key, values}) {
            const task = getters.getTaskByID(key);
            if(task && task.ID) {
                Object.assign(task, values);
                await api.update("tasks", task.ID, task)
                    .then(() => {
                        initTask(task, rootState);
                        commit("setTask", task);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async deleteTask({commit}, key) {
            await api.delete("tasks", key)
                .then(() => {
                    commit("removeTask", {ID:key});
                })
                .catch(e => {
                    throw e;
                })
        }
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        setTask(state, task) {
            const stateTask = state.tasks.find(t => t.ID == task.ID);
            if(stateTask) {
                Object.assign(stateTask, task);
            }
        },
        addTask(state, task) {
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
        getTaskByID: (state) => (ID) => {
            return state.tasks.find(t => t.ID == ID);
        }
    }
}