// pages/search/search.js
import {HistoryKeyWord} from "../../models/historyKeyword";
import {Tags} from "../../models/Tags";
import {Search} from "../../models/search";
import {showToast} from "../../utils/ui";

const history = new HistoryKeyWord();
Page({

  /**
   * Page initial data
   */
  data: {
    loadingType: 'loading'
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
  onReachBottom: async function () {
    this.setData({
      bottomLoading: true
    })
    const data = await this.data.paging.getMoreData();
    if (!data){
      this.setData({
        loadingType: 'end'
      })
      return;
    }
    wx.lin.renderWaterFlow(data.items);
    if (!data.moreData){
      this.setData({
        loadingType: 'end'
      })
    }
    this.bindItems(data);
    if (!data.moreData){
      this.setData({
        loadingType: 'end'
      })
    }
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
    if (!keyWord){
      //显示toast
      showToast("请输入关键字");
      return;
    }
    history.save(keyWord);
    const paging = Search.search(keyWord);
    this.data.paging = paging;
    //在wx对象上挂载lin属性
    wx.lin.showLoading({
      color: '#157658',
      type: 'flash',
      fullScreen: true
    })
    const data = await paging.getMoreData();
    wx.lin.hideLoading();
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