<template>
    <div class="g-bd4 f-cb">
        <div class="g-mn4">
            <div class="g-mn4c">
                <div class="g-wrap6">
                    <div class="m-lycifo" v-if="songDetail.code==200">
                        <div class="f-cb">
                            <div class="cvrwrap f-cb f-pr">
                                <div class="u-cover u-cover-6 f-f1">
                                    <img :src="songDetail.songs[0].al.picUrl" class="j-img">
                                    <span class="msk f-alpha"></span>
                                </div>
                                <div class="out s-fc3"></div>
                            </div>
                            <div class="cnt">
                                <div class="hd">
                                    <i class="lab u-icn u-icn-37"></i>
                                    <div class="tit">
                                        <em class="f-ff2">{{songDetail.songs[0].name}}</em>
                                    </div>
                                </div>
                                <p class="des s-fc4">
                                    歌手：<span :title="songDetail.songs[0].ar[0].name">
                                        <a href="" class="s-fc7">{{songDetail.songs[0].ar[0].name}}</a>
                                    </span>
                                </p>
                                <p class="des s-fc4">
                                    所属专辑：<a href="" class="s-fc7">{{songDetail.songs[0].al.name}}</a>
                                </p>
                                <div class="m-info">
                                    <div class="btns f-cb">
                                        <a href="" class="u-btn2 u-btn2-2 u-btni-addply f-fl" title="播放" @click.prevent="addSongs">
                                            <i>
                                                <em class="ply"></em>
                                                播放
                                            </i>
                                        </a>
                                        <a href="javascript:;" class="u-btni u-btni-add" title="添加到播放列表"></a>
                                        <a href="" class="u-btni u-btni-fav">
                                            <i>收藏</i>
                                        </a>
                                        <a href="javascript:;" class="u-btni u-btni-share">
                                            <i>分享</i>
                                        </a>
                                        <a href="javascript:;" class="u-btni u-btni-dl">
                                            <i>下载</i>
                                        </a>
                                        <a href="javascript:;" class="u-btni u-btni-cmmt">
                                            <i>(<span>22994</span>)</i>
                                        </a>
                                    </div>
                                </div>
                                <div class="bd bd-open f-brk f-ib">
                                    <p v-for="ly in iyricts.slice(0,13)">{{ly}}</p>
                                    <div class="f-hide" v-show="offon">
                                        <p v-for="ly in iyricts.slice(13,)">{{ly}}</p>
                                    </div>
                                    <div class="crl">
                                        <a href="" class="s-fc7" @click.prevent="showLric">
                                            {{hide}}
                                            <i class="u-icn" :class="[offon ?'u-icn-70':'u-icn-69']"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="loading" v-else>
                        <img src="../assets/loading.gif" />
                    </div>
                    <app-con :comment="comments"></app-con>
                </div>
            </div>
        </div>
        <div class="g-sd4">
            <app-recommend></app-recommend>
        </div>
    </div>
</template>
<script>
import comment from './comment'
import REcommend from './Recommend'
import {mapGetters} from 'vuex'
export default {
  components:{
      'app-con':comment,
      'app-recommend':REcommend
  },
  data(){
      return{
          iyricts:[],
          offon:false,
          hide:"展开",
          comments:{}
      }
  },
  created(){
      this.getSongDetail()
      this.getLyric()
      this.getComment()
  },
  methods:{
      getSongDetail:function(){
        this.$store.dispatch("getSongdetail",{
          id:this.$route.params.id
        })
      },
       addSongs:function(){
          this.$store.commit('unshiftSong',this.songDetail.songs[0])
      },
      getLyric:function(){
        this.$http.get('/lyric',{
        xhrFields: {
        withCredentials: true
        },
          params:{
            id:this.$route.params.id
          }
        }).then((response)=>{
            var lyric;
            if(response.data.nolyric==true){
                lyric=null
            }else if(response.data.lrc.lyric){
                lyric=response.data.lrc.lyric
            }
            this.loadLyric(lyric)
        })
      },
      loadLyric:function(lyric){
        if(lyric !==null){
            var pattern = /\[([0-9]{2})\:([0-9]{2})(\.)([0-9]{2,3})\]/,
                lyrs = lyric.split("\n"),
                html=""
            for(var i = 0; i < lyrs.length; i++){
                var match = pattern.exec(lyrs[i])
                if(match){
                    if(match[0].length==11){
                        this.iyricts.push(lyrs[i].slice(match.index + 11) )
                    }else{
                        this.iyricts.push(lyrs[i].slice(match.index + 10) )
                    }
                }
            }
        }else{
            this.iyricts.push("纯音乐，无歌词")
        }
      },
      showLric:function(){
          this.offon=!this.offon
          if(this.offon==true){
              this.hide="收起"
          }else{
              this.hide="展开"
          }
      },
      getComment:function(){
          this.$http.get("/comment/music",{
            xhrFields: {
            withCredentials: true
            },
            params:{
                id:this.$route.params.id
            }
          })
          .then((res)=>{
              this.comments=res.data
          })
      }
  },
  //离开当前页面后执行
    destroyed: function () {
        this.$store.commit('songDetail_')
    },
    computed:{
        ...mapGetters([
            'songDetail'
        ])
    }
}
</script>
<style scoped>
.f-cb:after {
    clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
}
.g-bd, .g-bd1, .g-bd2, .g-bd3, .g-bd4, .g-bd5, .g-bd6, .g-bd7 {
    width: 980px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
}
.g-bd4 {
    background: url('../assets/wrap4.png') repeat-y center 0;
}
.g-mn4 {
    float: left;
    width: 100%;
    margin-right: -270px;
}
.g-sd4 {
    position: relative;
    float: right;
    width: 270px;
}
.g-mn4c {
    margin-right: 271px;
}
.g-wrap6 {
    padding: 47px 30px 40px 39px;
}
.m-lycifo {
    margin-top: -10px;
}
.f-pr {
    position: relative;
}
.m-lycifo .cvrwrap {
    float: left;
    width: 206px;
    margin-right: -226px;
}
.m-lycifo .cnt {
    float: right;
    width: 414px;
}
.f-fl {
    float: left;
}
.u-cover {
    position: relative;
    display: block;
}
.u-cover-6 {
    width: 198px;
    height: 198px;
}
img, .txt {
    border: 0;
}
.u-cover-6 img {
    width: 130px;
    height: 130px;
    margin: 34px;
}
.u-cover .bottom, .u-cover .msk, .n-musicsd .lst .avatar .msk {
    background: url('../assets/coverall.png') no-repeat;
}
.u-cover-6 .msk {
    position: absolute;
    width: 206px;
    height: 205px;
    top: -4px;
    left: -4px;
    background-position: -140px -580px;
}
em, i {
    font-style: normal;
    text-align: left;
    font-size: inherit;
}
.u-icn, .u-title-1 .out .icon {
    background: url('../assets/icon.png') no-repeat 0 9999px;
}
.u-icn, .u-icn2, .u-icn3 {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
}
.u-icn-37 {
    width: 54px;
    height: 24px;
    background-position: 0 -463px;
}
.m-lycifo .hd .lab {
    float: left;
}
.m-lycifo .tit {
    margin-left: 64px;
    position: relative;
    top: -6px;
    font-size: 24px;
}
.f-ff2 {
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}
.m-lycifo .tit * {
    vertical-align: middle;
}
.m-lycifo .tit em {
    margin-right: 7px;
}
.s-fc4, a.s-fc4:hover {
    color: #999;
}
.m-lycifo .des {
    margin: 10px 0;
}
.m-lycifo .des span {
    color: #333;
}
.s-fc7, a.s-fc7:hover {
    color: #0c73c2;
}
.m-info .btns {
    margin-bottom: 25px;
    margin-right: -10px;
}
[hidefocus] {
    outline: none;
}
.u-btn2,
.u-btn2 i,
.u-btn2 .icn,
.u-btni,
.u-btni i,
.u-tag,
.u-tag i,
.u-btni-addply .ply {
    background: url("../assets/button2.png") no-repeat 0 9999px;
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
.u-btn2 {
    padding: 0 5px 0 0;
    white-space: nowrap;
}
.u-btn2-2 {
    color: #fff;
    background-position: right -428px;
}
.u-btni-addply {
    float: left;
}
.u-btn2 i {
    padding: 0 15px 0 20px;
    pointer-events: none;
}
.u-btn2-2 i {
    color: #fff;
    background-position: 0 -387px;
}
.u-btni-addply i {
    padding: 0 7px 0 8px;
}
.u-btni-addply .ply {
    float: left;
    width: 20px;
    height: 18px;
    margin: 6px 2px 2px 0;
    background-position: 0 -1622px;
    overflow: hidden;
}
.u-btni, .u-btni i {
    float: left;
    height: 31px;
    line-height: 30px;
    min-width: 23px;
    cursor: pointer;
}
.u-btni {
    padding: 0 5px 0 0;
    white-space: nowrap;
}
.u-btni, .u-btni:hover {
    color: #333;
    text-decoration: none;
}
.u-btni-add {
    width: 31px;
    margin-left: -3px;
    padding-right: 0;
    background-position: 0 -1588px;
}
.m-info .btns2 .u-btni, .m-info .btns .u-btni {
    margin-right: 6px;
    font-family: simsun,\5b8b\4f53;
}
.m-info .btns .u-btni-add {
    margin-right: 5px;
}
.u-btni-share, .u-btni-fav, .u-btni-cmmt, .u-btni-dl {
    background-position: right -1020px;
}
.m-info .btns2 .u-btni, .m-info .btns .u-btni {
    margin-right: 6px;
    font-family: simsun,\5b8b\4f53;
}
.u-btni i {
    padding: 0 7px 0 36px;
}
.u-btni-share i, .u-btni-fav i, .u-btni-cmmt i, .u-btni-dl i, .u-btni-unfav i {
    padding-right: 2px;
    padding-left: 28px;
}
.u-btni-fav i {
    background-position: 0 -977px;
}
.u-btni-share i {
    background-position: 0 -1225px;
}
.u-btni-dl i {
    background-position: 0 -2761px;
}
.u-btni-cmmt i {
    background-position: 0 -1465px;
}
.f-ib {
    display: inline-block;
}
.f-brk {
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal;
}
.m-lycifo .bd {
    height: 299px;
    margin-top: 13px;
    line-height: 23px;
}
.m-lycifo .bd-open {
    height: auto;
}
.m-lycifo .crl {
    margin-top: 5px;
}
.u-icn-69, .u-icn-70 {
    width: 11px;
    height: 8px;
    background-position: -65px -520px;
}
.u-icn-70 {
    background-position: -45px -520px;
}
.loading{
    width: 100%;
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
