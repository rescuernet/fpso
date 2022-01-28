import $api from "../../http/api";


export default class uiCompService {

    static async getComp(page = 1,limit = 10) {
        return $api.get(`/competitions?page=${page}&limit=${limit}`)
    }

    static async getCompId(id) {
        return $api.get(`/competitions/view/${id}`)
    }
}