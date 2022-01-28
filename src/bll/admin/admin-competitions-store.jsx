import {makeAutoObservable, runInAction, toJS} from "mobx";
import Store from "../store"
import AdminCompetitionsService from "../../services/admin/admin-competitions-service";

class AdminCompetitionsStore {
    tmp_errors = null
    comp = []
    tmpCompId = null
    compOne = null
    mediaDel = []
    pools = null


    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.tmp_errors = null
            this.tmpCompId = null
            this.compOne = null
            this.pools = null
        })
    }

    compCreate = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.compCreate();
            if(response.data?.error){
                console.log(response.data.error)
                return 'ERROR'
            }else{
                runInAction(() => {
                    this.clearData()
                    this.tmpCompId = response.data
                })
                return 'OK'
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    getCompId = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.getCompId(id);
            runInAction(() => {
                this.compOne = response.data.comp
                this.pools = response.data.pools
            })
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    compAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.compAvatarCreate(avatar);
            runInAction(() => {
                this.compOne.avatar = response.data.name
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

    compDocsCreate = async (doc,originName,section) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.compDocsCreate(doc);
            if(section.name === 'docs'){
                runInAction(() => {this.compOne.docs.push({title:originName,doc:response.data.doc})})
            }
            if(section.name === 'results'){
                runInAction(() => {this.compOne.results[section.day].docs.push({title:originName,doc:response.data.doc})})
            }
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

    compUpdate = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const actualMediaArr = []
            if(localStorage.getItem('mediaDelTmp')){
                if(this.compOne.avatar){actualMediaArr.push(this.compOne.avatar)}

                /*if(this.compOne?.images && this.compOne.images.length > 0){this.compOne.images.map((i)=> actualMediaArr.push(i))}*/

                if(this.compOne.docs.length > 0){this.compOne.docs.map((i)=> actualMediaArr.push(i.doc))}
                if(this.compOne.results.length > 0){
                    // eslint-disable-next-line array-callback-return
                    this.compOne.results.map((i)=> {
                        if(i.docs.length > 0){
                            i.docs.map((ii)=> actualMediaArr.push(ii.doc))
                        }
                    })
                }
                const mediaDelTmp = toJS(Store.mediaDelTmp)
                const diff = mediaDelTmp.filter(i=>actualMediaArr.indexOf(i)<0)
                Store.mediaDelTmp = diff
                localStorage.setItem('mediaDelTmp',JSON.stringify(toJS(diff)));
            }

            const response = await AdminCompetitionsService.compUpdate({data: this.compOne,mediaDel: this.mediaDel});
            if(response.data?.error){
                runInAction(() => {
                    this.tmp_errors = <div>{response.data.error}</div>
                    if(localStorage.getItem('mediaDelTmp')){
                        actualMediaArr.map((i)=>Store.mediaDelTmp.push(i))
                        localStorage.setItem('mediaDelTmp',JSON.stringify(toJS(Store.mediaDelTmp)));
                    }
                })
            }else{
                this.clearData()
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    compDelete = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.compDelete(id);
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
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    getComp = async () => {
        runInAction(() => {
            Store.isLoading = true
            this.clearData()
        })
        try {
            const response = await AdminCompetitionsService.getComp();
            runInAction(() => {this.comp = response.data})
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

export default new AdminCompetitionsStore();