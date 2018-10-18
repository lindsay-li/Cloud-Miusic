<template>
  <div class="g-bd">
      <div class="g-wrap">
          <div class="snote s-fc4" v-if="Search.code==200">
              搜索“{{kword}}”，找到<em class="s-fc6">{{Search.result.songCount || Search.result.artistCount}}</em>个{{tit}}
          </div>
          <ul class="m-tabs f-cb">
              <li :class="{'fst':title.type==1}" v-for="title in titles">
                  <a :class="{'z-slt':title.type==types}" @click="search(title.type,title.names)">
                      <em>{{title.names}}</em>
                  </a>
              </li>
          </ul>
          <div class="ztag" v-if="Search.code==200">
              <div class="n-srchrst">
                  <div class="srchsongst">
                      <div class="item f-cb h-flag" v-for="(song,index) in Search.result.songs">
                          <div class="td">
                              <div class="hd">
                                  <a :href="song.id" class="ply" title="播放" @click.prevent="plays(song.id)"></a>
                              </div>
                          </div>
                          <div class="td w0">
                              <div class="sn">
                                  <div class="text">
                                      <router-link :to="'/songDetail/'+song.id">
                                          <b :title="song.name">{{song.name}}</b>
                                      </router-link>
                                      <span class="s-fc8" :title="song.alias[0]">{{song.alias[0]}}</span>
                                      <a href="song.mvid" title="MV" class="mv" v-show="song.mvid!=0"></a>
                                  </div>
                              </div>
                          </div>
                          <div class="td">
                              <div class="opt hshow"></div>
                          </div>
                          <div class="td w1">
                              <div class="text">
                                  <a href="song.artists[0].id">
                                      <span class="s-fc7">&nbsp;{{song.artists[0].name}}</span>
                                  </a>
                              </div>
                          </div>
                          <div class="td w2">
                              <div class="text">
                                  <a href="" class="s-fc3" :title="song.album.name">{{song.album.name}}</a>
                              </div>
                          </div>
                          <div class="td">{{song.duration |dtTime}}</div>
                      </div>
                  </div>
              </div>
              <div class="n-srchrst ztage">
                  <div class="m-sgerlist m-sgerlist-1">
                      <ul class="m-cvrlst m-cvrlst-5 f-cb">
                          <li v-for="artist in Search.result.artists">
                              <div class="u-cover u-cover-5">
                                  <a href="">
                                      <img :src="artist.img1v1Url" >
                                      <span :title="artist.name" class="msk"></span>
                                  </a>
                              </div>
                              <p>
                                  <a href="" class="nm f-thide s-fc0" :title="artist.name">
                                      <span class="s-fc7">{{artist.name}}</span>
                                  </a>
                                  <a :href="'/user?id='+artist.accountId">
                                      <i class="u-icn u-icn-5"></i>
                                  </a>
                              </p>
                          </li>
                      </ul>
                  </div>
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
          titles:[
          {"names":"单曲","type":1},
          {"names":"歌手","type":100},
          {"names":"专辑","type":10},
          {"names":"视频","type":1014},
          {"names":"歌词","type":1006},
          {"names":"歌单","type":1000},
          {"names":"主播电台","type":1009},
          {"names":"用户","type":1002},
          ],
          kword:"薛之谦",
          types:1,
          tit:"单曲"
      }
  },
  methods:{
    search:function(type,name){
        this.$store.dispatch("getSearch",{
            kword:this.$route.params.kword,
            type:type
        })
        this.types=type
        this.tit=name
        this.kword=this.$route.params.kword
    },
    plays:function(n){
        this.$store.dispatch("getSongdetail",{
          id:n
        })
    },
    addSongs:function(){
        this.$store.commit('unshiftSong',this.songDetail.songs[0])
    },
    searchAgin:function(){
        this.search(1,this.tit)
    }
  },
  computed:{
    ...mapGetters([
        'Search',
        'songDetail'
    ]),
    IsSong(){
        return  this.$store.state.isSong
    }
  },
  mounted(){
      this.search(1,this.tit)
  },
  watch:{
      '$route':'searchAgin',
        IsSong:function(){
            this.addSongs()
        }
  }
}
</script>
<style scoped>
.g-bd{
    width: 980px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    font-size: 12px;
    color: #333;
}
.g-wrap{
    padding: 40px;
}
.g-wrap .snote{
    margin:28px 0 17px;
}
.s-fc4,a.s-fcf:hover{
    color: #999;
}
em, i {
    font-style: normal;
    text-align: left;
    font-size: inherit;
}
.s-fc6, a.s-fc6:hover {
    color: #c20c0c;
}
.g-bd .g-wrap .m-tabs {
    height: 39px;
    border: 1px solid #ccc;
    border-width: 0 1px;
    background-position: 0 0;
    background-repeat: repeat-x;
}
.m-tabs, .m-tabs a, .m-tabs em, .m-tabs1 a, .m-tabs1 em {
    background: url("../assets/tab.png") no-repeat 0 9999px;
}
.f-cb:after {
    clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
}
.m-tabs li {
    position: relative;
    left: -1px;
}
.m-tabs li, .m-tabs a, .m-tabs em {
    float: left;
    height: 39px;
    font-size: 14px;
}
.m-tabs a.z-slt {
    background-position: left -90px;
}
.m-tabs a {
    padding-left: 2px;
}
.m-tabs a.z-slt em {
    background-position: right -90px;
}
.m-tabs em {
    width: 108px;
}
.m-tabs em {
    height: 37px;
    padding: 2px 2px 0 0;
    line-height: 37px;
    cursor: pointer;
    text-align: center;
}
.n-srchrst {
    margin-top: 20px;
}
.n-srchrst .srchsongst .item {
    padding: 10px 10px 8px 18px;
    border: 1px solid #fff;
}
.n-srchrst .srchsongst .even {
    background: #ccc;
    border-color: #ccc;
}
.n-srchrst .srchsongst .td {
    float: left;
    margin-right: 5px;
}
.n-srchrst .srchsongst .w0 {
    width: 370px;
}
.n-srchrst .srchsongst .w1 {
    width: 15%;
    margin-right: 12px;
}
.n-srchrst .srchsongst .w2 {
    width: 18%;
    margin-right: 12px;
}
.n-srchrst .srchsongst .hd {
    height: 17px;
    width: 17px;
}
.n-srchrst .srchsongst .hd .ply, .n-srchrst .srchsongst .mv, .n-srchrst .srchsongst .icn, .m-plylist-rdi .icn, .n-srchrst .srchsongst .mv-dis {
    background: url("../assets/table.png") no-repeat 0 9999px;
}
.n-srchrst .srchsongst .hd .ply {
    display: inline-block;
    width: 17px;
    height: 17px;
    margin-right: 15px;
    cursor: pointer;
    background-position: 0 -103px;
}
.n-srchrst .srchsongst .text {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.n-srchrst .w0 .text {
    position: relative;
    display: inline-block;
    padding-right: 25px;
    width: auto;
    max-width: 100%;
    height: 20px;
}
.n-srchrst .srchsongst b {
    font-weight: normal;
    color: #333;
}
.n-srchrst .srchsongst .mv, .n-srchrst .srchsongst .mv-dis {
    position: absolute;
    right: 0;
    display: inline-block;
    vertical-align: middle;
    width: 23px;
    height: 17px;
}
.n-srchrst .srchsongst .mv {
    background-position: 0 -151px;
}
.s-fc7, a.s-fc7:hover {
    color: #0c73c2;
}
.s-fc3, a.s-fc3:hover {
    color: #666;
}
.n-srchrst .srchsongst .hshow {
    visibility: hidden;
    width: 96px;
    height: 16px;
}
.n-srchrst .srchsongst .h-flag:hover{
    background-color: #eee;
    border: 1px solid #e2e2e2;
}
.s-fc8, a.s-fc8:hover {
    color: #aeaeae;
}
.n-srchrst {
    margin-top: 20px;
}
.m-sgerlist-1 .m-cvrlst {
    margin: 0 0 0 -24px;
}
.m-cvrlst li {
    float: left;
    display: inline-block;
    width: 140px;
    height: 188px;
    overflow: hidden;
    padding: 0 0 30px 50px;
    line-height: 1.4;
}
.m-cvrlst-5 li {
    width: 130px;
    height: 154px;
}
.m-sgerlist-1 .m-cvrlst li {
    padding-left: 24px;
}
.u-cover {
    position: relative;
    display: block;
}
.u-cover-5 {
    width: 130px;
    height: 130px;
}
.m-cvrlst li p {
    width: 100%;
}
.m-sgerlist .m-cvrlst li p {
    margin-top: 8px;
}
.u-cover img {
    display: block;
    width: 100%;
    height: 100%;
}
img, .txt {
    border: 0;
}
.u-cover .bottom, .u-cover .msk, .n-musicsd .lst .avatar .msk {
    background: url("../assets/coverall.png") no-repeat 0 9999px;
}
.u-cover .msk {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.u-cover-5 .msk {
    background-position: 0 -680px;
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
.m-cvrlst li .nm {
    display: inline-block;
    max-width: 85%;
    vertical-align: middle;
}
.s-fc7, a.s-fc7:hover {
    color: #0c73c2;
}
.u-icn, .u-title-1 .out .icon {
    background: url("../assets/icon.png") no-repeat 0 9999px;
}
.u-icn, .u-icn2, .u-icn3 {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
}
.u-icn-5 {
    width: 17px;
    height: 18px;
    background-position: 0 -740px;
}
.m-cvrlst-5 li .u-icn-5 {
    position: relative;
    float: right;
}
</style>
