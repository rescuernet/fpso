import {makeAutoObservable, runInAction, toJS} from "mobx";
import Store from "../store";
import AdminAboutUsService from "../../services/admin/admin-about-us-service";


class AdminAboutUsStore {
    tmp_errors = null
    mediaDel = []
    aboutUs = null



    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.tmp_errors = null
            this.aboutUs = null
        })
    }

    aboutUsGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminAboutUsService.about_us_get()
            runInAction(() => {
                this.aboutUs = response.data
                this.aboutUs.edit = false
            })
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    aboutUsDocsCreate = async (doc,originName) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminAboutUsService.about_us_docs_create(doc);
            if(response.data?.error){
                runInAction(() => {this.tmp_errors =
                    <div>
                        <div>Документ не загрузился!</div>
                        <div>Максимальный размер 10 мб</div>
                        <div>Типы файлов .doc, .docx, .pdf, .xls, .xlsx</div>
                    </div>})
            }else{
                runInAction(() => {this.aboutUs.docs.push({title:originName,doc:response.data.doc})})
                Store.setMediaDelTmp(response.data.doc)
            }
        } catch (e) {

        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    aboutUsImgCreate = async (image) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminAboutUsService.about_us_img_create(image);
            if(response.data?.error){
                runInAction(() => {this.tmp_errors =
                    <div>
                        <div>Изображение не загрузилось!</div>
                        <div>Максимальный размер 4 мб</div>
                        <div>Тип файла JPEG/JPG</div>
                    </div>})
            }else{
                runInAction(() => {this.aboutUs.img.push(response.data.name)})
                Store.setMediaDelTmp(response.data.name)
            }
        } catch (e) {

        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    aboutUsSave = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const actualMediaArr = []
            if(localStorage.getItem('mediaDelTmp')){
                if(this.aboutUs.docs.length > 0){this.aboutUs.docs.map((i)=> actualMediaArr.push(i.doc))}
                if(this.aboutUs.img.length > 0){this.aboutUs.img.map((i)=> actualMediaArr.push(i))}
                const mediaDelTmp = toJS(Store.mediaDelTmp)
                const diff = mediaDelTmp.filter(i=>actualMediaArr.indexOf(i)<0)
                Store.mediaDelTmp = diff
                localStorage.setItem('mediaDelTmp',JSON.stringify(toJS(diff)));
            }
            const response = await AdminAboutUsService.about_us_save({data: this.aboutUs, mediaDel: this.mediaDel})
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
}

export default new AdminAboutUsStore();