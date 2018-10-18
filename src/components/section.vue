<template>
  <div class="section">
      <div class="page">
          <div class="page-left">
              <div class="stairs">
                  <div class="stair-1">
                      <div class="popular">
                          <a href="javascript:;">热门推荐</a>
                          <div class="tab">
                              <router-link to="/playlist" class="type">华语</router-link>
                              <span> | </span>
                              <router-link to="/playlist" class="type">流行</router-link>
                              <span> | </span>
                              <router-link to="/playlist" class="type">摇滚</router-link>
                              <span> | </span>
                              <router-link to="/playlist" class="type">民谣</router-link>
                              <span> | </span>
                              <router-link to="/playlist" class="type">电子</router-link>
                          </div>
                          <span class="more">
                              <router-link to="/playlist" class="m-r">更多</router-link>
                              <span></span>
                          </span>
                      </div>
                      <ul class="hot-list">
                          <li v-for="list in playList">
                              <div class="mv">
                                  <img :src="list.picUrl">
                                  <router-link :to="'/playlist_detail/'+list.id" :title="list.name" class="msk">
                                  </router-link>
                                  <div class="bottom">
                                      <a href="" class="icon-play" title="播放" @click.prevent="plays(list.id)"></a>
                                      <span class="icon-headset"></span>
                                      <span class="nm">{{list.playCount | nmFilter}}</span>
                                  </div>
                              </div>
                              <p class="dec">
                                  <router-link :to="'/playlist_detail/'+list.id" :title="list.name" class="title">{{list.name}}
                                  </router-link>
                              </p>
                          </li>
                      </ul>
                  </div>
                  <div class="stair-2">
                      <div class="rcm">
                          <span class="title">个性化推荐</span>
                      </div>
                      <ul class="rcm-list">
                          <li>
                              <a href="" class="date">
                                  <span class="head">星期{{weke}}</span>
                                  <span class="bd">{{date}}</span>
                                  <span class="mask"></span>
                              </a>
                              <p class="dec">
                                  <a href="" class="tit" title="每日歌曲推荐">每日歌曲推荐</a>
                              </p>
                              <p class="idv">
                                  根据你的口味生成，
                                  <br/>
                                  每天6:00更新
                              </p>
                          </li>
                          <li class="com" v-for="i in com">
                              <div class="cover">
                                  <img src="../assets/rli6643249256145165.jpg">
                                  <a href="" title="" class="msk"></a>
                                  <div class="bottom">
                                      <a href="javascript:;" class="play"></a>
                                      <a href="javascript:;" class="head"></a>
                                      <span class="nm">86.5万</span>
                                  </div>
                              </div>
                              <p class="dec">
                                  <a href="" title="" class="tit">那些只听前奏就中毒的英文歌</a>
                              </p>
                              <p class="idv" title="">
                                  根据你收藏的歌单《【节奏控】超带感的音乐》推荐
                              </p>
                          </li>
                      </ul>
                  </div>
                  <div class="stair-3">
                      <div class="list">
                          <a href="javascript:;" class="tit">榜单</a>
                          <span class="more">
                              <router-link :to="'/toplist/'+3">更多</router-link>
                              <i>&nbsp;</i>
                          </span>
                      </div>
                      <div class="list-top" v-if="topList.length >=3 ">
                          <dl class="blk" >
                              <dt class="top">
                                  <div class="cover">
                                      <img :src="topList[0].coverImgUrl">
                                      <router-link :to="'/toplist/'+0" :title="topList[0].name"></router-link>
                                  </div>
                                  <div class="titl">
                                      <a href="" :title="topList[0].name">
                                          <h3>{{topList[0].name}}</h3>
                                      </a>
                                      <div class="btn">
                                          <a href="javascript:;" class="pl" title="播放"></a>
                                          <a href="javascript:;" class="coll" title="收藏"></a>
                                      </div>
                                  </div>
                              </dt>
                              <dd>
                                  <ol>
                                      <li v-for="(track,index) in topList[0].tracks " v-if="index < 10">
                                          <span class="no" :class="{noRed:index <=2}">{{index+1}}</span>
                                          <router-link :to="'/songDetail/'+track.id" class="mic" :title="track.name">{{track.name}}
                                          </router-link>
                                          <div class="oper">
                                              <a href="" title="播放" class="pl" @click.prevent="player(track.id)"></a>
                                              <a href="javascript:;" title="添加到播放列表" class="addto"></a>
                                              <a href="javascript:;" title="收藏" class="coll"></a>
                                          </div>
                                      </li>
                                  </ol>
                                  <div class="more">
                                      <router-link :to="'/toplist/'+0">查看全部></router-link>
                                  </div>
                              </dd>
                          </dl>
                          <dl class="blk">
                              <dt class="top">
                                  <div class="cover">
                                      <img :src="topList[1].coverImgUrl">
                                      <router-link :to="'/toplist/'+2" :title="topList[1].name"></router-link>
                                  </div>
                                  <div class="titl">
                                      <a href="javascript:;" :title="topList[1].name">
                                          <h3>{{topList[1].name}}</h3>
                                      </a>
                                      <div class="btn">
                                          <a href="javascript:;" class="pl" title="播放"></a>
                                          <a href="javascript:;" class="coll" title="收藏"></a>
                                      </div>
                                  </div>
                              </dt>
                              <dd>
                                  <ol>
                                      <li v-for="(track,index) in topList[1].tracks " v-if="index < 10">
                                          <span class="no" :class="{noRed:index <=2}">{{index+1}}</span>
                                          <router-link :to="'/songDetail/'+track.id" class="mic" :title="track.name">{{track.name}}
                                          </router-link>
                                          <div class="oper">
                                              <a href="" title="播放" class="pl" @click.prevent="player(track.id)"></a>
                                              <a href="javascript:;" title="添加到播放列表" class="addto"></a>
                                              <a href="javascript:;" title="收藏" class="coll"></a>
                                          </div>
                                      </li>
                                  </ol>
                                  <div class="more">
                                      <router-link :to="'/toplist/'+2">查看全部></router-link>
                                  </div>
                              </dd>
                          </dl>
                          <dl class="blk">
                              <dt class="top">
                                  <div class="cover">
                                      <img :src="topList[2].coverImgUrl">
                                      <!-- <a href="" :title="topList[2].name"></a> -->
                                      <router-link :to="'/toplist/'+3" :title="topList[2].name"></router-link>
                                  </div>
                                  <div class="titl">
                                      <a href="javascript:;" :title="topList[2].name">
                                          <h3>{{topList[2].name}}</h3>
                                      </a>
                                      <div class="btn">
                                          <a href="" class="pl" title="播放"></a>
                                          <a href="javascript:;" class="coll" title="收藏"></a>
                                      </div>
                                  </div>
                              </dt>
                              <dd>
                                  <ol>
                                      <li v-for="(track,index) in topList[2].tracks " v-if="index < 10">
                                          <span class="no" :class="{noRed:index <=2}">{{index+1}}</span>
                                          <router-link :to="'/songDetail/'+track.id" class="mic" :title="track.name">{{track.name}}
                                          </router-link>
                                          <div class="oper">
                                              <a href="" title="播放" class="pl" @click.prevent="player(track.id)"></a>
                                              <a href="javascript:;" title="添加到播放列表" class="addto"></a>
                                              <a href="javascript:;" title="收藏" class="coll"></a>
                                          </div>
                                      </li>
                                  </ol>
                                  <div class="more">
                                      <router-link :to="'/toplist/'+3">查看全部></router-link>
                                  </div>
                              </dd>
                          </dl>
                      </div>
                  </div>
                  <div class="stair-4"></div>
              </div>
          </div>
      </div>
      <div class="page-right">
          <div class="user">
              <p>登录Cloud Music，可以体验收藏乐趣，参与评论，记录自己的音乐痕迹</p>
              <a href="javscript:;" @click.prevent="showReigister">用户登录</a>
          </div>
          <div class="n-singer">
              <h3 class="v-hd3">
                  <span class="f-f1">入驻歌手</span>
                  <a href="javascript:;" class="more s-fc3">查看全部</a>
              </h3>
              <ul class="n-enter f-cb">
                  <li v-for="singer in singers">
                      <a href="javascript:;" class="itm f-tdn">
                          <div class="head">
                              <img class="j-img" :src="singer.img">
                          </div>
                          <div class="ifo">
                              <h4>
                                  <span class="nm f-fs1 f-ib f-thide">{{singer.name}}</span>
                              </h4>
                              <p class="f-thide s-fc3">{{singer.intro}}</p>
                          </div>
                      </a>
                  </li>
              </ul>
          </div>
          <div class="n-dj n-dj-1">
              <h3 class="v-hd3">热门主播</h3>
              <ul class="n-hotdj f-cb">
                  <li v-for="DJ in hotDj">
                      <a href="javasript:;" class="cver">
                          <img class="j-img" :src="DJ.img">
                      </a>
                      <div class="info">
                          <p>
                              <a href="javascript:;" class="nm-icn f-thide s-fc0">{{DJ.name}}</a>
                              <sup class="u-icn u-icn-1"></sup>
                          </p>
                          <p class="f-thide s-fc3">{{DJ.intro}}</p>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name:"app-section",
  data(){
      return{
          list:8,
          com:3,
          singers:[
              {"name":"张惠妹aMEI","intro":"台湾歌手张惠妹","img":require("../assets/amei5931865232210340.jpg")},
              {"name":"Fine乐团","intro":"独立音乐人","img":require("../assets/duli3302932937408956.jpg")},
              {"name":"萬暁利","intro":"民谣歌手、中国现代民谣的代表人物之一","img":require("../assets/wan19027048718765608.jpg")},
              {"name":"音乐人赵雷","intro":"名谣歌手","img":require("../assets/zhao7943971513291094.jpg")},
              {"name":"王三溥","intro":"音乐人","img":require("../assets/wang109951162895674268.jpg")}
          ],
          hotDj:[
              {"name":"陈立","intro":"心里学家、美食家陈立教授","img":require("../assets/chen1407374893913311.jpg")},
              {"name":"DJ艳秋","intro":"著名音乐节目主持人","img":require("../assets/qiu7942872001461517.jpg")},
              {"name":"国家大剧院古典音乐频道","intro":"国家大剧院古典音乐官方","img":require("../assets/guo3427177769086282.jpg")},
              {"name":"谢谢收听","intro":"南京电台主持人王馨","img":require("../assets/xie3130309604335651.jpg")},
              {"name":"DJ晓苏","intro":"独立DJ，CRI环球旅游广播特邀DJ","img":require("../assets/DJ3440371884651965.jpg")},
          ],
          date:"",
          weke:""
      }
  },
  created(){
      this.$store.dispatch("getPlaylist"),
      this.$store.dispatch("getToplist",{
          idx1:3,
          idx2:0,
          idx3:2
      })
      this.getDate()
  },
    computed:{
        ...mapGetters([
        'playList',
        'topList',
        'playListDetail',
        'songDetail'
        ]),
        IsPlaylist(){
            return  this.$store.state.isplaylist
        },
        IsSong(){
            return  this.$store.state.isSong
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
        player:function(n){
            this.$store.dispatch("getSongdetail",{
                id:n
            })
        },
        addSongs:function(){
          this.$store.commit('unshiftSong',this.songDetail.songs[0])
        },
        showReigister:function(){
            this.$store.commit('showLogin')
        },
        getDate:function(){
            var date = new Date();
            var weeke = ["日","一","二","三","四","五","六"];
            this.date = date.getDate();
            var w = date.getDay();
            this.weke = weeke[w];
        }
    },
    watch: {
        IsPlaylist:function(){
           this.addplays()
        },
        IsSong:function(){
            this.addSongs()
        }
    }
}
</script>
<style scoped>
.section{
    width: 980px;
    /* min-height: 700px; */
    margin: 0 auto;
    background: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    background: url("../assets/wrap1.png") repeat-y 100% 100%;
}
.section>.page{
    float: left;
    width: 100%;
    margin-right:-250px; 
}
.section::after{
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
}
.page>.page-left{
    margin-right:251px; 
}
.page-left>.stairs{
    padding: 20px 20px 40px;
}
.stairs>.stair-1{
    width: 689px;
    height: 523px;
}
.stairs>.stair-1>.popular{
    height: 33px;
    padding: 0 10px 0 34px;
    border-bottom: 2px solid #c10d0c;
    background: url("../assets/index.png") no-repeat;
    background-position:-225px -156px;  
}
.stair-1>.popular>a{
    float: left;
    font-size: 20px;
    font-weight:normal;
    line-height: 30px;
    color:  #333;
}
.stair-1>.popular>.tab{
    float: left;
    margin: 7px 0 0 20px;
}
.popular>.tab>.type{
    color: #666;
    font-size:12px; 
}
.popular>.tab>.type:hover{
    color: #c10d0c;
}
.popular>.tab>span{
    margin: 0 10px;
    color: #ccc;
    font-size: 12px;
}
.stair-1>.popular>.more{
    float: right;
    margin-top:9px; 
}
.popular>.more>.m-r{
    color: #666;
    font-size: 12px;
}
.popular>.more>span{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    vertical-align: middle;
    background: url("../assets/index.png") no-repeat;
    background-position:0 -240px; 
}
.stairs>.stair-1>.hot-list{
    margin: 20px 0 0-42px;
    /* width: 731px;
    height: 468px; */
}
.stair-1>.hot-list>li{
    width: 140px;
    height: 204px;
    float: left;
    display: inline-block;
    overflow: hidden;
    padding: 0 0 30px 42px;
    line-height: 1.4;
}
.hot-list>li>.mv{
    width: 140px;
    height: 140px;
    position: relative;
    display: block;
}
.hot-list>li>.mv>img{
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
}
.hot-list>li>.mv>.msk{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/coverall.png") no-repeat;
    background-position:0 0; 
}
.hot-list>li>.mv>.bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 27px;
    background: url("../assets/coverall.png") no-repeat;
    background-position:0 -537px;
    color: #ccc; 
}
.mv>.bottom>.icon-play{
    position: absolute;
    right: 10px;
    bottom: 5px;
    width: 16px;
    height: 17px;
    display: inline-block;
    background: url("../assets/iconall.png") no-repeat;
    background-position: 0 0;
}
.mv>.bottom>.icon-headset{
    float: left;
    width: 14px;
    height: 11px;
    margin: 9px 5px 9px 10px;
    display: inline-block;
    background: url("../assets/iconall.png") no-repeat;
    background-position: 0 -24px;
}
.mv>.bottom>.nm{
    float: left;
    margin: 6px 0 0 0;
    font-size: 12px;
}
.hot-list::after{
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
}
.hot-list>li>.dec{
    margin: 8px 0 3px;
    font-size: 14px;
    width: 100%;
}
.hot-list>li>.dec>.title{
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    color: #000;
    font-size: 14px;
}
.stairs>.stair-2>.rcm{
    height: 33px;
    padding: 0 10px 0 34px;
    background: url("../assets/index.png") no-repeat;
    background-position: -225px -156px;
    border-bottom: 2px solid #c10d0c;
}
.stair-2>.rcm>.title{
    float: left;
    font-size: 20px;
    line-height: 28px;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}
.stairs>.stair-2>.rcm-list{
    display: table;
    margin:20px 0 4px -42px;
    line-height: 0;
}
.stair-2>.rcm-list>li{
    display: table-cell;
    height: auto;
    width: 140px;
    padding:0 0 30px 42px;
    overflow: hidden;
    line-height: 1.4;
    float: left; 
}
.rcm-list>li>.date{
    position: relative;
    zoom: 1;
    display: block;
    width: 140px;
    height: 140px;
    background: url("../assets/date.png") no-repeat;
    background-position:0 0; 
}
li>.date>.head{
    display: block;
    height: 33px;
    line-height: 33px;
    color: #fed9d9;
    font-size: 14px;
    text-shadow: 0 -1px #962626;
    text-align: center;
}
li>.date>.bd{
    display: block;
    line-height: 102px;
    text-align: center;
    font-size: 94px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #202020;
}
li>.date>.mask{
    position: absolute;
    top: 33px;
    left: 0;
    width: 142px;
    height: 107px;
    background: url("../assets/date.png") no-repeat;
    background-position:0 -150px; 
}
.rcm-list>li>.dec{
    margin: 8px 0 3px;
    font-size: 14px;
}
.rcm-list>li>.dec>.tit{
    height: auto;
    max-height: 36px;
    max-width: 100%;
    font-size: 14px;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    color: #000;
}
.rcm-list>li>.idv{
    margin-top: 3px;
    color: #999;
    font-size: 12px;
}
.com>.cover{
    width: 140px;
    height: 140px;
    position: relative;
    display: block;
}
.com>.cover>img{
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
}
.com>.cover>.msk{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/coverall.png") no-repeat;
    background-position: 0 0;
}
.com>.cover>.bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 27px;
    background: url("../assets/coverall.png") no-repeat;
    background-position: 0 -537px;
    color: #ccc;
}
.cover>.bottom>.play{
    position: absolute;
    right: 10px;
    bottom: 5px;
    width: 16px;
    height: 17px;
    display: inline-block;
    background: url("../assets/iconall.png") no-repeat;
    background-position: 0 0;
}
.cover>.bottom>.head{
    float: left;
    width: 14px;
    height: 11px;
    margin: 9px 5px 9px 10px;
    display: inline-block;
    background: url("../assets/iconall.png") no-repeat;
    background-position: 0 -24px;
}
.cover>.bottom>.nm{
    float: left;
    margin: 7px 0 0 0;
    font-size: 12px;
}
.rcm-list::after{
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
}
.stairs>.stair-3>.list{
    height: 33px;
    padding: 0 10px 0 34px;
    background: url("../assets/index.png") no-repeat;
    background-position: -225px -156px;
    border-bottom: 2px solid #c10d0c;
}
.stair-3>.list>.tit{
    float: left;
    font-size: 20px;
    line-height: 28px;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    color:#333;
}
.stair-3>.list>.more{
    float:right;
    margin-top:9px; 
}
.stair-3>.list>.more>a{
    color:#666;
    font-size: 12px;
}
.stair-3>.list>.more>i{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    vertical-align: middle;
    background: url("../assets/index.png") no-repeat;
    background-position:0px -240px; 
}
.stairs>.stair-3>.list-top{
    height: 472px;
    width: 690px;
    margin-top: 20px;
    padding-left: 1px;
    background: url("../assets/index_bill.png") no-repeat;
}
.stair-3>.list-top .blk{
    float: left;
    width: 230px;
}
.list-top .blk>.top{
    height: 100px;
    padding: 20px 0 0 19px;
}
.blk>.top>.cover{
    float: left;
    width: 80px;
    height: 80px;
    position: relative;
}
.top>.cover>img{
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
}
.top>.cover>a{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/coverall.png") no-repeat;
    background-position: -145px -57px;
}
.blk>.top>.titl{
    float: left;
    width: 116px;
    margin: 6px 0 0 10px;
}
.top>.titl h3{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    font-size: 14px;
    color: #333;
}
.top>.titl>.btn{
    margin-top: 10px;
}
.top>.titl>.btn>a{
    display: block;
    float: left;
    width: 22px;
    height: 22px;
    margin-right: 10px;
}
.top>.titl>.btn>.pl{
    background: url("../assets/index.png") no-repeat;
    background-position: -267px -205px;
}
.top>.titl>.btn>.coll{
    background: url("../assets/index.png") no-repeat;
    background-position: -300px -205px;
}
.list-top .blk ol{
    height: 319px;
    margin-left: 50px;
    line-height: 32px;
}
.blk ol>li{
    height: 32px;
    list-style: none;
}
.blk ol>li * {
    vertical-align: middle;
}
.blk ol .no{
    float: left;
    /* position: relative; */
    width: 35px;
    height: 32px;
    margin-left: -35px;
    text-align: center;
    color: #666;
    font-size: 16px;
}
.blk ol span.noRed{
    color: #c10d0c;
}
.blk ol .mic{
    float: left;
    width: 135px;
    height: 32px;
    color: #000;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.blk ol li:hover a.mic{
    width: 96px;
}
/* .blk ol .oper{
    
    width: 0px;
    height: 0px;
    
} */
.blk ol li:hover div.oper{
    float: right;
    width: 82px;
    margin-top:7px;
    display: inline-block;
}
/* .blk ol .oper a{
    float: left;
    width: 0px;
    height: 0px;
     
} */
.blk ol li:hover div.oper a{
    float: left;
    width: 17px;
    height: 17px;
    margin-right:10px;
}
.blk ol .oper .pl{
    background: url("../assets/index.png") no-repeat;
    background-position: -267px -268px;
}
.blk ol .oper .addto{
    margin: 2px 6px 0 0;
    background: url("../assets/icon.png") no-repeat;
    background-position: 0 -700px;
}
.blk ol .oper .coll{
    background: url("../assets/index.png") no-repeat;
    background-position: -297px -268px;
}
.list-top .blk .more{
    clear: both;
    height: 32px;
    margin-right: 32px;
    text-align: right;
    line-height: 32px;
}
.blk .more>a{
    color: #000;
    font-size: 12px;
}
.section>.page-right{
    float: right;
    width: 250px;
    zoom: 1;
}
.section>.page-right .user{
    height:126px;
    padding-top: 0;
    background: url("../assets/index.png") 0 0 no-repeat;
}
.page-right .user p{
    width: 205px;
    margin: 0 auto;
    padding: 16px 0;
    line-height: 22px;
    color: #666;
    font-size: 12px;
}
.page-right .user a{
    display:block;
    margin: 0 auto;
    width: 100px;
    height: 31px;
    text-align: center;
    line-height: 31px;
    color: #fff;
    font-size: 12px;
    text-shadow: 0 1px 0 #8a060b;
    background: url("../assets/index.png") no-repeat;
    background-position: 0 -195px;
}
.page-right .n-singer{
    margin-top: 15px;
}
.v-hd3 {
    position: relative;
    height: 23px;
    margin: 0 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
    font-size: 12px;
}
.f-fl {
    float: left;
}
.v-hd3 .more {
    float: right;
    font-weight: normal;
}
.s-fc3, a.s-fc3:hover {
    color: #666;
}
.n-enter {
    margin: 6px 0 14px 20px;
}
.f-cb::after {
    clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
}
.n-enter li, .n-enter .itm {
    float: left;
    width: 210px;
    height: 62px;
    background: #fafafa;
}
.n-enter li {
    margin-top: 14px;
}
.n-enter .head, .n-enter .head img {
    float: left;
    width: 62px;
    height: 62px;
}
.n-enter .ifo {
    float: left;
    width: 133px;
    height: 60px;
    padding-left: 14px;
    border: 1px solid #e9e9e9;
    border-left: none;
}
.n-enter h4 {
    margin-top: 8px;
}
.f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.n-enter p {
    width: 90%;
    margin-top: 8px;
}
.f-ib {
    display: inline-block;
}
.f-fs1 {
    font-size: 14px;
}
.f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.n-enter .nm {
    width: 90%;
    color: #333;
}
.n-dj-1 {
    margin-top: 30px;
    color: #333;
}
.n-hotdj {
    margin: 20px 0 0 20px;
}
.n-hotdj li {
    float: left;
    width: 210px;
    height: 50px;
}
.n-hotdj .cver {
    float: left;
    width: 40px;
    margin-right: 10px;
}
.n-hotdj .cver img {
    width: 40px;
    height: 40px;
    box-shadow: 0 0 1px #333333 inset;
}
img, .txt {
    border: 0;
}
.n-hotdj .info {
    float: left;
    width: 160px;
    line-height: 21px;
}
.n-hotdj p {
    width: 100%;
    font-size: 12px;
}
.s-fc0, a.s-fc0:hover {
    color: #000;
}
.n-hotdj .nm-icn {
    display: inline-block;
    max-width: 88%;
    vertical-align: middle;
}
.u-icn{
    background: url("../assets/icon.png") no-repeat 0 9999px;
}
.u-icn {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
}
.u-icn-1 {
    width: 11px;
    height: 13px;
    background-position: 0 1px;
    font-size: 100%;
    font-style: normal;
}
.n-hotdj .info .u-icn {
    margin-top: -1px;
}

</style>
