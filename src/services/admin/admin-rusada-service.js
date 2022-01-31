import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";


export default class AdminRusadaService {

    static async rusada_get() {
        return $api.get(ADM_RM.Rusada.path)
    }

    static async rusada_docs_create(doc) {
        return $api.post(ADM_API_RM.Rusada__Docs__Create.path,doc)
    }

    static async rusada_save(arr) {
        return $api.post(ADM_API_RM.Rusada__Save.path,arr)
    }
}