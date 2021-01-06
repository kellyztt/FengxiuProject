import { Http } from "../utils/http.js";
class Paging{
    start;
    count;
    list=[];
    locker = false;
    url;
    moreData = true;

    constructor(url, count=10, start=0){
        this.count = count;
        this.start = start;
        this.url = url;
    }

    async getMoreData(){
        if (!this.moreData){
            return;
        }
        if (!this._getLocker()){
            return;  
        }
        const data = await this._achieveData();
        this._releaseLocker();  
        return data;
    }

    _getLocker(){
        if (this.locker){
            return false;
        }
        this.locker = true;
        return true;
    }

    _releaseLocker(){
        if (this.locker){
            this.locker = false;
        }
    }

    async _achieveData(){
        const result = await Http.request({
            url: this._getCurrentRequest()
        });
        if (!result){
            return null;
        }
        //一条数据都没有
        if (result.total === 0){
            return {
                empty: true,
                items:[],
                accumulator: [],
                moreData: false
            }
        }
        this.moreData = this._moreData(result.total_page, result.page);
        this.start += this.count;
        this._accumulate(result.items);
        return {
            empty: false,
            items:result.items,
            accumulator: this.list,
            moreData: this.moreData
        }
    }

    //TODO: need to change to request?
    _getCurrentRequest(){
        let url = this.url;
        const param = `start=${this.start}&count=${this.count}`;
        if (url.includes("?")){
            url += "&" + param;
        } else {
            url += "?" + param;
        }
        return url;
    }

    _moreData(totalPage, pageNum){
        return pageNum < totalPage - 1;
    }

    _accumulate(items){
        this.list = this.list.concat(items);
    }
}

export {
    Paging
}