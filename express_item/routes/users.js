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
    console.log(doc)
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
router.post('/logout',function(req,res,next){
  res.cookie("userId",'',{
    path:"/",//出现在根目录范围
    maxAge:-1//负数代表失效
  })
  res.json({
    status:'0'
  })
})
module.exports = router;
