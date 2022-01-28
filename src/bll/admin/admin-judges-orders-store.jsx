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
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminJudgesOrdersService.judges_orders_create()
            if(response.data?.error){
                console.log(response.data.error)
                return 'ERROR'
            }else{
                this.judgesOrders.id = response.data
                return 'OK'
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
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
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
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
        }
    }

    judgesOrdersDocsCreate = async (doc,originName) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminJudgesOrdersService.judges_orders_docs_create(doc);
            runInAction(() => {this.judgesOrders.one.docs.push({title:originName,doc:response.data.doc})})
            Store.setMediaDelTmp(response.data.doc)
        } catch (e) {
            runInAction(() => {this.news_tmp_errors =
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
            tmp.tmp = false
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
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
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
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
        }
    }

    /*
    peopleCreate = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.people_create()
            if(response.data?.error){
                console.log(response.data.error)
                return 'ERROR'
            }else{
                runInAction(() => {
                    this.referenceBooks.people.id = response.data
                })
                return 'OK'
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

    peopleId = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.people_id(id)
            runInAction(() => {this.referenceBooks.people.one = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
        }
    }

    peopleAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.people_avatar_create(avatar);
            runInAction(() => {
                this.referenceBooks.people.one.avatar = response.data.name
                Store.setMediaDelTmp(response.data.name)
            })
        } catch (e) {
            runInAction(() => {this.tmp_errors =
                <div>
                    <div>Изображение не загрузилось!</div>
                    <div>Максимальный размер 4 мб</div>
                    <div>Тип файла JPEG/JPG</div>
                </div>})
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    peopleSave = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const actualMediaArr = []
            if(localStorage.getItem('mediaDelTmp')){
                if(this.referenceBooks.people.one.avatar){actualMediaArr.push(this.referenceBooks.people.one.avatar)}
                const mediaDelTmp = toJS(Store.mediaDelTmp)
                const diff = mediaDelTmp.filter(i=>actualMediaArr.indexOf(i)<0)
                Store.mediaDelTmp = diff
                localStorage.setItem('mediaDelTmp',JSON.stringify(toJS(diff)));
            }
            const response = await AdminReferenceBooksService.people_save(this.referenceBooks.people.one)
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
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
        }
    }

    peopleGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.people_get()
            runInAction(() => {this.referenceBooks.people.list = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
        }
    }*/


}

export default new AdminJudgesOrdersStore();