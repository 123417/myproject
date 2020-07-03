var express = require('express');//引入express框架
var router = express.Router();//引入路由
var mongoose=require('mongoose');//引入数据库
var Good=require('../model/goods_model.js')
mongoose.connect('mongodb://127.0.0.1/db_demo',{useNewUrlParser:true})//连接数据库
mongoose.connection.on('connect',()=>{//监听数据库是否成功
  console.log('成功了')
})
mongoose.connection.on('error',function(){//错误
  console.log('失败了')
})
mongoose.connection.on('disconnected',function(){//断开
  console.log('断开了')
})
router.get('/',function(req,res,next){//路由
  let page=parseInt(req.param("page"))//获取地址栏page页码
  let pageSize=parseInt(req.param("pageSize"))//获取地址栏每页显示的条数
  let sort=req.param("sort")//排序的方法，1-升序，-1表示降序
  let skip=(page-1)*pageSize//每页的起始条数
  let priceLevel=req.param('priceLevel')  //获取你要查询级别（范围）0,1,2,3,…… active
  var priceGt='' //最大
  var priceLt=''  //最小
  let params={}
  if(priceLevel!='active'){  //没有点击all按钮
    console.log(priceLevel)
    switch (priceLevel) {
      case '0': priceLt=0; priceGt=100; break;
      case '1': priceLt=100; priceGt=500; break;
      case '2': priceLt=500; priceGt=2000; break;
      case '3': priceLt=2000; priceGt=10000; break;
    }
    params={
      productPrice:{
        $gt:priceLt, //大于
        $lte:priceGt  //小于=（包含）  $lt小于
      }
    }  //查询的条件必须是个对象，空对象查全部
   }
  let goosModel=Good.find(params).skip(skip).limit(pageSize)//每页的条数
  console.log(sort)
  goosModel.sort({"productPrice":sort})//以价格排序
  goosModel.exec(function(err,doc){
    if(err){
      res.json({
        status:"1",
        mes:err.message
      })
    }else{
      res.json({
        status:"0",
        mes:'成功了',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})
module.exports=router
