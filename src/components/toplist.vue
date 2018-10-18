<template>
  <div class="toplist f-cb">
      <div class="menu">
          <div class="m-list">
              <h2>云音乐特色榜</h2>
              <ul>
                  <li v-for="(menu,index) in menus" v-if="index <= 3">
                      <router-link :to="'/toplist/'+menu.idx">
                      <div class="item f-cb">
                          <div class="left">
                              <a href="" class="avatar">
                                  <img :src="menu.picUrl">
                                  <span></span>
                              </a>
                          </div>
                          <p class="name">
                              <router-link :to="'/toplist/'+menu.idx">{{menu.title}}</router-link>
                          </p>
                          <p class="day">{{menu.state}}</p>
                      </div>
                      </router-link>
                  </li>
              </ul>
              <h2 class="mt">全球媒体榜</h2>
              <ul>
                  <li v-for="(menu,index) in menus" v-if="index > 3">
                      <div class="item f-cb">
                          <div class="left">
                              <a href="" class="avatar">
                                  <img :src="menu.picUrl" alt="">
                                  <span></span>
                              </a>
                          </div>
                          <p class="name">
                              <!-- <a :href="'/toplist/'+menu.idx">{{menu.title}}</a> -->
                              <router-link :to="'/toplist/'+menu.idx">{{menu.title}}</router-link>
                          </p>
                          <p class="day">{{menu.state}}</p>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
      <div class="content" v-if="topList.length >=1">
          <div class="c-list">
              <div class="c-wrap1">
                  <div class="c-info f-cb">
                      <div class="cover">
                          <img :src="topList[0].coverImgUrl" alt="">
                          <span></span>
                      </div>
                      <div class="cnt">
                          <div class="cntc">
                              <div class="hd f-cb">
                                  <h2>{{topList[0].name}}</h2>
                              </div>
                              <div class="user f-cb">
                                  <i></i>
                                  <span class="up">最近更新：{{topList[0].updateTime | updateTimefil}}</span>
                                  <span>（每天更新）</span>
                              </div>
                              <div class="btns f-cb">
                                  <a href="" class="play1" @click.prevent="playing">
                                      <i>
                                          <em></em>
                                          播放
                                      </i>
                                  </a>
                                  <a href="" class="play2"></a>
                                  <a href="" class="call">
                                      <i>({{topList[0].subscribedCount}})</i>
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="c-wrap2">
                  <div class="u-title f-cb">
                      <h3>
                          <span>歌曲列表</span>
                      </h3>
                      <span class="sub">
                          <span>{{topList[0].trackCount}}</span>首歌
                      </span>
                      <div class="more">
                          播放：<strong>{{topList[0].playCount}}</strong>次
                      </div>
                  </div>
                  <div class="song-list">
                      <div>
                          <table class="m-table">
                              <thead>
                                  <tr>
                                      <th class="first"></th>
                                      <th>
                                          <div class="wp">标题</div>
                                      </th>
                                      <th class="three">
                                          <div class="wp">时长</div>
                                      </th>
                                      <th class="fore">
                                          <div class="wp">歌手</div>
                                      </th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr class="even" v-for="(song,index) in topList[0].tracks" >
                                      <td>
                                          <div class="hd">
                                              <span class="num" :class="{numRed : index <=9}">{{index+1}}</span>
                                          </div>
                                      </td>
                                      <td class="rank">
                                          <div class="f-cb">
                                              <div class="tt">
                                                  <a href="">
                                                      <img :src="song.al.picUrl" v-show="index<=2">
                                                  </a>
                                                  <span class="ply" @click="player(song.id)">&nbsp;</span>
                                                  <div class="ttc">
                                                      <span class="txt">
                                                          <!-- <a href="" :title="song.name">{{song.name}}</a> -->
                                                          <router-link :to="'/songDetail/'+song.id" :title="song.name">{{song.name}}</router-link>
                                                          <span v-show="song.alia[0]!=null">-({{song.alia[0]}})</span>
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </td>
                                      <td>
                                          <span class="time">{{song.dt | dtTime}}</span>
                                      </td>
                                      <td>
                                          <div class="text">
                                              <a href="" :title="song.ar[0].name">{{song.ar[0].name}}</a>
                                          </div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div class="comment"></div>
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
        menus:[
            {
                "picUrl":require("../assets/toplist-1.jpg"),
                "title":"云音乐飙升榜",
                "state":"每天更新",
                'idx':3
            },
            {
                "picUrl":require("../assets/toplist-2.jpg"),
                "title":"云音乐新歌榜",
                "state":"每天更新",
                'idx':0
            },
            {
                "picUrl":require("../assets/toplist-3.jpg"),
                "title":"网易原创歌曲榜",
                "state":"刚刚更新",
                'idx':2
            },
            {
                "picUrl":require("../assets/toplist-4.jpg"),
                "title":"云音乐热歌榜",
                "state":"刚刚更新",
                'idx':1
            },
            {
                "picUrl":require("../assets/toplist-5.jpg"),
                "title":"云音乐电音榜",
                "state":"每周五更新",
                'idx':4
            },
            {
                "picUrl":require("../assets/toplist-6.jpg"),
                "title":"iTunes榜",
                "state":"每周一更新",
                'idx':8
            },
            {
                "picUrl":require("../assets/toplist-7.jpg"),
                "title":"中国TOP排行榜（内地榜）",
                "state":"每周一更新",
                'idx':15
            },
            {
                "picUrl":require("../assets/toplist-8.jpg"),
                "title":"KTV唛榜",
                "state":"每周五更新",
                'idx':7
            },
            {
                "picUrl":require("../assets/toplist-9.jpg"),
                "title":"Beatport全球电子舞曲榜",
                "state":"刚刚更新",
                'idx':21
            },
            {
                "picUrl":require("../assets/toplist-10.jpg"),
                "title":"美国Billboard周榜",
                "state":"每周三更新",
                'idx':6
            }
            ], 
    }
  },
  watch:{
     "$route":"getToplist",
     IsSong:function(){
        this.addSongs()
     }
  },
  methods:{
      getToplist(){
          this.$store.dispatch("getToplist",{
          idx1:this.$route.params.id
      })
      },
      player:function(n){
        this.$store.dispatch("getSongdetail",{
          id:n
        })
      },
      addSongs:function(){
          this.$store.commit('unshiftSong',this.songDetail.songs[0])
      },
      playing:function(){
          this.$store.commit('pushSong',this.topList[0].tracks)
      }
  },
  created(){
      this.getToplist()
  },
  computed:{
    ...mapGetters([
        'topList',
        'songDetail'
    ]),
    IsSong(){
        return  this.$store.state.isSong
    }
  },
}
</script>
<style scoped>
.toplist{
    width: 980px;
    margin: 0 auto;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    background: url("../assets/wrap3.png") repeat-y center 0;
}
.toplist .menu{
    float: left;
    width: 240px;
}
.menu .m-list{
    margin-top: 40px;
}
.menu .m-list h2{
    padding:  0 10px 12px 15px;
    font-size: 14px;
    color: #000;
    font-family: simsun,\5b8b\4f53;
}
.menu .m-list .mt{
    margin-top: 20px;
}
.menu .m-list ul *{
    cursor: pointer;
    vertical-align: middle;
}
.menu .m-list li{
    padding: 10px 0 10px 20px;
    position: relative;
    height: 42px;  
}
.menu .m-list li.active{
    background-color: #e6e6e6;
}
.menu .m-list li:hover{
    background-color:#eee;
}
.m-list li .item{
    padding-left: 50px;
}
.m-list .item .left{
    display: inline-block;
    float: left;
    margin-left: -50px;
    overflow: hidden;
    width: 40px;
}
.m-list .item .name{
    width: 150px;
    overflow: hidden;
    margin-top: 2px;
    margin-bottom: 8px;
}
.item .name>a{
    color: #000;
    white-space: nowrap;
    font-size: 12px;
}
.m-list .item .day{
    color: #999;
    font-size: 12px;
}
.item .left .avatar{
    display: block;
    position: relative;
    width: 40px;
    height: 40px;
    color: #333;
}
.left .avatar img{
    width: 40px;
    height: 40px;
}
.left .avatar span{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-position: -310px -330px;
}
.toplist .content{
    float: right;
    width: 740px;
    padding-bottom: 50px;
}
.content .c-wrap1{
    padding: 40px;
}
.c-info .cover{
    float: left;
    position: relative;
    display: inline-block;
    margin: 0 -220px 0 0;
    padding: 3px;
    border: 1px solid #ccc;
    width: 150px;
    height: 150px;
}
.c-info .cnt{
    float: right;
    width: 100%;
}
.c-info .cover img{
    width: 150px;
    height: 150px;
    border: 0;
}
.c-info .cover span{
    position: absolute;
    width: 150px;
    height: 150px;
    background: url("../assets/coverall.png") no-repeat;
    background-position: -230px -380px;
    top: 3px;
    left: 3px;
}
.c-info .cnt .cntc{
    margin-left: 187px;
}
.cnt .cntc .hd{
    position: relative;
    margin: 16px 0 4px;
    line-height: 24px;
}
.cnt .cntc .hd h2{
    line-height: 24px;
    font-size: 20px;
    font-weight: normal;
}
.cnt .cntc .user{
    margin: 0 0 20px;
    line-height: 35px;
}
.cnt .cntc .user i{
    float: left;
    margin: 12px 0 0 3px;
    width: 13px;
    height: 13px;
    background: url("../assets/icon.png") no-repeat;
    background-position: -18px -682px;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    font-style: normal;
    text-align: left;
    font-size: inherit;
}
.cnt .cntc .user .up{
    margin-left: 5px;
    color: #666;
    font-size: 12px;
}
.cnt .cntc .user span{
    color: #999;
    font-size: 12px;
}
.cnt .cntc .btns{
    margin-bottom: 25px;
    margin-right: -10px;
}
.cnt .cntc .btns .play1{
    float: left;
    color: #fff;
    background: url("../assets/button2.png") no-repeat;
    background-position:  right -428px;
    padding: 0 5px 0 0;
    white-space: nowrap;
    display: inline-block;
    height: 31px;
    line-height: 31px;
    overflow: hidden;
    vertical-align: top;
    text-align: center;
    cursor: pointer;
}
.cntc .btns .play1 i{
    padding: 0 7px 0 8px;
    color: #fff;
    background: url("../assets/button2.png") no-repeat;
    background-position: 0 -387px;
    pointer-events: none;
    display: inline-block;
    height: 31px;
    line-height: 31px;
    overflow: hidden;
    vertical-align: top;
    text-align: center;
    cursor: pointer;
}
.cntc .btns .play1 i em{
    float: left;
    width: 20px;
    height: 18px;
    margin: 6px 2px 2px 0;
    background: url("../assets/button2.png") no-repeat;
    background-position: 0 -1622px;
    overflow: hidden;
}
.cntc .btns i,.cntc .btns em{
    font-style: normal;
    text-align: left;
    font-size: inherit;
}
.cnt .cntc .btns .play2{
    margin-right: 5px;
    width: 31px;
    margin-left: -3px;
    padding-right: 0;
    background: url("../assets/button2.png") no-repeat;
    background-position: 0 -1588px;
    padding: 0 5px 0 0;
    white-space: nowrap;
    float: left;
    height: 31px;
    line-height: 30px;
    min-width: 23px;
    cursor: pointer;
}
.cnt .cntc .btns .call{
    margin-right: 6px;
    font-family: simsun,\5b8b\4f53;
    font-size: 12px;
    background: url("../assets/button2.png") no-repeat;
    background-position: right -1020px;
    padding: 0 5px 0 0;
    white-space: nowrap;
    float: left;
    height: 31px;
    line-height: 30px;
    min-width: 23px;
    cursor: pointer;
}
.cnt .cntc .btns .call i{
    padding-right: 2px;
    padding-left: 28px;
    float: left;
    height: 31px;
    line-height: 30px;
    min-width: 23px;
    cursor: pointer;
    background: url("../assets/button2.png") no-repeat;
    background-position: 0 -977px;
    color: #000;
    font-size: 12px;
}
.content .c-wrap2{
    padding: 0 30px 40px 40px;
}
.c-wrap2 .u-title{
    height: 33px;
    border-bottom: 2px solid #c20c0c;
}
.c-wrap2 .u-title h3{
    font-size: 20px;
    line-height: 28px;
    float: left;
    font-weight: normal;
}
.u-title h3>span{
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    color: #333;
}
.c-wrap2 .u-title .sub{
    margin: 9px 0 0 20px;
    float: left;
    color: #666;
    font-size: 12px;
}
.c-wrap2 .u-title .more{
    margin-top: 5px;
    float: right;
    color: #666;
    font-size: 12px;
}
.u-title .more strong{
    color: #c20c0c;
    font-weight: bold;
}
.c-wrap2 .song-list .m-table{
    width: 100%;
    border: 1px solid #d9d9d9;
}
table{
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
.m-table .first{
    width: 77px;
}
.m-table  th .wp{
    height: 18px;
    line-height: 18px;
    padding: 8px 10px;
    background-position: 0 -56px;
    font-size: 12px;
}
.m-table .three{
    width: 91px;
}
.m-table .fore{
    width: 14%;
}
.m-table th,th .wp{
     background: url("../assets/table.png") no-repeat;
}
.m-table th{
    height: 38px;
    background-color: #f7f7f7;
    background-position: 0 0;
    background-repeat: repeat-x;
    vertical-align: top;
    text-align: left;
    font-weight: normal;
    color: #666;
}
.m-table .even td{
    background-color: #f7f7f7;
}
.m-table td{
    padding: 6px 10px;
    line-height: 18px;
    text-align: left;
}
.m-table td,.m-table .rank .ply{
    background: url("../assets/table.png") no-repeat 0 9999px;
}
.m-table .hd{
    height: 18px;
}
.m-table .hd .num{
    float: left;
    width: 25px;
    margin-left: 0;
    text-align: center;
    color: #999;
    font-size: 12px;
}
.m-table .hd span.numRed{
    color: #c20c0c;
}
.m-table .rank{
    padding-top:10px;
    padding-bottom: 10px; 
}
.m-table .tt {
    float: left;
    width: 100%;
}
.m-table .rank img{
    float: left;
    width: 50px;
    height: 50px;
    margin-right: 14px;
}
.m-table .rank .ply{
    margin-top:17px;
    margin-right: 8px;
    float: left;
    width: 17px;
    height: 17px;
    cursor: pointer;
    background-position: 0 -103px;
}
.m-table .rank .ttc{
    margin-top: 16px;
    height: 18px;
    margin-right: 20px;
}
.m-table .rank .ttc a:hover{
    text-decoration: underline;
}
.m-table .rank .ttc .txt{
    display: inline-block;
    padding-right: 25px;
    margin-right: -25px;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 270px;
}
.rank .ttc .txt a{
    color: #333;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.rank .ttc .txt span{
    color: #aeaeae;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.m-table .time{
    font-size: 12px;
    color: #666;
}
.m-table .even .text{
    width: 100%;
    position: relative;
    zoom: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.m-table .even .text a{
    white-space: nowrap;
    color: #333;
    font-size: 12px;
}







.f-cb::after{
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
}
</style>
