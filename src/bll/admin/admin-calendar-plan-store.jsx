import {makeAutoObservable, runInAction, toJS} from "mobx";
import Store from "../store";
import AdminCalendarPlanService from "../../services/admin/admin-calendar-plan-service";


class AdminCalendarPlanStore {
    tmp_errors = null
    mediaDel = []
    plan = null



    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.tmp_errors = null
            this.plan = null
        })
    }

    calendarPlanGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCalendarPlanService.calendar_plan_get()
            runInAction(() => {
                this.plan = response.data
                this.plan.edit = false
            })
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
        }
    }

    calendarPlanDocsCreate = async (doc,originName) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCalendarPlanService.calendar_plan_docs_create(doc);
            runInAction(() => {this.plan.docs.push({title:originName,doc:response.data.doc})})
            Store.setMediaDelTmp(response.data.doc)
        } catch (e) {
            runInAction(() => {this.tmp_errors =
                <div>
                    <div>Документ не загрузился!</div>
                    <div>Максимальный размер 10 мб</div>
                    <div>Типы файлов .doc, .docx, .pdf, .xls, .xlsx</div>
                </div>})
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    calendarPlanSave = async () => {
        runInAction(() => {
            Store.isLoading = true
        })
        try {
            const actualMediaArr = []
            if (localStorage.getItem('mediaDelTmp')) {
                if (this.plan.docs.length > 0) {
                    this.plan.docs.map((i) => actualMediaArr.push(i.doc))
                }
                const mediaDelTmp = toJS(Store.mediaDelTmp)
                const diff = mediaDelTmp.filter(i => actualMediaArr.indexOf(i) < 0)
                Store.mediaDelTmp = diff
                localStorage.setItem('mediaDelTmp', JSON.stringify(toJS(diff)));
            }
            const response = await AdminCalendarPlanService.calendar_plan_save({
                data: this.plan,
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
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
        }
    }
}

export default new AdminCalendarPlanStore();