// pages/search/search.js
import {HistoryKeyWord} from "../../models/historyKeyword";
import {Tags} from "../../models/Tags";
import {Search} from "../../models/search";

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
  onLoad: async function (options) {
    const historyTags = history.get();
    const hotTags = await Tags.getSearchTags();
    this.setData({
      historyTags,
      hotTags
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

  async onSearch(event){
    this.setData({
      search: true,
      items: []
    })
    const keyWord = event.detail.value || event.detail.name;
    history.save(keyWord);
    const paging = Search.search(keyWord);
    const data = await paging.getMoreData();

    this.setData({
      historyTags: history.get()
    });
    this.bindItems(data);
  },

  onCancle(event){
    this.setData({
      search: false
    })
  },

  bindItems(data){
    if (data.accumulator.length !== 0){
      this.setData({
        items: data.accumulator
      })
    }
  },

  onDeleteHistory(event){
    history.clear();
    this.setData({
      historyTags: history.get()
    });
  }
})