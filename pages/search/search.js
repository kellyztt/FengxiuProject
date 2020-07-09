// pages/search/search.js
import {HistoryKeyWord} from "../../models/historyKeyword";

const history = new HistoryKeyWord();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const historyTags = history.get();
    this.setData({
      historyTags
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onSearch(event){
    const keyWord = event.detail.value;
    history.save(keyWord);
    this.setData({
      historyTags: history.get()
    });
  },

  onDeleteHistory(event){
    history.clear();
    this.setData({
      historyTags: history.get()
    });
  }
})