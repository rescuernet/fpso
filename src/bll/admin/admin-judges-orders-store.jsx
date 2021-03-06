import {makeAutoObservable, runInAction, toJS} from "mobx";
import Store from "../store";
import AdminJudgesOrdersService from "../../services/admin/admin-judges-orders-service";


class AdminJudgesOrdersStore {
    tmp_errors = null
    mediaDel = []
    judgesOrders = {
        list: [],
        id: null,
        one: null,
        people: []
    }


    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.tmp_errors = null
            this.judgesOrders = {
                list: [],
                id: null,
                one: null,
                people: []
            }
        })
    }

    judgesOrdersCreate = async () => {
        try {
            const response = await AdminJudgesOrdersService.judges_orders_create()
            if(response.data?.error){
                return 'ERROR'
            }else{
                this.judgesOrders.id = response.data
                return 'OK'
            }
        } catch (e) {
            console.log(e)
        } finally {}
    }

    judgesOrdersId = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            let response = await AdminJudgesOrdersService.judges_orders_id(id)
            let tmp = []
            if(response.data.judges.length > 0){
                response.data.judges.map((i) => tmp.push({peopleId: i._id,peopleName: `${i.surname} ${i.name} ${i.patronymic}`,view:i.view}))
            }
            response.data.tmpName = tmp
            runInAction(() => {this.judgesOrders.one = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    judgesOrdersPeopleGet = async (orderType) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminJudgesOrdersService.judges_orders_people_get(orderType)
            runInAction(() => {this.judgesOrders.people = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    judgesOrdersDocsCreate = async (doc,originName) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminJudgesOrdersService.judges_orders_docs_create(doc);
            if(response.data?.error){
                runInAction(() => {this.tmp_errors =
                    <div>
                        <div>???????????????? ???? ????????????????????!</div>
                        <div>???????????????????????? ???????????? 10 ????</div>
                        <div>???????? ???????????? .doc, .docx, .pdf, .xls, .xlsx</div>
                    </div>})
            }else{
                runInAction(() => {this.judgesOrders.one.docs.push({title:originName,doc:response.data.doc})})
                Store.setMediaDelTmp(response.data.doc)
            }
        } catch (e) {

        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    judgesOrdersSave = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const actualMediaArr = []
            if(localStorage.getItem('mediaDelTmp')){
                if(this.judgesOrders.one.docs.length > 0){this.judgesOrders.one.docs.map((i)=> actualMediaArr.push(i.doc))}
                const mediaDelTmp = toJS(Store.mediaDelTmp)
                const diff = mediaDelTmp.filter(i=>actualMediaArr.indexOf(i)<0)
                Store.mediaDelTmp = diff
                localStorage.setItem('mediaDelTmp',JSON.stringify(toJS(diff)));
            }
            let tmp = this.judgesOrders.one
            tmp.judges = []
            tmp.tmpName.map((i) => tmp.judges.push(i.peopleId))
            const response = await AdminJudgesOrdersService.judges_orders_save({data: tmp,mediaDel: this.mediaDel})
            if(response.data?.error){
                runInAction(() => {
                    this.tmp_errors = <div>{response.data.error}</div>
                })
            }else{
                this.clearData()
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    judgesOrdersDelete = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminJudgesOrdersService.judges_orders_delete(id);
            if(response.data?.error){
                runInAction(() => {this.tmp_errors =
                    <div>{response.data.error}</div>})
            }else{
                runInAction(() => {this.clearData()})
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    judgesOrdersGet = async (orderType) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminJudgesOrdersService.judges_orders_get(orderType)
            runInAction(() => {this.judgesOrders.list = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }
}

export default new AdminJudgesOrdersStore();