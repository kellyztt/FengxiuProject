class HistoryKeywords{

    history = [];
    static MAX_ITEM_COUNT = 20
    static KEY = "history"

    constructor(){
        if (typeof HistoryKeywords.instance === "object"){
            return HistoryKeywords.instance;
        }
        HistoryKeywords.instance = this;
        this.history = this._getLocalKeywords();
        return this;
    }

    save(keyword){
        if (this.history.includes(keyword)){
            return;
        }
        if (history.length === HistoryKeywords.MAX_ITEM_COUNT){
            keyword.pop();
        }
        this.history.unshift(keyword);
        this._refreshLocal();
    }

    get(){
        return this.history;
    }

    clear(){
        this.history = [];
        this._refreshLocal();
    }

    _refreshLocal(){
        wx.setStorageSync(HistoryKeywords.KEY, this.history);
    }

    _getLocalKeywords(){
        history = wx.getStorageSync(HistoryKeywords.KEY);
        if (!history){
            wx.setStorageSync(HistoryKeywords.KEY, []);
            return [];
        }
        return history;
    }
}

export { HistoryKeywords }