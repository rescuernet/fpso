import $api from "../../http/api";
import {UI_RM} from "../../routes/ui-routes";


export default class uiRusadaService {

    static async rusada_get() {
        return $api.get(UI_RM.Rusada.path)
    }
}