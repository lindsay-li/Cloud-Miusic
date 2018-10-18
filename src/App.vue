<template>
  <div style="height:100%;width:100%">
    <div >
    <router-view></router-view>
    </div>
    <!-- <div class="showplayer">
        <a href="" @click.prevent="showP">展开</a>
    </div> -->
    <app-menu @parent-showP="showP"></app-menu> 
    <app-player></app-player>
    <!-- <app-scroll></app-scroll> -->
    <BackTop :height="100" :bottom="200" :right='100'>
        <div class="scrool_top">
          <Icon type="ios-arrow-up" />
          <span>顶部</span>
        </div>
    </BackTop>
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{
    "app-menu": resolve => {require(['./components/menu'], resolve)},
    "app-player": resolve => {require(['./components/player'], resolve)}
  },
  data(){
    return{
      heights:true
    }
  },
  methods:{
    showP:function(){
      
      if(this.$store.state.heightIs=='none'){
        this.$store.commit('showHeight')
      }else{
        this.$store.commit('hideHeight')
      }
    }
  },
  created(){
    document.body.removeChild(document.querySelector(".loadings"))
  }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-family: Arial, Helvetica, sans-serif;
    box-sizing:content-box !important;
  }
  body{
    background-color: #f0f3ef;
  }
  a{
    text-decoration: none;
  }
  body,html{width:100%;height:100%;font-size: 12px;font-family: Arial,Helvetica, sans-serif}
body{
    /* overflow: hidden; */
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
}
.showplayer{
  position: absolute;
  top:20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: aqua;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  z-index: 1000;
}
.showplayer>a{
  color: #fff;

}
#nprogress .bar {
      background: #F21F2B !important; 
  }
.scrool_top{
    width: 49px;
    cursor: pointer;
    background-color: rgba(0, 153, 229, .7);
    border-radius: 4px;
    color: #fff;
    text-align: center;

  }
</style>
