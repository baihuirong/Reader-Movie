# Reader-Movie
微信小程序demo<br>
我们做一个集阅读与电影于一体的小程序<br>
“阅读”是一个类似于“知乎”的文章阅读器，用户在这里可以阅读文章或听音乐<br>
“电影”是一个查看最新电影资讯的地方。在这里可以查看到“正在上映”、“即将上映”和“Top250”的电影资讯<br>

# 说明

> 前端新手，欢迎多多提意见<br>
> 如果你喜欢对这个项目感兴趣,可以点“Star”支持一下~谢谢！^_^<br>
> 由于豆瓣把接口封了，所有数据都是作者在自己服务器上mock出的数据。

# 效果展示

* “阅读部分”是一个类似于“知乎”的文章阅读器，用户在这里可以阅读文章的同时听音乐
* “电影”是一个查看最新电影资讯的地方。在这里可以查看到“正在上映”、“即将上映”和“Top250”的电影资讯
* [小程序开发组件](https://developers.weixin.qq.com/miniprogram/dev/component/)
* [微信小程序开发组员汇总](https://developers.weixin.qq.com/miniprogram/dev/component/)

## 项目截图

![display](https://github.com/baihuirong/Reader-Movie/blob/master/pictures/demo1.PNG)

## 文与字<br>
- [x] 实现图片轮播功能
- [x] localStorage缓存收藏状态
- [x] Swiper组件 轮播图组件
- [x] App.json里关于导航栏、标题配置
- [x] Page页面与应用程序的生命周期
- [x] 数据绑定（核心知识）
- [x] 数据绑定的运算与逻辑
- [x] AppData区域介绍
- [x] 时间与事件对象
- [x] 缓存（微信中最大10M）
- [x] 列表渲染（核心知识）
- [x] Template模板的实用（核心知识）


![display](https://github.com/baihuirong/Reader-Movie/blob/master/pictures/reading.gif)

## 音乐播放

![display](https://github.com/baihuirong/Reader-Movie/blob/master/pictures/music.gif)

## 电影

- [x] 加载豆瓣正在热映、近期上映、Top250电影数据
- [x] 实现搜索电影功能
- [x] 点击电影进入电影详情页

![display](https://github.com/baihuirong/Reader-Movie/blob/master/pictures/movie.gif)<br>

## get到的知识点<br>
* 垂直的外边距margin用px，如果用rpx是不可控的，因为手机长度是不确定的。而。水平的要用rpx,因为手机的宽度是有限的。
* 只有text组件包围的文字才能在小程序中长按选中 多重嵌套解决不同样式，能识别转译字符比如\n
* 出现错误appservice:1007 pages/welcome/welcome.js 出现脚本错误或者未正确调用 Page() 是因为welcome.js中没有任何逻辑 只需要在其中加入
```
Page({

})
```

```Page({
onTap:function(){
	wx.navigateTo({  //父级调到子级，最多只能跳5级
  	url: '../posts/posts,
	//success:function(res){//跳转成功执行},
	//fail:function(){//跳转失败执行},
	//complete:function(){//无论失败成功读会执行}
	//wx.rediretTo({url:’’})  启动页跳转到首页时用  无回退按钮 启动页被关闭和卸载
触发onUnload() ,
wx.navigateTo({url:’’}) 父页面调到子页面时用  有回退按钮 父页面触发onHide(),被隐藏


switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面！跳转不带tab的页面还是需要使用redirect或者navigate

	})
}
{)
```
//不同文件间传值
```
module.exports = {
postlist: loacal_database     //a.js中暴露local_database
}
b.js中
Var postData = require(‘../../data/a.js’)   //只能用相对路径
```
微信中template模板可以提取html和css，不可以提取js，只实现了模板编程，没实现模块编程，js只能写在引用页面的脚本文件里父`Posts.wxml`中<br>
`<template is="postItem" data="{{item}}"></template>`<br>
而子post-item-template.wxml绑定数据还要用`{{item.date}}`，<br>
* 小技巧：另一种方法解决不用item直接`{{date}} `<br>  
`<template is="postItem" data="{{...item}}"></template>`<br>
在父中不能再`template`中添加事件，因为页面文件编译后`template`就消失了，代替的是`template`里的元素，`template`在这里是占位符。也不能在`block`上加，因为`block`代表了总体的列表，而我们要绑定子元素，解决办法，在`template`外层加`view`，在`view`中注册事件<br>


  * 小程序没有dom，jquery的方法没法使用。比如收藏和未收藏2种状态，用脚本动态控制dom节点的src属性，让他指向不同的图片。小程序必须通过数据绑定的方法或者小程序提供的组件的if else来实现图片的显示隐藏或者动态切换。提倡的数据优先的思想，和jQuery的思想完全不同。
  
#### 实现切换图片两种方式：**<br>
  * if else
  * 数据绑定
  
#### 在其他js中调用全局变量**<br>
* 1.app.js中

```
App({
globalData:{
g_isPlayingMusic: false,
}
})
```
* 2.在调用的js中

```
var app = getApp();
var isPlayingMusic = app.globalData.g_isPlayingMusic;
```

target:指的是当前点击的组件 currentTarget：指的是事件捕获的组件<br>
**Page的onLoad函数里不可以再直接对data变量赋值做数据绑定**

```
 // this.data.postList = postsData.postList错误
    this.setData({//正确
       postList:postsData.postList
      });
```
[微信小程序开发组员汇总](https://zhuanlan.zhihu.com/p/25011766)  <br>
星级评分组件实现： 写一个js将评分拆成数组[1,1,1,0,0]格式。1表示有分数 再通过wx:if else来指定图片<br>
```
<block wx:for="{{stars}}" wx:for-item="i">
<image wx:if="{{i}}" src='/images/icon/star.png'></image>
<image wx:else src='/images/icon/none-star.png'></image>
</block>
```
### 获取远程接口数据
* util.js中
```
function http(url, callBack) {
  wx.request({
    url: url,
    method: "GET",
    header: {
      'content-type': '' // 默认值之前的版本有坑，json不行换成任意内容都行
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function () {
      console.log("fail");
    }
  })
}
module.exports = {
  http: http
}
```
* 请求接口的js中
```
var util = require('../../../utils/util.js');//1.
Page({
    onLoad: function (options) {
        var category = options.category;
        this.setData({
          navigateTitle: category
        });
        var dataUrl = "";
        //console.log(category);
        switch (category) {
          case "正在热映":
            var dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
            break;
          case "即将上映":
            var dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
            break;
          case "豆瓣Top250":
            var dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
            break;
        }
        this.setData({
          requsetUrl: dataUrl,
        })
        util.http(dataUrl, this.processDoubanData); //2.
    },
     processDoubanData: function (moviesDouban) {  //3.
        var movies = [];
        for (var idx in moviesDouban.subjects) {
          var subject = moviesDouban.subjects[idx];
          var title = subject.title;
          if (title.length >= 6) {
            title = title.substring(0, 6) + "...";
          }
          var temp = {
            title: title,
            average: subject.rating.average,
            coverageUrl: subject.images.large,
            movieId: subject.id,
            stars: util.converToStarsArray(subject.rating.stars)
          }
          movies.push(temp)
        }
        var totalMovies = {}; 
        //如果要绑定新加载的数据，需要同旧有的数据合并在一起
        if(!this.data.isEmpty){
          totalMovies = this.data.movies.concat(movies);
        }else{
          totalMovies = movies;
          this.data.isEmpty = false;
        }
        this.setData({
          movies: totalMovies,
        });
        this.data.totalCount += 20;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },
  
)
```
#### 动态设置导航栏 wx.setNavigationBarTitle(OBJECT)
```
onLoad: function (options) {
    var category = options.category;
    this.setData({
      navigateTitle: category
    });
    }，
  onReady: function (e) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }
```
* scroll-view组件实现上滑加载更多数据 ：对flex-direction无效 onScrollLower
* 下拉刷新：<br>
1、在需要下啦刷新的页面的json文件中添加 "enablePullDownRefresh": "true" <br>
2、在js中<br>
```
onPullDownRefresh:function(e){
    var refreshUrl = this.data.requsetUrl + "?start=0&count=20";
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
```

### 常见问题
* 出现“脚本错误或者未正确调用Page(),对应页面的js文件里，没有调用Page方法。<br>
  即使js文件里没有任何代码，也需要在js里添加一个空的 Page（{ }）<br>
  **注意Page的P要大写**<br>
* “Expecting ‘String，‘Number，‘NULL，‘True,'FALSE','{','}','[',got INVALID’== 对应页面的json文件没有加入{ }
* please do not register multiple Pages in undefined.js。多半是在 app.js里添加了Page（）
* 缺少文件，错误信息：error:iconPath=.......file not found?== iconPath出现了绝对路径 “ / ”






  
  
  
  
  
  
