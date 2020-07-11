var mongoose=require('mongoose')
var Schema=mongoose.Schema
var userSchema=new Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[{
      "productImg":String,
      "productPrice":Number,
      "productName":String,
      "productId":String,
      "_id":String,
      "productNum":Number,
      "checked":String
    }],
  "addressList":[{
    "addressId" : String,
    "userName" : String,
    "streetName" : String,
    "postCode" : String,
    "tel" : String,
    "isDefault" : Boolean
  }]
})
module.exports=mongoose.model('users',userSchema)
// "userId" : "100000077",
//   "userName" : "admin",
//   "userPwd" : "123456",
//   "orderList" : [{
//       "orderId" : "6224201705302250301",
//       "orderTotal" : 3359,
//       "addressInfo" : {
//         "addressId" : "100001",
//         "userName" : "JackBean",
//         "streetName" : "??????????????????????????????",
//         "postCode" : 100001,
//         "tel" : 12345678901.0,
//         "isDefault" : true
//       },
//       "goodsList" : [{
//           "productImage" : "mi6.jpg",
//           "productPrice" : "2499",
//           "productName" : "??????6",
//           "productId" : "201710006",
//           "_id" : ObjectId("58c284f4117a2e6599abef60"),
//           "productNum" : 1,
//           "checked" : "1"
//         }, {
//           "productImage" : "2.jpg",
//           "productPrice" : "80",
//           "productName" : "???????????????-3",
//           "productId" : "201710004",
//           "_id" : ObjectId("58c284d7117a2e6599abef5e"),
//           "productNum" : 7,
//           "checked" : "1"
//         }],
//       "orderStatus" : "1",
//       "createDate" : "2019-05-30 22:50:30"
//     }],
//   "cartList" : [{
//       "productImage" : "1.jpg",
//       "productPrice" : "149",
//       "productName" : "?????????????????????",
//       "productId" : "201710017",
//       "_id" : ObjectId("58e7058498dab115d336b3fc"),
//       "productNum" : 6,
//       "checked" : "0"
//     }],
//   "addressList" : [{
//       "addressId" : "100001",
//       "userName" : "JackBean",
//       "streetName" : "??????????????????????????????",
//       "postCode" : "100001",
//       "tel" : "12345678901",
//       "isDefault" : true
//     }]
