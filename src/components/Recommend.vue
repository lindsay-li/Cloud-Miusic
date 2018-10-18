<template>
  <div class="g-wrap7">
              <h3 class="u-hd3">
                  <span class="f-f1">喜欢这个歌单的人</span>
              </h3>
              <ul class="m-piclist f-cb">
                  <li v-for="i in singers">
                      <a href="javascript:;" class="f-tdn" title="">
                          <img :src="i.img">
                      </a>
                  </li>
              </ul>
              <h3 class="u-hd3">
                  <span class="f-f1">相关推荐</span>
              </h3>
              <ul class="m-rctlist f-cb">
                  <li v-for="dj in hotDj">
                  <div class="cver u-cover u-cover-3">
                      <a href="javascript:;">
                          <img :src="dj.img">
                      </a>
                  </div>
                  <div class="info">
                      <p class="f-thide">
                          <a href="javascript:;" class="s-fc0">{{dj.name}}</a>
                      </p>
                      <p>
                          <span class="by s-fc4">by</span>
                          <a href="javascript:;" class="nm f-thide s-fc3">{{dj.intro}}</a>
                          <sup class="u-icn u-icn-84"> </sup>
                      </p>
                  </div>
                  </li>
              </ul>
          </div>
</template>
<script>
export default {
  data(){
      return{
          hotDj:[
              {"name":"陈立","intro":"心里学家、美食家陈立教授","img":require("../assets/chen1407374893913311.jpg")},
              {"name":"DJ艳秋","intro":"著名音乐节目主持人","img":require("../assets/qiu7942872001461517.jpg")},
              {"name":"国家大剧院古典音乐频道","intro":"国家大剧院古典音乐官方","img":require("../assets/guo3427177769086282.jpg")},
              {"name":"谢谢收听","intro":"南京电台主持人王馨","img":require("../assets/xie3130309604335651.jpg")},
              {"name":"DJ晓苏","intro":"独立DJ，CRI环球旅游广播特邀DJ","img":require("../assets/DJ3440371884651965.jpg")},
          ],
           singers:[
              {"img":require("../assets/amei5931865232210340.jpg")},
              {"img":require("../assets/duli3302932937408956.jpg")},
              {"img":require("../assets/wan19027048718765608.jpg")},
              {"img":require("../assets/zhao7943971513291094.jpg")},
              {"img":require("../assets/wang109951162895674268.jpg")}
          ],
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
.g-wrap7 {
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
}
</style>
