import Vue from "vue"
import Vuex from "vuex"
import post from "./modules/post"
import task from "./modules/task"
import user from "./modules/user"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        post, task, user
    }
})