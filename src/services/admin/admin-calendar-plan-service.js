import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";


export default class AdminCalendarPlanService {

    static async calendar_plan_get() {
        return $api.get(ADM_RM.Calendar_Plan.path)
    }

    static async calendar_plan_docs_create(doc) {
        return $api.post(ADM_API_RM.Calendar_Plan__Docs__Create.path,doc)
    }

    static async calendar_plan_save(arr) {
        return $api.post(ADM_API_RM.Calendar_Plan__Save.path,arr)
    }
}