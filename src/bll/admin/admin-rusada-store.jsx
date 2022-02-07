import {makeAutoObservable, runInAction, toJS} from "mobx";
import Store from "../store";
import AdminRusadaService from "../../services/admin/admin-rusada-service";


class AdminRusadaStore {
    tmp_errors = null
    mediaDel = []
    rusada = null



    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.tmp_errors = null
            this.rusada = null
        })
    }

    rusadaGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminRusadaService.rusada_get()
            runInAction(() => {
                this.rusada = response.data
                this.rusada.edit = false
            })
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                Store.isLoading = false
            })
        }
    }

    rusadaDocsCreate = async (doc,originName) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminRusadaService.rusada_docs_create(doc);
            if(response.data?.error){
                runInAction(() => {this.tmp_errors =
                    <div>
                        <div>Документ не загрузился!</div>
                        <div>Максимальный размер 10 мб</div>
                        <div>Типы файлов .doc, .docx, .pdf, .xls, .xlsx</div>
                    </div>})
            }else{
                runInAction(() => {this.rusada.docs.unshift({title:originName,doc:response.data.doc})})
                Store.setMediaDelTmp(response.data.doc)
            }
        } catch (e) {

        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    rusadaSave = async () => {
        runInAction(() => {
            Store.isLoading = true
        })
        try {
            const actualMediaArr = []
            if (localStorage.getItem('mediaDelTmp')) {
                if (this.rusada.docs.length > 0) {
                    this.rusada.docs.map((i) => actualMediaArr.push(i.doc))
                }
                const mediaDelTmp = toJS(Store.mediaDelTmp)
                const diff = mediaDelTmp.filter(i => actualMediaArr.indexOf(i) < 0)
                runInAction(()=>{Store.mediaDelTmp = diff})
                localStorage.setItem('mediaDelTmp', JSON.stringify(toJS(diff)));
            }
            const response = await AdminRusadaService.rusada_save({data: this.rusada, mediaDel: this.mediaDel})
            if (response.data?.error) {
                runInAction(() => {this.tmp_errors = <div>{response.data.error}</div>})
            } else {
                this.clearData()
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                Store.isLoading = false
            })
        }
    }
}

export default new AdminRusadaStore();