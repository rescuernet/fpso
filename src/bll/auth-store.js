import {makeAutoObservable, runInAction} from "mobx";
import AuthService from "../services/auth-service";
import axios from "axios";
import {API_URL} from "../const/const";
import Store from "./store"


class AuthStore {
    user = {}
    isAuth = false
    authError = {}

    constructor() {
        makeAutoObservable(this);
    }

    login = async (email,password) => {
        runInAction(() => {
            this.authError = {}
            Store.isInit = false
            Store.isLoading = true
        })
        try {
            const response = await AuthService.login(email,password);
            localStorage.setItem('token',response.data.accessToken);
            runInAction(() => {
                this.user = response.data.user
                this.isAuth = true
            })
        } catch (e) {
            runInAction(() => {this.authError = e.response})
        } finally {
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })

        }
    }

    registration = async (email,password) => {
        runInAction(() => {Store.isInit = false})
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AuthService.registration(email,password);
            localStorage.setItem('token',response.data.accessToken);
            runInAction(() => {this.user = response.data.user})
            runInAction(() => {this.isAuth = true})
        } catch (e) {
            console.log(e.response?.data?.message);
        }finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    logout = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            runInAction(() => {this.user = {}})
            runInAction(() => {this.isAuth = false})
            return response
        } catch (e) {
            console.log(e.response?.data?.message);
        }finally {
            runInAction(() => {Store.isLoading = false})
            runInAction(() => {Store.isInit = false})
        }
    }

    authMe = async () => {
        runInAction(() => {Store.isInit = false})
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await axios.get(`${API_URL}/api/refresh`,{withCredentials:true});
            localStorage.setItem('token',response.data.accessToken);
            runInAction(() => {this.user = response.data.user})
            runInAction(() => {this.isAuth = true})
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }
}

export default new AuthStore();