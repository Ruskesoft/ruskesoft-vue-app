import localizeFilter from "@/localize"

export default {
    state: {
        taskStatuses: [
            {
                ID: 1,
                Title: localizeFilter('TaskStatus_New')
            },{
                ID: 2,
                Title: localizeFilter('TaskStatus_InWork')
            },{
                ID: 3,
                Title: localizeFilter('TaskStatus_Paused')
            },{
                ID: 4,
                Title: localizeFilter('TaskStatus_Complited')
            },{
                ID: 5,
                Title: localizeFilter('TaskStatus_Rejected')
            },{
                ID: 6,
                Title: localizeFilter('TaskStatus_Finished')
            }
        ],
    },
    getters:{
        getTaskStatuses(state){
            return state.taskStatuses;
        }
    }
}