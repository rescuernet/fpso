import {makeAutoObservable, runInAction} from "mobx";
import Store from "../store"
import uiAboutUsService from "../../services/ui/ui-about-us-service";



class UiAboutUsStore {

    aboutUs = null

    constructor() {
        makeAutoObservable(this);
    }

    aboutUsGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await uiAboutUsService.about_us_get();
            runInAction(() => {this.aboutUs = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }
}

export default new UiAboutUsStore();