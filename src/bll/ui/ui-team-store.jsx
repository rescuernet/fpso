import {makeAutoObservable, runInAction} from "mobx";
import Store from "../store"
import uiTeamService from "../../services/ui/ui-team-service";



class UiTeamStore {

    team = null

    constructor() {
        makeAutoObservable(this);
    }

    teamGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await uiTeamService.team_get();
            runInAction(() => {this.team = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }
}

export default new UiTeamStore();