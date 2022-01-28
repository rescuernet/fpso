import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";


export default class AdminAboutUsService {

    static async about_us_get() {
        return $api.get(ADM_RM.AboutUs.path)
    }

    static async about_us_docs_create(doc) {
        return $api.post(ADM_API_RM.AboutUs__Docs__Create.path,doc)
    }

    static async about_us_img_create(img) {
        return $api.post(ADM_API_RM.AboutUs__Img__Create.path,img)
    }

    static async about_us_save(arr) {
        return $api.post(ADM_API_RM.AboutUs__Save.path,arr)
    }
}