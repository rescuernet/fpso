import {makeAutoObservable, runInAction} from "mobx";
import Store from "../store"
import uiRusadaService from "../../services/ui/ui-rusada-service";



class UiRusadaStore {

    rusada = null

    constructor() {
        makeAutoObservable(this);
    }

    rusadaGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await uiRusadaService.rusada_get();
            runInAction(() => {this.rusada = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }
}

export default new UiRusadaStore();