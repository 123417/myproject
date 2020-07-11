<template>
    <div>
      <!--删除herder-->
      <Header></Header>
      <!--删除面包屑-->
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li class="cur"><span>Make</span> payment</li>
            <li class="cur"><span>Order</span> confirmation</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>Order ID：{{orderId}}</span>
              <span>Order total：{{orderTotal | c('￥')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <!--<a class="btn btn&#45;&#45;m">Cart List</a>-->
                <router-link class="btn btn--m" to="/Cart">Cart List</router-link>
              </div>
              <div class="btn-r-wrap">
                <!--<a class="btn btn&#45;&#45;m">Goods List</a>-->
                <router-link class="btn btn--m" to="/">Goods List</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--删除底部-->
      <NavFooter></NavFooter>
    </div>
</template>
<script>
  import Header from '@/components/Header'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import Modal from "../components/modal"   //引入模态框

  export default{
        data(){
            return{
              orderId:'',  //订单ID
              orderTotal:0  //总价
            }
        },
        mounted(){
          var orderId=this.$route.query.orderId;  //获取地址栏ID
          var orderTotal=this.$route.query.orderTotal;
          //console.log(orderId)
          if (!orderId){
            return    //如果id不存在,停止运行
          }
          this.orderId=orderId
          this.orderTotal=orderTotal
          // axios.get('/users/orderDetail',{params:{
          //   orderId:orderId
          //   }}).then((res)=>{
          //       if (res.data.status==='0'){
          //         this.orderId=orderId;     //如说数据成功,订单id赋值
          //         this.orderTotal=res.data.result  //订单总价赋值

          //       }
          // })
        },
        components:{
          Header,
          NavBread,
          NavFooter,
          Modal
        }
    }
</script>
