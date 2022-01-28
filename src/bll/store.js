import {makeAutoObservable, toJS} from "mobx";
import AdminOtherService from "../services/admin/admin-other-service";


class Store {

    isLoading = false
    isInit = false
    width = window.outerWidth

    mediaDelTmp = []

    constructor() {
        makeAutoObservable(this);
    }


    setMediaDelTmp(item) {
        if(localStorage.getItem('mediaDelTmp')){
            this.mediaDelTmp = JSON.parse(localStorage.getItem('mediaDelTmp'))
            this.mediaDelTmp.push(item)
        }else{
            this.mediaDelTmp.push(item)
        }
        localStorage.setItem('mediaDelTmp',JSON.stringify(toJS(this.mediaDelTmp)));
    }

    sendMediaDelTmp = async () => {
        if(localStorage.getItem('mediaDelTmp')){
            try {
                const arr = JSON.parse(localStorage.getItem('mediaDelTmp'))
                const response = await AdminOtherService.mediaDelTmp({mediaDelTmp: arr});
                if(response.data.status !== 200){
                    alert(response.data.status)
                }
                if(response.data.status === 200){
                    localStorage.removeItem('mediaDelTmp')
                    this.mediaDelTmp = []
                    if(localStorage.getItem('mediaDelTmp')){
                        const mediaDelTmp = await this.sendMediaDelTmpBlocking()
                        alert(mediaDelTmp)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    sendMediaDelTmpBlocking = async () => {
        try {
            const response = await AdminOtherService.mediaDelTmpBlocking({mediaDelTmp: true});
            return response.data.status
        } catch (e) {
            console.log(e)
        }
    }

}

export default new Store();