/**
 待解决：
 1. 【解决】图片自适应，图片地址转换
 **/

const util = require('../../utils/util.js');
const api = require('../../utils/api.js');
const app = getApp();
Page({
    data: {
        posts: [],
        page: 1,
        notin: [],
        loading: false,
        sxtype: "",
        nodata: false,
        nomore: false,
        lowerComplete: true,
        colorr: "#ccc",
        defaultImageUrl: app.globalData.defaultImageUrl + app.globalData.imageStyle600To300,
        title: '冷月博客',
        articles: [],
        api: api.apiUrl,
        /* 搜索栏变量 */
        inputShowed: false,
        inputVal: "",
    },
    onLoad: function () {
        wx.showToast({
            title: '小冷月加载中',
            icon: 'loading',
            duration: 500
        });

        var that = this
        this.getData();
        /*wx.showModal({
         title: '呼~被你发现了',
         showCancel: false,
         content:'哇，被你发现了，你居然敢点我~这个秘密一般人是不知道的，你就不怕突然屏幕跳出一个女鬼？',
         success: function(){
         that.quit()
         },
         })*/
    },
    onReachBottom(){
        this.data.page++
        this.getData()
    },
    onPullDownRefresh(){
        setTimeout(() => {
            wx.stopPullDownRefresh();
        }, 100);
        this.data.sxtype = "rand"
        this.setData({
            articles: []
        })
        this.data.page = 1
        this.data.notin = []
        //开始获取随机数据
        this.getData();
    },
    //事件处理函数
    bindItemTap: function (e) {
        let blogId = e.currentTarget.id;
        wx.navigateTo({
            url: '../detail/detail?blogId=' + blogId
        })
    },
    //图片加载失败给到默认图片
    errorloadImage: function (e) {
        if (e.type == "error") {
            var index = e.target.dataset.index
            var posts = this.data.posts
            posts[index].slug = this.data.defaultImageUrl
            this.setData({
                posts: posts
            })
        }
    },
    getData: function (){
        let that = this;
        let page = that.data.page;
        let notins = that.data.notin;
        api.getBlogList({
            query: {
                limit: 6,
                page: page,
                notin: notins.join(","),
                type: this.data.sxtype,
                urlCode: '/article/lists'
            },
            success: (res) => {
                if (res.statusCode == 200 && res.data.code == 0) {
                    var arts =this.data.articles.concat(res.data.data.list)
                    var notin = this.data.notin
                    for (var i in arts){
                        notin.push(arts[i]['art_id'])
                    }
                    var qcnotin = notin.filter(function(element,index,self){
                        return self.indexOf(element) === index;
                    });

                    that.setData({
                        articles: arts,
                        notin: qcnotin
                    });
                }

                // const posts = res.data.posts;
                // for (var post of posts) {
                //   var time = util.formatTime(post.created_at);
                //   post.created_at = time;
                //   post.slug = app.globalData.imageUrl + post.slug + '.jpg?' + app.globalData.imageStyle600To300;
                // }
                // this.setData({
                //   posts: this.data.posts.concat(posts),
                //   page: res.data.meta.pagination.page,
                //   loading:false
                // });

            },
        });

    },
    /* 搜索栏 */
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    }

})
