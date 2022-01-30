import $api from "../../http/api";
import {UI_RM} from "../../routes/ui-routes";


export default class uiCalendarPlanService {

    static async calendar_plan_get() {
        return $api.get(UI_RM.Calendar_Plan.path)
    }
}