import $api from "../../http/api";
import {UI_RM} from "../../routes/ui-routes";


export default class uiTeamService {

    static async team_get() {
        return $api.get(UI_RM.Team.path)
    }
}