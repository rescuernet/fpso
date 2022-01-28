import {makeAutoObservable} from "mobx";



class __store {

    constructor() {
        makeAutoObservable(this);
    }

}

export default new __store();