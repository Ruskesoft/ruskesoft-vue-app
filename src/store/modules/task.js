import axios from "axios"

const url = "http://localhost:3000/tasks";

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
        async createTask({commit, getters}, {Title, DueDate, Performer, CompletePercent}) {
            const lastTask = getters.getLastTask;
            const ID = lastTask ? (lastTask.ID + 1) : 0;
            const Author = 1;
            const Created = new Date();
            const task = { ID, Title, Author, DueDate, Performer, Created, CompletePercent};
            await axios.post(url, task)
                .then(() => {
                    commit("addTask", task);
                })
                .catch(e => {
                    throw e;
                })
        },
        async updateTask({commit, getters}, {key, values}) {
            const ID = key;
            const task = getters.getTask(ID);
            Object.assign(task, values);
            await axios.put(url + "/" + ID, task)
                .then(() => {
                    commit("setTask", task);
                })
                .catch(e => {
                    throw e;
                })
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
            state.tasks = tasks
        },
        setTask(state, task) {
            state.tasks = state.tasks.filter(t => t.ID != task.ID).push(task);
        },
        addTask(state, task) {
            state.tasks.push(task);
        },
        removeTask(state, task) {
            state.tasks = state.tasks.filter(t => t.ID != task.ID);
        }
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