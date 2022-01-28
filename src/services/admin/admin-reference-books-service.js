import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";


export default class AdminReferenceBooksService {

    static async pools_create() {
        return $api.post(ADM_API_RM.Reference__Books__Pools_Create.path)
    }

    static async pools_id(id) {
        return $api.get(ADM_RM.Reference__Books__Pool_Edit.getUrl(id))
    }

    static async pools_save(arr) {
        return $api.post(ADM_API_RM.Reference__Books__Pools_Save.path,arr)
    }

    static async pools_get() {
        return $api.get(ADM_API_RM.Reference__Books__Pools_Get.path)
    }

    static async people_create() {
        return $api.post(ADM_API_RM.Reference__Books__People_Create.path)
    }

    static async people_id(id) {
        return $api.get(ADM_RM.Reference__Books__People_Edit.getUrl(id))
    }

    static async people_avatar_create(avatar) {
        return $api.post(ADM_API_RM.Reference__Books__People_Avatar_Create.path,avatar)
    }

    static async people_save(arr) {
        return $api.post(ADM_API_RM.Reference__Books__People_Save.path,arr)
    }

    static async people_get() {
        return $api.get(ADM_API_RM.Reference__Books__People_Get.path)
    }
}