import {makeAutoObservable, runInAction, toJS} from "mobx";
import Store from "../store";
import AdminTeamService from "../../services/admin/admin-team-service";


class AdminTeamStore {
    tmp_errors = null
    mediaDel = []
    team = null



    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.tmp_errors = null
            this.team = null
        })
    }

    teamGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminTeamService.team_get()
            runInAction(() => {
                this.team = response.data
                this.team.edit = false
            })
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                Store.isLoading = false
            })
        }
    }

    teamDocsCreate = async (doc,originName) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminTeamService.team_docs_create(doc);
            if(response.data?.error){
                runInAction(() => {this.tmp_errors =
                    <div>
                        <div>Документ не загрузился!</div>
                        <div>Максимальный размер 10 мб</div>
                        <div>Типы файлов .doc, .docx, .pdf, .xls, .xlsx</div>
                    </div>})
            }else{
                runInAction(() => {this.team.docs.push({title:originName,doc:response.data.doc})})
                Store.setMediaDelTmp(response.data.doc)
            }
        } catch (e) {

        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    teamSave = async () => {
        runInAction(() => {
            Store.isLoading = true
        })
        try {
            const actualMediaArr = []
            if (localStorage.getItem('mediaDelTmp')) {
                if (this.team.docs.length > 0) {
                    this.team.docs.map((i) => actualMediaArr.push(i.doc))
                }
                const mediaDelTmp = toJS(Store.mediaDelTmp)
                const diff = mediaDelTmp.filter(i => actualMediaArr.indexOf(i) < 0)
                Store.mediaDelTmp = diff
                localStorage.setItem('mediaDelTmp', JSON.stringify(toJS(diff)));
            }
            const response = await AdminTeamService.team_save({
                data: this.team,
                mediaDel: this.mediaDel
            })
            if (response.data?.error) {
                runInAction(() => {
                    this.tmp_errors = <div>{response.data.error}</div>
                })
            } else {
                this.clearData()
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }
}

export default new AdminTeamStore();