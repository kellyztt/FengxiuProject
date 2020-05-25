import {Http} from "./httpUtils";

class Paging{
    start;
    count;
    req;
    lock = false;
    constructor(req, count = 10, start = 0){
        this.req = req;
        this.count = count;
        this.start = start;
    }

    getMoreData(){
        //1. getLock
        if (!this._getLock()){
            //TODO: wait
            return;
        }
        //2. request
        this._actualGetData();
        //3. releaseLock
        this._releaseLock()
    }

    //private function
    _getLock(){
        //如果锁为true，代表有别的request在进行，此次request需等待
        if (this.lock){
            return false;
        }
        //如果锁为false，则自己占用
        this.lock = true;
        return true;
    }

    _releaseLock(){
        if (this.lock){
            this.lock = false;
        }
    }

    async _actualGetData(){
        return await Http.request({
            url: this.url,
            data: {
                start: this.start,
                count: this.count
            }
        })
    }
    _getCurrentReq(){

    }
}