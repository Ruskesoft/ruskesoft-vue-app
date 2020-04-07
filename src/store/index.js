import Vue from "vue"
import Vuex from "vuex"
import user from "./modules/user"
import department from "./modules/department"
import task from "./modules/task"
import taskStatus from "./modules/taskStatus"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user, department, task, taskStatus
    }
})