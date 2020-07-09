<template>
  <!-- 登录 -->
  <div>
     <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':mdShow}"><!--md-show控制登陆框的显示影藏-->
    <!-- class=md-show控制登陆框的显示隐藏 -->
     <div class="md-modal-inner">
        <div class="md-top">
        <!-- <div class="md-title">Login in</div> -->
           <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
           <div class="confirm-tips">
             <!-- 插槽信息 -->
             <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <!-- <a href="javascript:;" class="btn-login"  @click="Login">登 录</a> -->
            <!-- 按钮组 -->
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
     </div>
    <div class="mask_layer" v-show="mdShow"></div>
  </div>
</template>

<script>
  export default{
      props:['mdShow'],
      methods:{
        closeModal(){
          this.$emit('close')
        }
      }
  }
</script>

<style>
  .btnClose{
    display:block;
    margin:0px auto;
    width:200px;
    border: 1px solid pink;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
    color:red
  }
</style>
