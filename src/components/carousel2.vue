<template>
  <div class="banner" @mouseover="stop" @mouseleave="go">
      <transition-group tag="ul" class="pic-ul" name="pic">
          <li v-for="(list,index) in pic" :key="index" :class="[move[index]]">
              <a href="#">
                  <img :src="list.picUrl" alt="" @click.prevent="target(index)" @load='imgload'>
              </a>
          </li>
      </transition-group>
      <a href="javascript:viod(0)" class="btn-lf" @click.prevent="prePic"></a>
      <a href="javascript:viod(0)" class="btn-rf" @click.prevent="autoPlay"></a>
  </div>
</template>
<script>
export default {
  name:"app-car",
  data () {
    return {
      pic:[
           {
              "clickUrl":"#",
              "desc":"11",
              "image":require("../assets/109951163119736276-01.jpg")
          },
          {
              "clickUrl":"#",
              "desc":"22",
              "image":require("../assets/109951163119736417-02.jpg")
          },
          {
              "clickUrl":"#",
              "desc":"33",
              "image":require("../assets/109951163118447003-03.jpg")
          },
          {
              "clickUrl":"#",
              "desc":"44",
              "image":require("../assets/109951163118321561-04.jpg")
          },
          {
              "clickUrl":"#",
              "desc":"55",
              "image":require("../assets/109951163119939072-05.jpg")
          },
      ],
      currentIndex:0,
      timer:'',
      move:['left','center','right'],
      count:0
    }
  },
  methods:{
      autoPlay(){
        let temp =this.move.pop();
        this.move.unshift(temp);
      },
      imgload(){ //所有banner加载完了在开始轮播
          this.count++;
          if(this.count >= 5){
              console.log(111)
              this.go();
              this.count = 0;
          }
      },
      prePic:function(){
          let temp = this.move.shift();
          this.move.push(temp);
      },
      go(){
        this.timer = setInterval(()=>{
            this.autoPlay()
        },3000)
    },
    stop(){
        clearInterval(this.timer)
        this.timer =null
    },
    target(index){
        const num =this.pic.length;
        for(let i=0;i<num;i++){
            this.move[i]='wait';
        }
        this.move[index] ='center';
        this.move[index + 1 <num ? index + 1 : 0] ='right';
        this.move[index - 1 === -1 ? num - 1 :index - 1] ='left';
        this.move = this.move.concat();
    }
  },
  mounted:function(){
      for(let i = 3;i<this.pic.length;i++){
          this.move[i]='wait'
      }
    // this.timer=setInterval(()=>{
          
    //   },3000)
  },
  created(){
      this.$http.get("/banner",{
        xhrFields: {
        withCredentials: true
        }
      })
      .then((res)=>{
          console.log(res)
        this.pic = res.data.banners
      })
      
  },
}
</script>
<style scoped>
    .banner{
        width: 980px;
        height: 336px;
        margin: 0 auto;
        position: relative;
    }
    .banner .pic-ul{
        position: absolute;
        perspective:1000px;
        width: 100%;
        height: 100%;
    }
    .banner .pic-ul li{
        position: absolute;
        top: 0px;
        left: 13%;
        transition: transform 0.5s,scale 1s,left 1s,right 1s; 
    }
    .banner .pic-ul li.left,
    .banner .pic-ul li.right{
        transform: scale(0.9,0.9);
        z-index: 10;
    }
    .banner .pic-ul li.left{
        left:-3.7%;
    }
    .banner .pic-ul li.right{
        left:29.2%;
    }
    .banner .pic-ul li.center{
        left:13%;
        z-index: 100;
    }
    .banner .pic-ul li.wait{
        transform: scale(0,0);
    }
    .banner .pic-ul li img{
        width: 730px;
        height:336px;
    }
    .banner>.btn-lf, .banner>.btn-rf{
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -31px;
        width: 37px;
        height: 63px;     
    }
   .banner>.btn-lf{
        background: url("../assets/banner.png")  no-repeat;
        background-position:0 -358px;  
    }
    .banner>.btn-rf{ 
        background: url("../assets/banner.png")  no-repeat;
        background-position:0 -505px;
        right: 0;
    }
    .banner>.btn-lf:hover{
        background: url("../assets/banner.png")  no-repeat;
        background-position:0 -428px;
    }
    .banner>.btn-rf:hover{
        background: url("../assets/banner.png")  no-repeat;
        background-position:0 -575px;
    }
</style>
