Component({
  data: {
    list:[]
  },
  attached: function(){
    // 可以在这里发起网络请求获取插件的数据
    this.setData({
      list: [{
        name: '我',
        price: 5
      }, {
        name: '爱',
        price: 2
      }, {
        name: '你',
        price: 0
      }]
    })
  },
})