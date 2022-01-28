import $api from "../../http/api";
import {UI_RM} from "../../routes/ui-routes";


export default class uiJudgesService {

    static async judges_orders_get(orderType) {
        return $api.get(`${UI_RM.JudgesOrders.path}?ordertype=${orderType}`)
    }
}