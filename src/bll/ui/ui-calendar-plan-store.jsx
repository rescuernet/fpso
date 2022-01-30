import {makeAutoObservable, runInAction} from "mobx";
import Store from "../store"
import uiCalendarPlanService from "../../services/ui/ui-calendar-plan-service";



class UiCalendarPlanStore {

    plan = null

    constructor() {
        makeAutoObservable(this);
    }

    calendarPlanGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await uiCalendarPlanService.calendar_plan_get();
            runInAction(() => {this.plan = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }
}

export default new UiCalendarPlanStore();