import {makeAutoObservable, runInAction, toJS} from "mobx";
import AdminReferenceBooksService from "../../services/admin/admin-reference-books-service";
import Store from "../store";


class AdminReferenceBooksStore {
    tmp_errors = null
    mediaDel = []
    referenceBooks = {
        pools: {
            list: [],
            id: null,
            one: null,
        },
        people: {
            list: [],
            id: null,
            one: null,
        },
    }


    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.tmp_errors = null
            this.referenceBooks = {
                pools: {
                    list: [],
                    id: null,
                    one: null,
                },
                people: {
                    list: [],
                    id: null,
                    one: null,
                },
            }
        })
    }

    poolsGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.pools_get()
            runInAction(() => {this.referenceBooks.pools.list = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    poolsCreate = async () => {
        try {
            const response = await AdminReferenceBooksService.pools_create()
            if(response.data?.error){
                return 'ERROR'
            }else{
                runInAction(() => {this.referenceBooks.pools.id = response.data})
                return 'OK'
            }
        } catch (e) {
            console.log(e)
        } finally {}
    }

    poolsId = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.pools_id(id)
            runInAction(() => {this.referenceBooks.pools.one = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    poolSave = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.pools_save(this.referenceBooks.pools.one)
            if(response.data?.error){
                runInAction(() => {this.tmp_errors = <div>{response.data.error}</div>})
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

    peopleCreate = async () => {
        try {
            const response = await AdminReferenceBooksService.people_create()
            if(response.data?.error){
                return 'ERROR'
            }else{
                runInAction(() => {this.referenceBooks.people.id = response.data})
                return 'OK'
            }
        } catch (e) {
            console.log(e)
        } finally {}
    }

    peopleId = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.people_id(id)
            runInAction(() => {this.referenceBooks.people.one = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    peopleAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.people_avatar_create(avatar);
            if(response.data?.error){
                runInAction(() => {this.tmp_errors =
                    <div>
                        <div>?????????????????????? ???? ??????????????????????!</div>
                        <div>???????????????????????? ???????????? 4 ????</div>
                        <div>?????? ?????????? JPEG/JPG</div>
                    </div>})
            }else{
                runInAction(() => {this.referenceBooks.people.one.avatar = response.data.name})
                Store.setMediaDelTmp(response.data.name)
            }
        } catch (e) {

        } finally {
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
            const response = await AdminReferenceBooksService.people_save({data:this.referenceBooks.people.one,mediaDel: this.mediaDel})
            if(response.data?.error){
                runInAction(() => {this.tmp_errors = <div>{response.data.error}</div>})
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

    peopleGet = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.people_get()
            runInAction(() => {this.referenceBooks.people.list = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }


}

export default new AdminReferenceBooksStore();