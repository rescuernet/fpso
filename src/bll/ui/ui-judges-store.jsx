import {makeAutoObservable, runInAction} from "mobx";
import Store from "../store"
import uiJudgesService from "../../services/ui/ui-judges-service";



class UiJudgesStore {

    judgesOrders = []

    constructor() {
        makeAutoObservable(this);
    }

    judgesOrdersGet = async (orderType) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await uiJudgesService.judges_orders_get(orderType);
            runInAction(() => {this.judgesOrders = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }


}

export default new UiJudgesStore();