var postsData = require('../../../data/posts-data.js') //引用数据文件
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    //var globalData=app.globalData;
    var postId = option.id;
    this.data.currentPostId = postId; //把postId放到data里面的一个属性来
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });


    // var postsCollected={
    //   1:"true",
    //   2:"false",
    //   3:"true"
    //   ...
    // }

    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) { //缓存是否生成完毕
      var postCollected = postsCollected[postId] //缓存状态的其中的一个
      this.setData({
        collected: postCollected //绑定变量
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected); //放置缓存中去
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId==postId){
      this.setData({
        isPlayingMusic:true
      })
    }

    this.setMusicMonitor();


  },

  setMusicMonitor: function () {
    var that = this;

    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;

    });

    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;

    });


  },

  onCollectionTap: function (event) {
    this.getPostsCollectedSyc();//调用同步
    // this.getPostsCollectedAsy();//调用异步


  },

  getPostsCollectedAsy: function () {//异步
    var that = this;//把this替换成that
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postsCollected = wx.getStorageSync('posts_collected'); //获取缓存是否已经被收藏了
        var postCollected = postsCollected[that.data.currentPostId]; //获得当前文章是否被收藏
        //取反操作，收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  },

  

  getPostsCollectedSyc: function () {//同步
    var postsCollected = wx.getStorageSync('posts_collected'); //获取缓存是否已经被收藏了
    var postCollected = postsCollected[this.data.currentPostId]; //获得当前文章是否被收藏
    //取反操作，收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);

  },

  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({ //需要用户确认的
      title: "收藏",
      content: postCollected ? "收藏该文章" : "取消收藏该文章",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          //更新文章是否收藏了的缓存值
          wx.setStorageSync('posts_collected', postsCollected);
          //更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })

        }
      }
    })
  },


  showToast: function (postsCollected, postCollected) {
    //更新文章是否收藏了的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({ //不需要用户确认的
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })

  },

  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        //res.cancel 用户是不是点击了取消按钮
        //res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          //content: "用户是否取消？" + res.cancel + "现在还无法实现分享功能，什么时候能支持呢"
        })
      }
    })
  },

  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic)//isPlayingMusic存在 
    {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }
    else {//否则启动音乐播放
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})