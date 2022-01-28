import $api from "../http/api";

export default class UserService {
    static async getUsers() {
        return $api.get('/users')
    }
}