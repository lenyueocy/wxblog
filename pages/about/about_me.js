
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:'cavincao2005@163.com',
    wechat:'冷月博客',
    selfwechat:'Lenyueocy',
    github:'https://github.com/Lenyueocy',
    qq:'492708759'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  copyDataTap:function(e){
    var data = e.target.dataset.index
    wx.setClipboardData({
      data: data,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) 
          }
        })
      }
    })
  }
})