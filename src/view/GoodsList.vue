<template>
  <div>
      <div class="mask_layer" id="mask_layer" v-show="price_mask_isshow"></div>
        <Header />
        <nav-bread></nav-bread>


      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg></a>
            <a href="javascript:void(0)" class="filterby stopPop"  @click="price_menu">Filter by</a>
          </div>
          <div class="accessory-result">
            filter
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':price_menu_isshow}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceState_all=='active'}" @click="priceState_status_all">All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="priceState_set(index)" v-bind:class="{'cur':priceState_all==index}">{{item.startPrice}}-{{item.endPrice}}</a>
                </dd>

              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.productImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.productPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="goodsInfinite">
                   <span v-show="loadingSvg" >加载中...</span>
                </div>
                <!-- v-infinite-scroll:滚动就会触发这个事件
                  busy值为true时，禁止滚动；为false时，可以滚动
                  infinite-scroll-distance设置距离底部的距离，到达这个距离可以滚动 -->
                 
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>

    </div>
</template>

<script>
  import "@/assets/css/base.css";
  import "@/assets/css/login.css";
  import "@/assets/css/checkout.css";
  import "@/assets/css/product.css";
  import Header from "../components/Header";
  import NavFooter from "../components/NavFooter";
  import NavBread from "../components/NavBread";
  export default{
        data(){
          return {
              loadingSvg:true,
              busy:true,
              sortFlag:true,//升降序开关
              page:1,
              pageSize:4,
              goodList:[],
              priceState_all:'active',
              price_mask_isshow:false,
              price_menu_isshow:false,
              priceFilter:[
                {startPrice:'0.00',endPrice:'100.00'},
                {startPrice:'100.00',endPrice:'500.00'},
                {startPrice:'500.00',endPrice:'2000.00'},
                {startPrice:'2000.00',endPrice:'10000.00'},
              ]
          }
        },
        mounted(){
          this.getGoodsList()
        },
        methods:{
          sortGoods(){
            this.sortFlag=!this.sortFlag;
            this.page=1;
            this.getGoodsList()
          },
          loadMore(){
            setTimeout(()=>{
              this.page++;
              this.getGoodsList(true)
            },500)
          },
          price_menu(){
            this.price_mask_isshow=true;
            this.price_menu_isshow=true;
          },
          priceState_set(index){
            this.page=1;
            this.priceState_all=index
            this.price_mask_isshow=false;
            this.price_menu_isshow=false;
            this.getGoodsList()  //每次点击后getGoodsList--查询
          },
          priceState_status_all(){
            this.page=1;//每次点击对应的价位，保证从第一页开始查询
            this.priceState_all='active'
            this.price_mask_isshow=false;
            this.price_menu_isshow=false;
            this.getGoodsList()  //每次点击后getGoodsList--查询
          },
          getGoodsList(flag){
            var pageData={
              priceLevel:this.priceState_all,
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortFlag?1:-1
            }
            this.$axios.get('/goods',{params:pageData}).then(
              res=>{
                console.log(res.data.result.list);
                if(res.data.status=="0"){
                  if(flag){
                    this.goodList=this.goodList.concat(res.data.result.list)
                    if(res.data.result.count=="0"){
                      this.busy=true
                    }
                  }else{
                    this.goodList=res.data.result.list
                    this.busy=false
                  }
                }else{
                  this.goodList=[]
                }

              }
            )
          }
        },
        components:{
           Header,
           NavFooter,
           NavBread
        }
  }
</script>

<style>
  .mask_layer{
    width: 100vw;
    height:100vh;
    background-color: rgba(0,0,0,0.3);
    position:fixed;
    z-index: 1;
  }
  .goodsInfinite{
    height:100px;
    line-height: 100px;
    text-align: center;
  }
</style>
