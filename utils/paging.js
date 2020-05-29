import {Http} from "./httpUtils";

class Paging{
    start;
    count;
    req;
    lock = false;
    url;
    moreData = true;
    accumulator = [];
    /*
    * req={
    * url: "",
    * data:""
    * }*/
    constructor(req, count = 10, start = 0){
        this.req = req;
        this.count = count;
        this.start = start;
        this.url = req.url;
    }

    async getMoreData(){
        if (!this.moreData){
            return;
        }
        //1. getLock
        if (!this._getLock()){
            //TODO: wait?
            return;
        }
        //2. request
        const data = await this._actualGetData();
        //3. releaseLock
        this._releaseLock();
        return data;
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
        const req = this._getCurrentReq();
        const paging = await Http.request(req);
        //if server return no response
        if(!paging){
            return null;
        }
        const {total, page, total_page, items} = paging;
        // do not have data
        if (total === 0){
            return {
                empty: true,
                items,
                moreData: false,
                accumulator: []
            }
        }
        this.moreData = Paging._moreData(page, total_page);
        if (this.moreData){
            this.start += this.count;
        }
        this.accumulator = this.accumulator.concat(items);
        return {
            empty: false,
            items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    static _moreData(pageNum, totalPage){
        return pageNum < totalPage - 1;
    }

    //Todo: why append parameters in the url? not using data parameter?
    _getCurrentReq(){
        let url = this.req.url;
        const params = `start=${this.start}&count=${this.count}`;
        console.log("url", url);
        url = url.includes("?") ? url + "&" : url + "?";
        url += params;
        this.req.url = url;
        return this.req;
    }
}

export {
    Paging
}