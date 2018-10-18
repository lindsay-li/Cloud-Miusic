<template>
  <div class="m-playlist f-cb">
      <div class="left">
          <div class="g-mn4c">
              <div class="g-wrap6" v-if="playListDetail.code==200">
                  <div class="m-info f-cb">
                      <div class="cover">
                          <img :src="playListDetail.result.coverImgUrl">
                          <span class="msk"></span>
                      </div>
                      <div class="cnt">
                          <div class="cntc">
                              <div class="hd f-cb">
                                  <i class="u-icn u-icn1"></i>
                                  <div class="tit">
                                      <h2 class="f-brk">{{playListDetail.result.name}}</h2>
                                  </div>
                              </div>
                              <div class="user f-cb">
                                  <a href="javascript:;" class="face">
                                      <img :src="playListDetail.result.creator.avatarUrl">
                                  </a>
                                  <span class="name">
                                      <a href="javascript:;">{{playListDetail.result.creator.nickname}}</a>
                                  </span>
                                  <sup class="u-icn u-icn2"></sup>
                                  <span class="time">{{playListDetail.result.createTime | updateTimefil}}&nbsp;创建</span>
                              </div>
                              <div class="btns f-cb">
                                    <a href="" title="播放" class="u-btn2 u-btn2-2 u-btni-addply" @click.prevent="plays">
                                      <i>
                                          <em class="ply"></em>
                                          播放
                                      </i>
                                    </a>
                                  <a href="javascript:;" title="添加到播放列表" class="u-btni u-btni-add"></a>
                                  <a href="javascript:;" class="u-btni u-btni-fav">
                                      <i>({{playListDetail.result.subscribedCount}})</i>
                                  </a>
                                  <a href="javascript:;" class="u-btni u-btni-share">
                                      <i>({{playListDetail.result.shareCount}})</i>
                                  </a>
                                  <a href="javascript:;" class="u-btni u-btni-cmmt">
                                      <i>({{playListDetail.result.commentCount}})</i>
                                  </a>
                              </div>
                              <div class="tags f-cb">
                                  <b>标签：</b>
                                  <a class="u-tag" href="" v-for="tag in playListDetail.result.tags">
                                      <i>{{tag}}</i>
                                  </a>
                              </div>
                              <p class="intr f-brk">
                                  <b>介绍：</b>
                                  {{playListDetail.result.description | sTring}}
                              </p>
                          </div>
                      </div>
                  </div>
                  <div class="n-songtb">
                      <div class="u-title f-cb">
                          <h3>
                              <span class="f-ff2">歌曲列表</span>
                          </h3>
                          <span class="sub s-fc3">
                              <span>{{playListDetail.result.trackCount}}</span>首歌
                          </span>
                          <div class="more s-fc3">
                              播放：<strong class="s-fc6">{{playListDetail.result.playCount}}</strong>次
                          </div>
                      </div>
                      <div>
                          <table class="m-table">
                              <thead>
                                  <tr>
                                      <th class="first w1">
                                          <div class="wp">&nbsp;</div>
                                      </th>
                                      <th class="w5">
                                          <div class="wp af0"></div>
                                      </th>
                                      <th class="w2">
                                          <div class="wp af1"></div>
                                      </th>
                                      <th class="w3">
                                          <div class="wp af2"></div>
                                      </th>
                                      <th class="w4">
                                          <div class="wp af3"></div>
                                      </th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr class="even" v-for="(song,index) in playListDetail.result.tracks">
                                      <td>
                                          <div class="hd">
                                              <span class="ply" @click="player(song.id)" title="播放">&nbsp;</span>
                                              <span class="num">{{index+1}}</span>
                                          </div>
                                      </td>
                                      <td>
                                          <div class="f-cb">
                                              <div class="tt">
                                                  <div class="ttc">
                                                      <span class="txt">
                                                          <router-link :to="'/songDetail/'+song.id" :title="song.name">
                                                              <b :title="song.name">{{song.name}}</b>
                                                          </router-link>
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </td>
                                      <td class="s-fc3">
                                          <span>{{song.duration | dtTime}}</span>
                                      </td>
                                      <td>
                                          <div class="text">
                                              <span>
                                                  <a href="javascript:;" v-for="ar in song.artists" :title="ar.name">{{ar.name}}<span v-show="song.artists.length>1">/</span></a>
                                              </span>
                                          </div>
                                      </td>
                                      <td>
                                          <div class="text">
                                              <a href="javascript:;" :title="song.album.name">{{song.album.name}}</a>
                                          </div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              <div class="loading" v-else>
                   <img src="../assets/loading.gif" />
              </div>
          </div>
      </div>
      <div class="right">
          <!-- <div class="g-wrap7">
              <h3 class="u-hd3">
                  <span class="f-f1">喜欢这个歌单的人</span>
              </h3>
              <ul class="m-piclist f-cb">
                  <li v-for="i in nums">
                      <a href="javascript:;" class="f-tdn" title="">
                          <img src="http://p1.music.126.net/vkmmmg9XIivxxwwKU7Q6pg==/18550960184370976.jpg?param=40y40">
                      </a>
                  </li>
              </ul>
              <h3 class="u-hd3">
                  <span class="f-f1">相关推荐</span>
              </h3>
              <ul class="m-rctlist f-cb">
                  <div class="cver u-cover u-cover-3">
                      <a href="" title="">
                          <img src="http://p4.music.126.net/4LZYo_iWF7UX9flTlVE4Gg==/19141397928528652.jpg?param=50y50" alt="">
                      </a>
                  </div>
                  <div class="info">
                      <p class="f-thide">
                          <a href="">2月最新电子指南</a>
                      </p>
                      <p>
                          <span class="by s-fc4">by</span>
                          <a href="" class="nm f-thide s-fc3"></a>
                          <sup class="u-icn u-icn-84"> </sup>
                      </p>
                  </div>
              </ul>
          </div> -->
        <app-recommend></app-recommend>
      </div>
  </div>
</template>
<script>
import Recommend from './Recommend'
import {mapGetters} from 'vuex'
export default {
    components:{
        "app-recommend":Recommend
    },
    data(){
        return{
            nums:8
        }
    },
    watch:{
        '$route':'getDetail',
        IsSong:function(){
            this.addSongs()
        }
    },
    methods:{
        getDetail:function(){
           this.$store.dispatch("getPlaylistDetail",{
              id:this.$route.params.id
            }) 
        },
        plays:function(){
            this.$store.commit('pushSong',this.playListDetail.result.tracks)
        },
        player:function(id){
            this.$store.dispatch("getSongdetail",{
            id:id
            })
        },
        addSongs:function(){
          this.$store.commit('unshiftSong',this.songDetail.songs[0])
      },
    },
  created(){
      this.getDetail()
  },
  computed:{
      ...mapGetters([
          'playListDetail',
            'songDetail'
      ]),
      IsSong(){
        return  this.$store.state.isSong
    }
  },
  //离开当前页面后执行
    destroyed: function () {
        this.$store.commit('destroyed_')
    },
  filters:{
        sTring:function(str){
            return str.split("↵").join("<br/>");
        }
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
em, i {
    font-style: normal;
    text-align: left;
    font-size: inherit;
}
.m-playlist{
    background: url("../assets/wrap4.png") repeat-y center 0;
    width: 980px;
    margin: 0 auto;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    font-size: 12px;
    color: #333;
}
.m-playlist .left{
    float: left;
    width: 100%;
    margin-right: -270px;
}
.m-playlist .left .g-mn4c{
    margin-right: 271px;
}
.left .g-mn4c .g-wrap6{
    padding: 47px 30px 40px 39px;
}
.m-info .cover {
    float: left;
    position: relative;
    display: inline;
    margin: 0 -220px 0 0;
    width: 200px;
    height: 200px;
}
.m-info .cover>img{
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
}
.cover .msk{
    background: url("../assets/coverall.png") no-repeat;
}
.cover .msk{
    position: absolute;
    width: 208px;
    height: 208px;
    background-position:0 -1285px;
    top: -4px;
    left: -4px; 
}
.m-info .cnt{
    float: right;
    width: 100%;
}
.m-info .cnt .cntc{
    margin-left: 230px;
}
.m-info .hd{
    position: relative;
    margin: 0 0 12px;
    line-height: 24px;
}
.m-info .u-icn1{
    float: left;
    width: 54px;
    height: 24px;
    background-position: 0 -243px;
}
.u-icn{
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
}
.u-icn{
    background: url("../assets/icon.png") no-repeat;
}
.m-info .tit{
    margin-left: 64px;
    position: relative;
}
.m-info .hd h2{
    line-height: 24px;
    font-size: 20px;
    font-weight: normal;
}
.f-brk{
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}
.m-info .user{
    margin: 0 0 20px;
    line-height: 35px;
}
.m-info .user .face{
    margin-right: 10px;
}
.m-info .user .face,
.m-info .user .face img{
    float: left;
    width: 35px;
    height: 35px;
}
img .txt{
    border: 0;
}
.m-info .user .name{
    float: left;
}
.user .name>a,
.user .name>a:hover{
    color: #0c73c2;
}
.m-info .user .u-icn2{
    float: left;
    margin:9px 0 0 3px;
    width: 12px;
    height: 13px;
    background-position: -65px -840px;
}
.m-info .user .time{
    margin-left: 15px;
    color: #999;
}
.m-info .btns{
    margin-bottom: 25px;
    margin-right: -10px;
}
.u-btni-addply {
    float: left;
}
.btns .u-btn2-2{
    color: #fff;
    background-position: right -428px;
}
.u-btn2, .u-btn2:hover {
    text-decoration: none;
}
.u-btn2 {
    padding: 0 5px 0 0;
    white-space: nowrap;
}
.u-btn2, .u-btn2 i {
    display: inline-block;
    height: 31px;
    line-height: 31px;
    overflow: hidden;
    vertical-align: top;
    text-align: center;
    cursor: pointer;
}
.u-btn2,.u-btn2 i,.u-btni-addply .ply,
.u-btni, .u-btni i,.u-tag, .u-tag i{
    background: url("../assets/button2.png") no-repeat;
}
.u-btni-addply i{
    padding: 0 7px 0 8px;
}
.u-btn2-2 i{
    color: #fff;
    background-position: 0 -387px;
}
.u-btni-addply .ply {
    float: left;
    width: 20px;
    height: 18px;
    margin: 6px 2px 2px 0;
    background-position: 0 -1622px;
    overflow: hidden;
}
.m-info .btns .u-btni-add {
    margin-right: 5px;
    font-family: simsun,\5b8b\4f53;
}
.u-btni-add {
    width: 31px;
    margin-left: -3px;
    padding-right: 0;
    background-position: 0 -1588px;
}
.u-btni, .u-btni:hover {
    color: #333;
    text-decoration: none;
}
.u-btni {
    padding: 0 5px 0 0;
    white-space: nowrap;
}
.u-btni, .u-btni i {
    float: left;
    height: 31px;
    line-height: 30px;
    min-width: 23px;
    cursor: pointer;
}
.m-info .btns .u-btni-fav,.u-btni-cmmt,.u-btni-share {
    margin-right: 6px;
    font-family: simsun,\5b8b\4f53;
    background-position: right -1020px;
}
.u-btni-fav i {
    background-position: 0 -977px;
}
.u-btni-fav i,.u-btni-cmmt i,.u-btni-share i{
    padding-right: 2px;
    padding-left: 28px;
    color: #000;
    font-size: 12px;
    font-family: simsun,\5b8b\4f53;
}
.u-btni-cmmt i {
    background-position: 0 -1465px;
}
.u-btni-share i{
    background-position: 0 -1225px;
}
.m-info .tags {
    margin: 25px 0 5px;
    line-height: 22px;
}
.m-info .tags b {
    float: left;
}
.m-info b{
    font-weight: normal;
    color: #666;
}
.m-info .tags .u-tag {
    float: left;
    margin: 0px 10px 3px 0;
}
.u-tag {
    padding: 0 10px 0 0;
    text-shadow: 0 1px #fdfdfd;
    background-position: right -27px;
}
.u-tag, .u-tag:hover {
    color: #777;
    text-decoration: none;
}
.u-tag, .u-tag i {
    float: left;
    height: 22px;
    line-height: 22px;
}
.u-tag i {
    position: relative;
    padding: 0 3px 0 13px;
    background-position: 0 0;
}
.m-info .intr {
    margin-top: 4px;
    line-height: 18px;
    color: #666;
}
.m-info .intr b {
    display: inline-block;
}
.n-songtb{
    margin-top: 27px;
}
.n-songtb .u-title{
    height: 33px;
    border-bottom: 2px solid #c20c0c;
}
.u-title h3 {
    font-size: 20px;
    line-height: 28px;
    float: left;
    font-weight: normal;
}
.f-ff2 {
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}
.u-title .sub {
    float: left;
    margin: 9px 0 0 20px;
}
.s-fc3, a.s-fc3:hover {
    color: #666;
}
.u-title .more {
    margin-top: 10px;
    float: right;
}
.s-fc6, a.s-fc6:hover {
    color: #c20c0c;
}
strong, b {
    font-weight: bold;
}
.m-table {
    width: 100%;
    border: 1px solid #d9d9d9;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
.m-table .w1 {
    width: 74px;
}
.m-table thead th {
    height: 38px;
    background-color: #f7f7f7;
    background-position: 0 0;
    background-repeat: repeat-x;
    vertical-align: top;
    text-align: left;
    font-weight: normal;
    color: #666;
}
.m-table th, .m-table th .wp, .m-table td, .m-table .ply, .m-table .mv, .m-table .icn, .m-info .edit {
    background: url("../assets/table.png") no-repeat 0 9999px;
}
.m-table th.first .wp {
    background: none;
}
.m-table th .wp {
    height: 18px;
    line-height: 18px;
    padding: 8px 10px;
    background-position: 0 -56px;
}
.m-table .af0:after {
    content: '\6b4c \66f2 \6807 \9898';
}
.m-table .w2 {
    width: 111px;
}
.m-table .af1:after {
    content: '\65f6 \957f';
}
.m-table .w3 {
    width: 14%;
}
.m-table .af2:after {
    content: '\6b4c \624b';
}
.m-table .w4 {
    width: 20%;
}
.m-table .af3:after {
    content: '\4e13 \8f91';
}
.m-table .even td {
    background-color: #f7f7f7;
}
.m-table td {
    padding: 6px 10px;
    line-height: 18px;
    text-align: left;
}
.m-table .hd {
    height: 18px;
}
.m-table .hd .ply {
    float: right;
}
.m-table .ply {
    width: 17px;
    height: 17px;
    cursor: pointer;
    background-position: 0 -103px;
}
.m-table .hd .num {
    width: 25px;
    margin-left: 5px;
    color: #999;
}
.m-table .tt {
    float: left;
    width: 100%;
}
.m-table .ttc {
    height: 18px;
    margin-right: 20px;
}
.m-table .txt {
    position: relative;
    display: inline-block;
    padding-right: 25px;
    margin-right: -25px;
    max-width: 99%;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.m-table b {
    font-weight: normal;
}
.m-table .text {
    width: 100%;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.m-table .text a {
    white-space: nowrap;
}
.m-table tbody td a:visited{
    color: #333;
    font-size: 12px;
}
.m-table tbody td a{
    color: #333;
    font-size: 12px;
}
.m-playlist .right{
    position: relative;
    float: right;
    width: 270px;
}
.loading{
    width: 100%;
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* .g-wrap7 {
    padding: 20px 40px 40px 30px;
}
.u-hd3 {
    position: relative;
    height: 23px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
}
.f-fl {
    float: left;
}
.m-piclist {
    margin-left: -13px;
    padding-bottom: 25px;
}
.m-piclist li {
    display: inline;
    padding: 0 0 13px 13px;
}
.m-piclist li, .m-piclist li img {
    float: left;
    width: 40px;
    height: 40px;
}
.m-rctlist {
    margin-bottom: 25px;
}
.m-rctlist li {
    float: left;
    width: 200px;
    height: 50px;
    margin-bottom: 15px;
    line-height: 24px;
}
.m-rctlist .cver {
    margin-right: -60px;
}
.m-rctlist .cver, .n-rctlist .cver img {
    float: left;
    width: 50px;
    height: 50px;
}
.u-cover {
    position: relative;
    display: block;
}
.u-cover img {
    display: block;
    width: 100%;
    height: 100%;
}
.m-rctlist .info {
    margin-left: 60px;
    line-height: 24px;
}
.m-rctlist .info p {
    width: 140px;
}
.f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.s-fc0, a.s-fc0:hover {
    color: #000;
}
.f-fs1 {
    font-size: 14px;
}
.m-rctlist .by {
    float: left;
}
.s-fc4, a.s-fc4:hover {
    color: #999;
}
.m-rctlist .nm {
    float: left;
    max-width: 106px;
    margin: 0 2px 0 4px;
}
.s-fc3, a.s-fc3:hover {
    color: #666;
}
.m-rctlist sup {
    margin-top: -1px;
}
.u-icn-84 {
    width: 12px;
    height: 13px;
    background-position: -65px -840px;
} */
</style>
