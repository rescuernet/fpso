import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";


export default class AdminTeamService {

    static async team_get() {
        return $api.get(ADM_RM.Team.path)
    }

    static async team_docs_create(doc) {
        return $api.post(ADM_API_RM.Team__Docs__Create.path,doc)
    }

    static async team_save(arr) {
        return $api.post(ADM_API_RM.Team__Save.path,arr)
    }
}