// pages/category/category.js
import { getWindowHeightRpx } from "../../utils/system.js";
import { Categories } from "../../models/categories.js";
import { SpuListType } from "../../core/enum.js";

Page({

  /**
   * Page initial data
   */
  data: {
    segHeight: 0,
    categories: null,
    roots: [],
    subs: [],
    defaultRootId: 2,
    currentRoot: null,
  },

  onGotoSearch: function(){
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    this.setDynamicSegmentHeight();
    this.initCategoryData();
  },

  async setDynamicSegmentHeight(){
    const widowHeight = await getWindowHeightRpx();
    const segHeight = widowHeight - 60 - 2 - 20;
    this.setData ({
      segHeight
    });
  },

  async initCategoryData(){
    const categories = new Categories();
    await categories.getAll();
    const roots = categories.getRoots();
    const defaultRoot = categories.getRoot(this.data.defaultRootId);
    if (!defaultRoot){
      defaultRoot = roots[0];
    }
    const subs = categories.getSubs(defaultRoot.id);
    this.setData({
      categories,
      roots,
      subs,
      currentRoot: defaultRoot
    })
  },

  onSegChange(event){
    const rootId = event.detail.activeKey;
    const currentRoot = this.data.categories.getRoot(rootId);
    const subs = this.data.categories.getSubs(rootId);
    this.setData({
      currentRoot,
      subs
    });
  },

  onJumpToSpuList(event){
    const cid = event.detail.cid;
    wx.navigateTo({
      url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    })
  },


  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})