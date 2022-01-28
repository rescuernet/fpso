import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";


export default class AdminOtherService {

    static async mediaDelTmp(Arr) {
        return $api.post(ADM_API_RM.mediaDelTmp.path,Arr)
    }

    static async mediaDelTmpBlocking(Arr) {
        return $api.post(ADM_API_RM.mediaDelTmpBlocking.path,Arr)
    }
}