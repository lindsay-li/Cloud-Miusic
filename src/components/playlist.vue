<template>
  <div class="playlist">
     <div class="g-wrap">
         <div class="u-title f-cb">
             <h3>
                 <span>{{title}}</span>
                 <a href="javascript:;" class="btn-menu u-btn2" @click="showbox">
                     <i>选择分类<em class="u-icn"></em></i>
                 </a>
             </h3>
             <div class="u-btn" :class="{'btn-hot':isU,'btn-hot2':!isU}">
                 <a href="javascript:;" class="a1" @click.prevent="swiTch()">热门</a>
                 <a href="javascript:;" class="a2" @click.prevent="swiTch()">最新</a>
             </div>
         </div>
         <div class="catebox" v-show="showBox">
             <div class="hd">
                 <i class="icn"></i>
             </div>
             <div class="bd">
                <h3>
                     <a href="javascript:;" class="u-btn" @click.prevent="styles(title2)">
                         <em>全部风格</em>
                     </a>
                 </h3>
                <dl class="f-cb">
                     <dt>
                         <i class="u-icn2 u-icn"></i>语种
                     </dt>
                     <dd>
                         <a href="javascript:;" v-for="language in languages" @click.prevent="styles(language)" >{{language}}<span>|</span></a>
                     </dd>
                 </dl>
                <dl class="f-cb">
                     <dt>
                         <i class="u-icn3 u-icn"></i>风格
                     </dt>
                     <dd>
                         <a href="javascript:;" v-for="pop in popular" @click.prevent="styles(pop)">{{pop}}<span>|</span></a>
                     </dd>
                </dl>
                 <dl class="f-cb">
                     <dt>
                         <i class="u-icn4 u-icn"></i>场景
                     </dt>
                     <dd>
                         <a href="javascript:;" v-for="scene in scenes" @click.prevent="styles(scene)">{{scene}}<span>|</span></a>
                     </dd>
                 </dl>
                  <dl class="f-cb">
                     <dt>
                         <i class="u-icn5 u-icn"></i>情感
                     </dt>
                     <dd>
                         <a href="javascript:;" v-for="emotion in emotions" @click.prevent="styles(emotion)" >{{emotion}}<span>|</span></a>
                     </dd>
                 </dl>
                  <dl class="f-cb">
                     <dt>
                         <i class="u-icn6 u-icn"></i>主题
                     </dt>
                     <dd>
                         <a href="javascript:;" v-for="theme in themes" @click.prevent="styles(theme)" >{{theme}}<span>|</span></a>
                     </dd>
                 </dl>
             </div>
             <div class="ft"></div>
         </div>
         <ul class=" f-cb m-playlist" v-if="highQuality.code==200">
             <li v-for="songs in highQuality.playlists">
                 <div class="u-cover">
                     <img :src="songs.coverImgUrl">
                     <!-- <a href="" :title="songs.name" class="msk"></a> -->
                     <router-link :to="'/playlist_detail/'+songs.id" :title="songs.name" class="msk"></router-link>
                     <div class="bottom">
                         <a href="" title="播放" class="icon-play" @click.prevent="plays(songs.id)"></a>
                         <span class="icon-headset"></span>
                         <span class="nb">{{songs.playCount | nmFilter}}</span>
                     </div>
                 </div>
                 <p class="dec">
                     <!-- <a href="" :title="songs.name" class="f-thide tit">{{songs.name}}</a> -->
                     <router-link :to="'/playlist_detail/'+songs.id" :title="songs.name" class="f-thide tit">{{songs.name}}</router-link>
                 </p>
                 <p>
                     <span class="s-fc4">by</span>
                     <a href="" :title="songs.creator.nickname" class="nm f-thide">{{songs.creator.nickname}}</a>
                     <sup class="u-icn"></sup>
                 </p>
             </li>
         </ul>
         <div class="loading" v-else>
                   <img src="../assets/loading.gif" />
              </div>
         <div class="page">
             <div class="u-page">
                 <a href="" class="zbtn u-btn zprev" @click.prevent="prevPage">上一页</a>
                 <a href="" class="zpgi" v-show="curPage>5" @click.prevent="showPage(1)">1</a>
                 <span class="zdot" v-show="efont">...</span>
                 <a href="" class="zpgi" v-for="item in indexs" :class="{'selected':curPage==item}" @click.prevent="showPage(item)">{{item}}</a>
                 <span class="zdot" v-show="efonts">...</span>
                 <a href="" class="zpgi" v-show="curPage<pageCounts-4" @click.prevent="showPage(pageCounts)">{{pageCounts}}</a>
                 <a href="" class="zbtn u-btn znext" @click.prevent="addPage">下一页</a>
             </div>
         </div>
     </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data(){
      return{
          showBox:false,
          isU:true,
          pageCounts:35,
          curPage:1,
          languages:["华语","欧美","日语","韩语","粤语"],
          popular:["流行","摇滚","民谣","电子","舞曲","爵士","民族","乡村","古典","英伦","说唱","R&B/Soul","金属","蓝调","轻音乐","拉丁","古风","后摇"],
          scenes:["旅行","散步","运动","酒吧","午休","驾车","学习","清晨","夜晚"],
          emotions:["怀旧","清新","浪漫","性感","伤感","安静","思念",],
          themes:["影视原声","ACG","校园","游戏","70后","80后","90后","00后","儿童","网络歌曲"],
          cat:"全部",
          order:"hot",
          title:"全部",
          title2:"全部"
      }
  },
  created(){
    this.$store.dispatch("getHighquality",{
          order:this.order,
          limit:35,
          cat:this.cat,
          offset:0
      })
  },
  computed:{
        ...mapGetters([
            'highQuality',
            'playListDetail'
        ]),
        IsPlaylist(){
        return  this.$store.state.isplaylist
        },
        efont:function(){
            if(this.pageCounts<=7)return false;
            return this.curPage>5
        },
        efonts:function(){
            if(this.pageCounts<=7)return false;
            return this.curPage<this.pageCounts-4
        },
        indexs:function(){
            var left=1,
            right=this.pageCounts,
            ar=[];
            if(this.pageCounts>=7){
                if(this.curPage>5&&this.curPage<this.pageCounts-4){
                    left=Number(this.curPage)-3;
                    right=Number(this.curPage)+3;
                }else{
                    if(this.curPage<=5){
                        left=1;
                        right=7;
                    }else{
                        right=this.pageCounts;
                        left=this.pageCounts-6;
                    }
                }
            }
            while(left<=right){
                ar.push(left);
                left ++;
            }
            return ar;
        }
  },
  methods:{
    plays:function(n){
        this.$store.dispatch("getPlaylistDetail",{
            id:n
        }) 
    },
    addplays:function(){
        this.$store.commit('pushSong',this.playListDetail.result.tracks)
    },
    showbox:function(){
          this.showBox=!this.showBox
      },
    showPage:function(index){
        this.curPage=index;   
    },
    prevPage:function(){
        if(this.curPage>1){
            this.curPage--
        }else{
            this.curPage=1
        }   
    },
    addPage:function(){
        if(this.curPage<this.pageCounts){
            this.curPage++
        }else{
            this.curPage=pageCounts
        }
    },
    styles:function(val){
        this.$store.dispatch("getHighquality",{
          order:this.order,
          limit:35,
          cat:val,
          offset:0
      })
      this.showBox=false
      this.cat=val
      this.title=val
    },
    swiTch:function(){
        this.isU=!this.isU
        if(this.isU==false){
            this.$store.dispatch("getHighquality",{
                order:"new",
                limit:35,
                cat:this.cat,
                offset:0
            })
            this.order="new"
        }else{
            this.$store.dispatch("getHighquality",{
                order:"hot",
                limit:35,
                cat:this.cat,
                offset:0
            })
            this.order="hot"
        }
    }
  },
  watch:{
      curPage:function(val){
          this.$store.dispatch("getHighquality",{
          order:this.order,
          limit:35,
          cat:this.cat,
          offset:35*(val-1)
       })
      },
      IsPlaylist:function(){
           this.addplays()
        },
        highQuality(){
            this.pageCounts=Math.ceil(this.highQuality.total / 35)
        }
  },
  mounted(){
    //   this.pageCounts=Math.ceil(this.highQuality.total / 35)  
  }
}
</script>
<style scoped>
.f-cb::after{
    clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
}
.playlist{
    width: 980px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    font-size: 12px;
    color: #333;
}
.playlist .g-wrap{
    padding: 40px;
    position: relative;
}
.g-wrap .u-title{
    height: 40px;
    border-bottom: 2px solid #c20c0c;
}
.u-title h3{
    float: left;
    font-size: 24px;
    font-weight: normal;
    color: #333;
}
.u-title .btn-menu{
    font-size: 12px;
    font-weight: normal;
    margin: 2px 0 0 12px;
    color: #333;
    background-position:right -100px;
    padding:  0 5px 0 0;
    white-space: nowrap;
    display: inline-block;
    height: 31px;
    line-height: 31px;
    overflow: hidden;
    vertical-align: top;
    text-align: center;
}
.u-btn2,.u-btn2 i{
    display: inline-block;
    height: 31px;
    line-height: 31px;
    overflow: hidden;
    vertical-align: top;
    text-align: center;
    cursor: pointer;
}
.u-btn2,.u-btn2 i{
    background: url("../assets/button2.png") no-repeat;
}
.u-btn2 i{
    color: #0c73c2;
    padding: 0 10px 0 15px;
    background-position:0 -59px;
    pointer-events: none;
}
em,i{
    font-style: normal;
    font-size: inherit;
}
.u-icn{
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
}
.u-icn{
    background: url("../assets/icon.png") no-repeat;
}
.u-btn2 em{
    margin-left: 5px;
    width: 8px;
    height: 5px;
    background-position: -70px -543px;
}
.u-btn{
    display: inline-block;  
}
.u-btn,.u-page .selected{
    background: url("../assets/button.png") no-repeat;
}
.u-title .btn-hot{
    float: right;
    width: 93px;
    height: 29px;
    background-position: 0 0;
}
.u-title .btn-hot2{
    float: right;
    width: 93px;
    height: 29px;
    background-position: 0 -32px;
}
.btn-hot .a1,.btn-hot .a2{
    float: left;
    width: 46px;
    height: 29px;
    line-height: 29px;
    text-align: center;
    font-size: 12px;
}
.btn-hot2 .a1,.btn-hot2 .a2{
    float: left;
    width: 46px;
    height: 29px;
    line-height: 29px;
    text-align: center;
    font-size: 12px;
}
.btn-hot .a1{
    color: #fff;
}
.btn-hot .a2{
    color: #333;
}
.btn-hot2 .a1{
    color: #333;
}
.btn-hot2 .a2{
    color: #fff;
}
.btn-hot .a2:hover,.btn-hot .a1:hover{
    text-decoration: underline;
}
.g-wrap .catebox{
    position: absolute;
    top: 75px;
    z-index: 5;
    width: 720px;
    left: 0;
}
.catebox .hd{
    height: 32px;
}
.catebox .bd a:hover{
    text-decoration: underline;
}
.catebox .hd,.catebox .bd,.catebox .ft{
    background: url("../assets/sltlyr.png") no-repeat;
}
.catebox .hd .icn{
    position: absolute;
    top: 2px;
    left: 132px;
    display: inline-block;
    width: 24px;
    height: 11px;
    background-position: -48px 0;
    vertical-align: middle;
}
.hd .icn{
    background: url("../assets/iconall.png") no-repeat;
}
.catebox .bd{
    width: 700px;
    padding: 0 10px;
    background-position: -720px 0;
    background-repeat: repeat-y;
}
.catebox .bd h3{
    height: 37px;
    padding-left: 26px;
    border-bottom: 1px solid #e6e6e6;
    font-weight: normal;
}
.catebox .bd h3 a{
    width: 75px;
    height: 26px;
    background-position: 0 -64px;
    text-align: center;
    line-height: 26px;
    color: #333;
    font-size: 12px;
}
.catebox dt{
    float: left;
    display: inline;
    width: 70px;
    margin: 0 -100px 0 26px;
    padding-top: 15px;
    border-right: 1px solid #e6e6e6;
    font-weight: bold;
}
.catebox dt .u-icn2{
    width: 23px;
    height: 23px;
    background-position: -20px -735px;
    margin-right: 8px;
    margin-bottom: 4px;
}
.catebox dt .u-icn3{
    width: 24px;
    height: 24px;
    background-position: 0 -60px;
    margin-right: 8px;
    margin-bottom: 4px;
}
.catebox dt .u-icn4{
    width: 24px;
    height: 24px;
    background-position: 0 -88px;
    margin-right: 8px;
    margin-bottom: 4px;
}
.catebox dt .u-icn5{
    width: 24px;
    height: 24px;
    background-position: 0 -117px;
    margin-right: 8px;
    margin-bottom: 4px;
}
.catebox dt .u-icn6{
    width: 24px;
    height: 24px;
    background-position: 0 -141px;
    margin-right: 8px;
    margin-bottom: 4px;
}
.catebox dd{
    margin-left: 96px;
    padding: 16px 15px 0 15px;
    border-left: 1px solid #e6e6e6;
    line-height: 24px;
}
.catebox dd a{
    /* white-space: nowrap; */
    color: #333;
    font-size: 12px;
}
.catebox dd a.active{
    color: #fff;
    background-color: #999;
    padding: 2px 0;
}
.catebox dd a span{
    margin: 0 8px 0 10px;
    color: #d8d8d8;
}
.catebox .ft{
    height: 20px;
    background-position: -1440px -12px;
}
.g-wrap .m-playlist{
    margin: 30px 0 0 -50px;
}
.g-wrap .m-playlist li{
    float: left;
    display: inline-block;
    width: 140px;
    height: 188px;
    overflow: hidden;
    padding: 0 0 30px 50px;
    line-height: 1.4;
}
.m-playlist .u-cover{
    width: 140px;
    height: 140px;
    position: relative;
}
.u-cover img{
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
}
.u-cover .msk{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: 0 0;
}
.u-cover .msk,.u-cover .bottom{
    background: url("../assets/coverall.png") no-repeat;
}
.u-cover .icon-play,.u-cover .icon-headset{
    background: url("../assets/iconall.png") no-repeat;
}
.u-cover .bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 27px;
    background-position: 0 -537px;
    color: #ccc;
}
.bottom .icon-play{
    position: absolute;
    right: 10px;
    bottom: 5px;
    width: 16px;
    height: 17px;
    background-position: 0 0;
    display: inline-block;
    float: right;
}
.bottom .icon-headset{
    float: left;
    width: 14px;
    height: 11px;
    background-position: 0 -24px;
    margin: 9px 5px 9px 10px;
    display: inline-block;
}
.bottom .nb{
    float: left;
    margin: 7px 0 0 0;
    color: #ccc;
    font-size: 12px;
}
.m-playlist li .dec{
    margin: 8px 0 3px;
    font-size: 14px;
}
.m-playlist li .dec .tit{
    display: inline-block;
    vertical-align: middle;
    color: #000;
    width: 140px;
}
.f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.m-playlist li .s-fc4{
    color: #999;
    font-size: 12px;
}
.m-playlist li .nm{
    display: inline-block;
    vertical-align: middle;
    color: #666;
    font-size: 12px;
}
.m-playlist li .u-icn{
    margin-top:-1px;
    width: 12px;
    height: 13px;
    background-position: -65px -840px; 
}
.playlist .page .u-page{
    margin: 20px 0;
    text-align: center;
}
.page .u-page .zprev{
    background-position: 0 -620px;
    color: #cacaca;
    width: 47px;
    padding-left:22px; 
}
.page .u-page .zbtn{
    height: 24px;
    line-height: 24px;
    text-align: left;
    color: #333;
}
.page .u-page .zbtn,.page .u-page .zpgi{
    margin: 0 1px 0 2px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 2px;
    vertical-align: middle;
    font-size: 12px;
}
.page .u-page a.selected{
    background-position: 0 -650px;
    border-color: #a2161b;
    color: #fff;
    cursor: pointer;
}
.page .u-page .zpgi{
    height: 22px;
    padding: 0 8px;
    background-color: #fff;
    line-height: 22px;
    color: #333;
}
.page .u-page .znext{
    width: 57px;
    padding-left: 12px;
    background-position: -75px -560px;
}
.loading{
    width: 100%;
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
