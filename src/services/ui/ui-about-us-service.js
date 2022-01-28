import $api from "../../http/api";
import {UI_RM} from "../../routes/ui-routes";


export default class uiAboutUsService {

    static async about_us_get() {
        return $api.get(UI_RM.AboutUs.path)
    }
}