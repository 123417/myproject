var express = require('express');
var router = express.Router();
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
    console.log(doc)
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
module.exports = router;
