var express = require('express');
var router = express.Router();
require('../util/util.js')
var User=require('../model/user_model')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res, next) {
  var param={
	  userName:req.body.userName,
	  userPwd:req.body.userPwd
    // userName:req.param('userName'),
    // userPwd:req.param('userPwd')
  }
  User.findOne(param,function(err,doc){
    // console.log(doc)
	  if(err){
		  res.json({
			  status:'1',
			  msg:err.message
		  })
	  }else{
		  if(doc){
        res.cookie("userId",doc.userId,{
          path:"/",//出现在根目录范围
          maxAge:1000*60*60//数据储存时间
        }),
        res.cookie("userName",doc.userName,{
          path:"/",//出现在根目录范围
          maxAge:1000*60*60//数据储存时间
        })
			  res.json({
				  status:'0',
				  msg:'',
				  result:{
					  userName:doc.userName
				  }
			  })
		  }else{
        res.json({
          status:'1'
        })
      }
	  }
  })
});
//重新刷新后还显示登录名
router.post('/checkLogin',function(req,res,next){
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'已登录',
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    })
  }
})
//退出登陆
router.post('/logout',function(req,res,next){
  res.cookie("userId",'',{
    path:"/",//出现在根目录范围
    maxAge:-1//负数代表失效
  })
  res.cookie("userName",'',{
    path:"/",//出现在根目录范围
    maxAge:-1//负数代表失效
  })
  res.json({
    status:'0'
  })
})
//购物车
router.post('/cartList',function(req,res,next){
  var userId=req.cookies.userId
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1'
      })
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'success',
          result:doc.cartList
        })
      }
    }
  })
})
//购物车删除功能
router.post('/deleteCart',function(req,res,next){
  var userId=req.cookies.userId
  var productId=req.body.productId
  User.update({userId:userId},{$pull:{"cartList":{"productId":productId}}},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:'faild'
      })
    }else{
      res.json({
        status:'0',
        msg:'success'
      })
    }
  })
})
//购物车数量加减
router.post('/cartNum',function(req,res,next){
  var userId=req.cookies.userId
  var productId=req.body.productId
  var productNum=req.body.productNum
  User.update({"userId":userId,"cartList.productId":productId},{"cartList.$.productNum":productNum},function(err,doc){
    if(err){
      res.json({
        status:'1'
      })
    }else{
      res.json({
        status:'0'
      })
    }
  })
})
//复选框的变化
router.post('/checkItem',function(req,res,next){
  var userId=req.cookies.userId
  var productId=req.body.productId
  var check=req.body.checked
  User.update({"userId":userId,"cartList.productId":productId},{"cartList.$.checked":check},function(err,doc){
    if(err){
      res.json({
        status:'1'
      })
    }else{
      res.json({
        status:'0'
      })
    }
  })
})
//全选框的变化
router.post('/allCheck',function(req,res,next){
  var userId=req.cookies.userId
  var checked=req.body.checkAllFlag?'1':'0'
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1'
      })
    }else{
     if(doc){
       doc.cartList.forEach(function(item){
         item.checked=checked
       })
     }
      doc.save(function(err,doc){
        if(err){
          res.json({
            status:'1'
          })
        }else{
          res.json({
            status:'0'
          })
        }
      })
    }
  })
})
// 地址栏请求数据
router.get('/addressList',function(req,res,next){
  var userId=req.cookies.userId
  User.findOne({userId:userId},function(err,doc){
    // console.log(doc)
    if(err){
      res.json({
        status:'1'
      })
    }else{
      if(doc){
        res.json({
          status:'0',
          result:doc.addressList
        })
      }
    }
  })
})
// set Default
router.post('/setDefault',function(req,res,next){
  var userId=req.cookies.userId
  var addressId=req.body.addressId
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1'
      })
    }else{
      var addressLists=doc.addressList
      addressLists.forEach(function(item){
        if(addressId==item.addressId){
          item.isDefault=true
        }else{
          item.isDefault=false
        }
      })
      doc.save(function(err1,doc1){
        if(err1){
          res.json({
            status:'1'
          })
        }else{
          res.json({
            status:'0',
            result:'success'
          })
        }
      })
    }
  })
})
//删除地址接口
router.post('/delAddress',function(req,res,next){
  var userId=req.cookies.userId
  var addressId=req.body.addressId
  User.update({userId:userId},{$pull:{"addressList":{"addressId":addressId}}},function(err,doc){
    if(err){
      res.json({
        status:'1'
      })
    }else{
      res.json({
        status:'0'
      })
    }
  })
})
//确认添加地址
router.post('/confirmAddress',function(req,res,next){
  var userId=req.cookies.userId
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1'
      })
    }else{
      if(doc){
        doc.addressList.push(req.body)
        doc.save(function(err1,doc1){
          if(err1){
            res.json({
              status:'1'
            })
          }else{
            res.json({
              status:'0'
            })
          }
        })
      }
    }
  })
})
//Proceed to payment
router.post('/payment',function(req,res,next){
  var userId=req.cookies.userId
  var addressId=req.body.addressId
  var OrderTotal=req.body.OrderTotal
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1'
      })
    }else{
      if(doc){
        var address='',goodlist=[]
        doc.addressList.forEach(function(item){
          if(addressId==item.addressId){
            address=item
          }
        })
        doc.cartList.forEach(function(item){
          if(item.checked=='1'){
            goodlist.push(item)
          }
        })
        var platform='318'//平台吗
        var r1=Math.floor(Math.random()*10)//随机数
        var r2=Math.floor(Math.random()*10)//随机数
        var sysDate=new Date().Format('yyyyMMddhhmmss')
        var createDate=new Date().Format('yyyy-MM-dd hh:mm:ss')
        var orderId=platform+r1+sysDate+r2//订单号
        var order={//要添加的数据
          orderId:orderId,
          orderTotal:OrderTotal,
          addressInfo:address,
          goodsList:goodlist,
          orderStatus:"1",
          createDate:createDate
        }
        doc.orderList.push(order)
        doc.save(function(err1,doc1){
          if(err1){
            res.json({
              status:'1'
            })
          }else{
            res.json({
              status:'0',
              result:{
                orderId:order.orderId,
                orderTotal:order.orderTotal
              }
            })
          }
        })
      }
    }
  })
})
module.exports = router;

