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
        async loadTask({commit, rootState}, ID) {
            await api.load("tasks", ID)
                .then((res) => {
                    initTask(res.data, rootState);
                    commit("setTask", res.data);
                })
                .catch(e => {
                    throw e;
                })
        },
        async createTask({commit, getters, rootState}, task) {
            if(task) {
                task.ID = getters.getLastTask ? (getters.getLastTask.ID + 1) : 0;
                task.AuthorID = 1;
                task.Created = new Date();
                task.StatusID = 1;
                await api.create("tasks", task)
                    .then(() => {
                        initTask(task, rootState);
                        commit("addTask", task);
                    })
                    .catch(e => {
                        throw e;
                    })
            }
        },
        async updateTask({commit, getters, rootState}, {key, values}) {
            const task = getters.getTask(key);
            if(task && task.ID) {
                task.EditorID = 1;
                task.Modified = new Date();
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
        async deleteTask({commit}, ID) {
            await api.delete("tasks", ID)
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