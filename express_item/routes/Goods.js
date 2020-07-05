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
  if(priceLevel){
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
  }
  let goosModel=Good.find(params).skip(skip).limit(pageSize)//每页的条数
  // console.log(sort)
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
//购物车
router.get('/addCart',function(req,res,next){
  //假设得到了用户id
  var userId="100000077"
  var productId=req.param('productId')

  //var productId=req.body.productId//商品ID---post
  let User=require('../model/user_model.js')
  console.log(User)
  User.find({userId:userId},function(err,userDoc){
    if(err){
      // console.log('aaa')
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      if(userDoc){
        var dataOnly=true//判断购物车有没有此商品
        console.log(userDoc);//userDoc是一个数组
        userDoc[0].cartList.forEach(function(item){
          // console.log(item)
          if(item.productId==productId){
            dataOnly=false
            // console.log(item.productNum)
            item.productNum=item.productNum+1
            userDoc[0].save(function(err1,doc1){
              if(err1){
                res.json({
                  status:'1',
                  msg:err1.message
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'success'
                })
              }
            })
          }
        })
        if(dataOnly){
          Good.findOne({productId:productId},function(err2,doc2){
            if(err2){
              res.json({
                status:'1',
                msg:err2.message
              })
            }else{
              doc2.productNum=1
              doc2.checked='1'
              userDoc[0].cartList.push(doc2)
              userDoc[0].save(function(err3,doc3){//save是一个对象保存数据的方法
                if(err3){
                  res.json({
                    status:'1',
                    msg:err3.message
                  })
                }else{
                  res.json({
                    status:'0',
                    msg:'',
                    result:'success'
                  })
                }
              })
            }
          })
        }
      }
    }
  })
})
module.exports=router
