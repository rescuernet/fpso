import {makeAutoObservable, runInAction, toJS} from "mobx";
import Store from "../store"
import AdminNewsService from "../../services/admin/admin-news-service";


class AdminNewsStore {
    news_tmp_errors = null
    news = []
    tmpNewsId = null
    newsOne = null
    mediaDel = []



    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.news_tmp_errors = null
            this.tmpNewsId = null
            this.newsOne = null
            this.mediaDel = []
        })
    }

    newsCreate = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.newsCreate();
            if(response.data?.error){
                console.log(response.data.error)
                return 'ERROR'
            }else{
                runInAction(() => {
                    this.clearData()
                    this.tmpNewsId = response.data
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

    getNewsId = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.getNewsId(id);
            runInAction(() => {this.newsOne = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    newsAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.newsAvatarCreate(avatar);
            runInAction(() => {
                this.newsOne.avatar = response.data.name
                Store.setMediaDelTmp(response.data.name)
            })
        } catch (e) {
            runInAction(() => {this.news_tmp_errors =
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

    newsImageCreate = async (image) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.newsImageCreate(image);
            runInAction(() => {this.newsOne.images.push(response.data.name)})
            Store.setMediaDelTmp(response.data.name)
        } catch (e) {
            runInAction(() => {this.news_tmp_errors =
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

    newsDocsCreate = async (doc,originName) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.newsDocsCreate(doc);
            runInAction(() => {this.newsOne.docs.push({title:originName,doc:response.data.doc})})
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

    newsUpdate = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const actualMediaArr = []
            if(localStorage.getItem('mediaDelTmp')){
                if(this.newsOne.avatar){actualMediaArr.push(this.newsOne.avatar)}
                if(this.newsOne?.images && this.newsOne.images.length > 0){this.newsOne.images.map((i)=> actualMediaArr.push(i))}
                if(this.newsOne?.docs && this.newsOne.docs.length > 0){this.newsOne.docs.map((i)=> actualMediaArr.push(i.doc))}

                const mediaDelTmp = toJS(Store.mediaDelTmp)

                const diff = mediaDelTmp.filter(i=>actualMediaArr.indexOf(i)<0)
                Store.mediaDelTmp = diff
                localStorage.setItem('mediaDelTmp',JSON.stringify(toJS(diff)));
            }

            const response = await AdminNewsService.newsUpdate({data:this.newsOne,mediaDel: this.mediaDel});
            if(response.data?.error){
                runInAction(() => {
                    this.news_tmp_errors = <div>{response.data.error}</div>
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

    newsDelete = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.newsDelete(id);
            if(response.data?.error){
                runInAction(() => {this.news_tmp_errors =
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

    getNews = async () => {
        runInAction(() => {
            Store.isLoading = true
            this.clearData()
        })
        try {
            const response = await AdminNewsService.getNews();
            runInAction(() => {this.news = response.data})
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

export default new AdminNewsStore();