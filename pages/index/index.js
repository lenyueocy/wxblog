/**
 待解决：
 1. 【解决】图片自适应，图片地址转换
 **/

const util = require('../../utils/util.js');
const api = require('../../utils/api.js');
const app = getApp();
var page = 0;
Page({
    data: {
        posts: [],
        page: 0,
        loading: false,
        nodata: false,
        nomore: false,
        lowerComplete: true,
        colorr: "#ccc",
        defaultImageUrl: app.globalData.defaultImageUrl + app.globalData.imageStyle600To300,
        title: '冷月博客',
        articles: false,
        api: api.apiUrl
    },
    onLoad: function () {
        wx.showToast({
            title: '小冷月加载中',
            icon: 'loading',
            duration: 3000
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
    change: function () {
        var color = ['#ccc', '#fff', '#red', '#ffff66', '#66ff33', '#33ccff', '#ffff00', '#ccffff', '#ffdab9']
        var key = Math.floor(Math.random() * 9)
        this.setData({colorr: color[key]})
    },
    click: function () {
        var that = this
        wx.showModal({
            title: '呼~被你发现了',
            showCancel: false,
            content: '哇，被你发现了，你居然敢点我~这个秘密一般人是不知道的，你就不怕突然屏幕跳出一个女鬼？',
            success: function () {
                that.quit()
            },
        })
    },
    quit: function () {
        wx.showModal({
            title: '再见',
            showCancel: false,
            content: '再见了，小哥哥小姐姐们，这个博客还没建成，我不能让你们发现我的秘密，再见~',
            success: function () {
                wx.navigateBack({
                    delta: -1
                });
            },
        })
    },
    lower: function () {
        let that = this;
        if (!that.data.lowerComplete) {
            return;
        }
        if (!that.data.nomore && !that.data.nodata) {
            that.setData({
                loading: true,
                lowerComplete: false
            });
            that.getData();
            that.setData({
                lowerComplete: true
            });
        }
        console.log("lower")
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
    getData: function () {
        let that = this;
        let page = that.data.page;
        api.getBlogList({
            query: {
                limit: 10,
                page: page + 1,
                urlCode: '/article/lists'
            },
            success: (res) => {
                if (res.statusCode == 200 && res.data.code == 0) {
                    that.setData({
                        articles: res.data.data.list
                    });
                    wx.showToast({
                        title: '主人 好了~',
                        icon: 'success',
                        duration: 2000
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
    }
})
