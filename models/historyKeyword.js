//单例模式
class HistoryKeyWord{
    static MAX_ITEM_COUNT = 20;
    static KEY = 'keywords'
    keywords = [];

    constructor(){
        this.keywords = this._getStoredKeywords();
    }

    save(keyword){
        const items = this.keywords.filter(item => {
            return item === keyword;
        });
        if (items.length !== 0){
            return;
        }
        if (this.keywords.length === HistoryKeyWord.MAX_ITEM_COUNT){
            //出栈
            this.keywords.pop();
        }
        //进栈
        this.keywords.unshift(keyword);
        this._refreshStorage();
    }

    get(){
        return this.keywords;
    }

    clear(){
        this.keywords = [];
        this._refreshStorage();
    }

    _refreshStorage(){
        wx.setStorageSync(HistoryKeyWord.KEY, this.keywords);
    }

    _getStoredKeywords(){
        const keywords = wx.getStorageSync(HistoryKeyWord.KEY);
        if (!keywords){
            wx.setStorageSync(HistoryKeyWord.KEY, []);
            return [];
        }
        return keywords;
    }
}

export{
    HistoryKeyWord
}