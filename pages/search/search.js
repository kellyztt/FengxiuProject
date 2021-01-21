// pages/search/search.js
import { HistoryKeywords } from "../../models/history-keywords.js";
import { Tag } from "../../models/tag.js"; 
import { showToast } from "../../utils/ui.js";
import { Search } from "../../models/search.js";

const historyKeywords = new HistoryKeywords();
Page({

  /**
   * Page initial data
   */
  data: {
    history: [],
    hotTags: [],
    search: false,
    items: [],
    loadingType: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    const historyTags = historyKeywords.get();
    const hotTags = await Tag.getSearchTags();
    this.setData({
      historyTags,
      hotTags
    })
  },

  onSearch: async function(event){
    this.setData({
      search: true,
      items: []
    });
    let keyword = event.detail.value || event.detail.name;
    keyword = keyword.trim();
    if (!keyword){
      showToast("请输入关键词")
      return;
    }
    wx.lin.showLoading({
      color: "#157658",
      type: "flash",
      fullScreen: true
    })
    historyKeywords.save(keyword);
    const paging = Search.search(keyword);
    const data = await paging.getMoreData();
    this.bindItems(data);
    this.setData({
      historyTags: historyKeywords.get(),
      
    })
    wx.lin.hideLoading()
  },

  onDeleteHistory: function(){
    historyKeywords.clear();
    this.setData({
      historyTags: []
    })
  },

  onCancel: function(){
    this.setData({
      search: false
    })
  },

  bindItems: function(data){
    if (data.accumulator.length != 0){
      this.setData({
        items: data.accumulator
      })
    }
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onReachBottom: async function () {
    this.setData({
      loadmore: true
    });
    const paging = this.data.spuPaging;
    const data = await paging.getMoreData();
    if (!data){
     return;
   }
   this.bindItems(data);
   if (!data.moreData){
     this.setData({
       loadingType: "end"
     })
   }
   
 },
})