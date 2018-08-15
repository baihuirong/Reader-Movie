// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    //设置一个变量，在两个函数之间进行参数的传递,完成动态的设定
    navigateTitle: "",
    requestUrl:"",
    totalCount:0
    
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category; //获取category
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl=dataUrl;//将dataurl保存在了data里面，在其他的函数里面也可以调用
    util.http(dataUrl, this.processDoubanData)

  },

  onScrollLower:function(event){
    //console.log("加载更多")
    var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()//加载条
  },
  
  // 触发onReachBottom事件时加载更多的数据
  onReachBottom: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);

    // 设置loading状态
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh:function(event){
    var refreshUrl=this.data.requestUrl+"?star=0&count=20";
    this.data.movies={};
    this.data.isEmpty=true;
    this.data.totalCount=0;
    util.http(refreshUrl,this.processDoubanData)
    wx.showNavigationBarLoading()

  },

  processDoubanData: function (moviesDouban) {
    console.log(moviesDouban)
    var movies = [];//电影数组
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //[1,1,1,1,1][1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies={};
    //如果要绑定新加载的数据，那么需要同旧有的数据合并
    if(!this.data.isEmpty){
      totalMovies=this.data.movies.concat(movies);
    }
    else{
      totalMovies=movies;
      this.data.isEmpty=false;
    }
    this.setData({
      movies:totalMovies
      //movies在setData的时候要做数据绑定
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();//隐藏hidenavigationbar
    wx.stopPullDownRefresh()
    
  },

  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,

    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "../movie-detail/movie-detail?id=" + movieId
    })
  },
  onReachBottom: function (event) {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
})