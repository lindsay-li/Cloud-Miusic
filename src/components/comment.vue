<template>
  <div class="n-cmt" v-if=" comment.code==200">
        <div class="u-title u-title-1">
            <h3>
                <span class="f-ff2">评论</span>
            </h3>
            <span class="sub s-fc3">
                共<span class="j-flag">{{comment.total}}</span>条评论
            </span>
        </div>
        <div class="m-cmmt">
            <div class="iptarea">
                <div class="head">
                    <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt="">
                </div>
                <div class="j-flag">
                    <div>
                        <div class="m-cmmtipt f-cb f-pr">
                            <div class="u-txtwrap holder-parent f-pr">
                                <textarea class="u-txt area j-flag" placeholder="评论"></textarea>
                            </div>
                            <div class="btns f-cb f-pr">
                                <i class="icn u-icn u-icn-36 j-flag"></i>
                                <i class="icn u-icn u-icn-41 j-flag"></i>
                                <a href="" class="btn u-btn u-btn-1 j-flag">评论</a>
                                <span class="zs s-fc4 j-flag">140</span>
                            </div>
                            <div class="corr u-arr">
                                <em class="arrline">◆</em>
                                <span class="arrclr">◆</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cmmts j-flag">
                <h3 class="u-hd4">精彩评论</h3>
                <div class="itm" v-for="hotcom in comment.hotComments">
                    <div class="head">
                        <a href="javascript:;">
                            <img :src="hotcom.user.avatarUrl">
                        </a>
                    </div>
                    <div class="cntwrap">
                        <div>
                            <div class="cnt f-brk">
                                <a href="javascript:;" class="s-fc7">{{hotcom.user.nickname}}</a>
                                ：{{hotcom.content}}
                            </div>
                        </div>
                        <div class="rp">
                            <div class="time s-fc4">{{hotcom.time | updateTimefil}}</div>
                            <a href="javascript:;">
                                <i class="zan u-icn2 u-icn2-12"></i>
                                ({{hotcom.likedCount}})
                            </a>
                            <span class="sep"></span>
                            <a href="javascript:;" class="s-fc3">回复</a>
                        </div>
                    </div>
                </div>
                <br>
                <br>
                <h3 class="u-hd4">最新评论({{comment.total}})</h3>
                <div class="itm" v-for="comn in comment.comments">
                    <div class="head">
                        <a href="javascript:;">
                            <img :src="comn.user.avatarUrl">
                        </a>
                    </div>
                    <div class="cntwrap">
                        <div>
                            <div class="cnt f-brk">
                                <a href="javascript:;" class="s-fc7">{{comn.user.nickname}}</a>
                                ：{{comn.content}}
                            </div>
                        </div>
                        <div class="que f-brk f-pr s-fc3" v-show="comn.beReplied.length>0" v-for="abc in comn.beReplied">
                            <span class="darr">
                                <i class="bd">◆</i>
                                <i class="bg">◆</i>
                            </span>
                            <a href="javascript:;" class="s-fc7" >{{abc.user.nickname}}</a>
                            ：{{abc.content}}
                        </div>
                        <div class="rp">
                            <div class="time s-fc4">{{comn.time | updateTimefil}}</div>
                            <a href="javascript:;">
                                <i class="zan u-icn2 u-icn2-12"></i>
                                ({{comn.lickedCount}})
                            </a>
                            <span class="sep"></span>
                            <a href="javascript:;" class="s-fc3">回复</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="j-flag"></div>
        </div>
    </div>
</template>
<script>
export default {
  props:["comment"],
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

.n-cmt {
    margin-top: 40px;
    color: #333;
    font-size: 12px;
}
.u-title {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
}
.u-title-1 {
    height: 33px;
}
.u-title h3 {
    float: left;
    font-size: 24px;
    font-weight: normal;
}
.u-title-1 h3 {
    font-size: 20px;
    line-height: 28px;
}
.f-ff2 {
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}
.s-fc3, a.s-fc3:hover {
    color: #666;
}
.u-title .sub {
    float: left;
    margin: 13px 0 0 10px;
}
.u-title-1 .sub {
    margin: 9px 0 0 20px;
}
.m-cmmt {
    margin-top: 20px;
}
.m-cmmt .iptarea {
    margin-bottom: 20px;
}
.m-cmmt .head, .m-cmmt .head img {
    float: left;
    width: 50px;
    height: 50px;
    margin-right: -100px;
}
img, .txt {
    border: 0;
}
.f-pr {
    position: relative;
}
.m-cmmt .iptarea .m-cmmtipt {
    margin-left: 62px;
}
.u-txtwrap {
    padding-right: 14px;
}
div.holder-parent {
    position: relative;
}
.m-cmmtipt .btns {
    clear: both;
    padding-top: 10px;
}
textarea {
    resize: none;
    overflow: auto;
}
.u-txt {
    height: 19px;
    margin: 0;
    padding: 5px 6px 6px;
    border: 1px solid #cdcdcd;
    border-radius: 2px;
    line-height: 19px;
}
textarea.u-txt, div.u-txt {
    width: 100%;
    margin-right: -20px;
}
.m-cmmtipt .area {
    height: 50px;
    display: block;
}
em, i {
    font-style: normal;
    text-align: left;
    font-size: inherit;
}
.u-icn, .u-title-1 .out .icon {
    background: url("../assets/icon.png") no-repeat 0 9999px;
}
.u-icn, .u-icn2, .u-icn3 {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
}
.u-icn-36 {
    width: 18px;
    height: 18px;
    background-position: -40px -490px;
}
.m-cmmtipt .btns .icn {
    float: left;
    margin: 0px 10px 0 0;
    cursor: pointer;
}
.u-icn-41 {
    width: 18px;
    height: 18px;
    background-position: -60px -490px;
}
.u-btn{
    background: url("../assets/button.png") no-repeat 0 9999px;
}
.u-btn {
    display: inline-block;
}
.u-btn-1 {
    width: 46px;
    height: 25px;
    background-position: -84px -64px;
    color: #fff;
    text-align: center;
    line-height: 25px;
}
.m-cmmtipt .btns .btn {
    float: right;
}
.s-fc4, a.s-fc4:hover {
    color: #999;
}
.m-cmmtipt .btns .zs {
    float: right;
    margin-right: 10px;
    line-height: 25px;
}
.u-arr {
    width: 13px;
    height: 14px;
    overflow: hidden;
}
.m-cmmtipt .corr {
    position: absolute;
    top: 11px;
    left: -7px;
}
.u-arr .arrline, .u-arr .arrclr, .u-arr .arriner {
    display: block;
    font-family: "SimSun";
    font-size: 15px;
    font-style: normal;
    font-weight: normal;
    height: 10px;
    line-height: normal;
}
.u-arr .arrline {
    color: #cdcdcd;
}
.u-arr .arrclr {
    margin: -10px 0 0 1px;
    color: #fff;
}
.u-hd4 {
    position: relative;
    top: 1px;
    height: 20px;
    border-bottom: 1px solid #cfcfcf;
}
.m-cmmt .cmmts .itm {
    padding: 15px 0;
    border-top: 1px dotted #ccc;
}
.m-cmmt .head, .m-cmmt .head img {
    float: left;
    width: 50px;
    height: 50px;
    margin-right: -100px;
}
a{
    color: #333;
}
.m-cmmt .head, .m-cmmt .head img {
    float: left;
    width: 50px;
    height: 50px;
    margin-right: -100px;
}
.m-cmmt .cmmts img {
    vertical-align: middle;
}
.m-cmmt .cmmts .cntwrap {
    margin-left: 60px;
}
.f-brk {
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal;
}
.m-cmmt .cmmts .cnt {
    width: 100%;
    overflow: hidden;
    line-height: 20px;
}
.m-cmmt .cmmts .cntwrap .f-brk, .m-cmmt .cmmts .cnt.f-brk {
    word-break: break-word;
}
.s-fc7, a.s-fc7:hover {
    color: #0c73c2;
}
.m-cmmt .cmmts div.rp {
    margin-top: 15px;
    text-align: right;
}
.s-fc4, a.s-fc4:hover {
    color: #999;
}
.m-cmmt .cmmts .time {
    float: left;
    margin: 0 !important;
}
.u-icn2 {
    background: url("../assets/icon2.png") no-repeat 0 9999px;
}
.u-icn2-12, .u-icn2-13 {
    width: 15px;
    height: 14px;
    background-position: -150px 0;
}
.m-cmmt .cmmts .zan {
    margin-top: -4px;
}
.m-cmmt .cmmts .sep {
    margin: 0 8px;
    color: #ccc;
}
.m-cmmt .cmmts .que {
    padding: 8px 19px;
    margin-top: 10px;
    line-height: 20px;
    background: #f4f4f4;
    border: 1px solid #dedede;
}
.m-cmmt .cmmts .que .darr {
    position: absolute;
    top: -7px;
    left: 20px;
    font-size: 12px;
    line-height: 14px;
}
.m-cmmt .cmmts .que .darr i {
    position: absolute;
    top: 0;
    left: 0;
}
.m-cmmt .cmmts .que .darr .bd {
    color: #dedede;
}
.m-cmmt .cmmts .que .darr .bg {
    top: 1px;
    color: #f4f4f4;
}

</style>
