import $api from "../../http/api";


export default class uiNewsService {

    static async getNews(page = 1,limit = 10) {
        return $api.get(`/news?page=${page}&limit=${limit}`)
    }


    static async getNewsId(id) {
        return $api.get(`/news/view/${id}`)
    }
}