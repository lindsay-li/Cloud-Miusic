webpackJsonp([3],{"1ala":function(t,s){},"27UG":function(t,s){},"Dg+t":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a("4YfN"),e=a.n(i),n=a("cV3P"),c=a("9rMa"),r={components:{"app-recommend":n.a},data:function(){return{nums:8}},watch:{$route:"getDetail",IsSong:function(){this.addSongs()}},methods:{getDetail:function(){this.$store.dispatch("getPlaylistDetail",{id:this.$route.params.id})},plays:function(){this.$store.commit("pushSong",this.playListDetail.result.tracks)},player:function(t){this.$store.dispatch("getSongdetail",{id:t})},addSongs:function(){this.$store.commit("unshiftSong",this.songDetail.songs[0])}},created:function(){this.getDetail()},computed:e()({},Object(c.b)(["playListDetail","songDetail"]),{IsSong:function(){return this.$store.state.isSong}}),destroyed:function(){this.$store.commit("destroyed_")},filters:{sTring:function(t){return t.split("↵").join("<br/>")}}},l={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"m-playlist f-cb"},[i("div",{staticClass:"left"},[i("div",{staticClass:"g-mn4c"},[200==t.playListDetail.code?i("div",{staticClass:"g-wrap6"},[i("div",{staticClass:"m-info f-cb"},[i("div",{staticClass:"cover"},[i("img",{attrs:{src:t.playListDetail.result.coverImgUrl}}),t._v(" "),i("span",{staticClass:"msk"})]),t._v(" "),i("div",{staticClass:"cnt"},[i("div",{staticClass:"cntc"},[i("div",{staticClass:"hd f-cb"},[i("i",{staticClass:"u-icn u-icn1"}),t._v(" "),i("div",{staticClass:"tit"},[i("h2",{staticClass:"f-brk"},[t._v(t._s(t.playListDetail.result.name))])])]),t._v(" "),i("div",{staticClass:"user f-cb"},[i("a",{staticClass:"face",attrs:{href:"javascript:;"}},[i("img",{attrs:{src:t.playListDetail.result.creator.avatarUrl}})]),t._v(" "),i("span",{staticClass:"name"},[i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.playListDetail.result.creator.nickname))])]),t._v(" "),i("sup",{staticClass:"u-icn u-icn2"}),t._v(" "),i("span",{staticClass:"time"},[t._v(t._s(t._f("updateTimefil")(t.playListDetail.result.createTime))+" 创建")])]),t._v(" "),i("div",{staticClass:"btns f-cb"},[i("a",{staticClass:"u-btn2 u-btn2-2 u-btni-addply",attrs:{href:"",title:"播放"},on:{click:function(s){return s.preventDefault(),t.plays(s)}}},[t._m(0)]),t._v(" "),i("a",{staticClass:"u-btni u-btni-add",attrs:{href:"javascript:;",title:"添加到播放列表"}}),t._v(" "),i("a",{staticClass:"u-btni u-btni-fav",attrs:{href:"javascript:;"}},[i("i",[t._v("("+t._s(t.playListDetail.result.subscribedCount)+")")])]),t._v(" "),i("a",{staticClass:"u-btni u-btni-share",attrs:{href:"javascript:;"}},[i("i",[t._v("("+t._s(t.playListDetail.result.shareCount)+")")])]),t._v(" "),i("a",{staticClass:"u-btni u-btni-cmmt",attrs:{href:"javascript:;"}},[i("i",[t._v("("+t._s(t.playListDetail.result.commentCount)+")")])])]),t._v(" "),i("div",{staticClass:"tags f-cb"},[i("b",[t._v("标签：")]),t._v(" "),t._l(t.playListDetail.result.tags,function(s){return i("a",{staticClass:"u-tag",attrs:{href:""}},[i("i",[t._v(t._s(s))])])})],2),t._v(" "),i("p",{staticClass:"intr f-brk"},[i("b",[t._v("介绍：")]),t._v("\n                                "+t._s(t._f("sTring")(t.playListDetail.result.description))+"\n                            ")])])])]),t._v(" "),i("div",{staticClass:"n-songtb"},[i("div",{staticClass:"u-title f-cb"},[t._m(1),t._v(" "),i("span",{staticClass:"sub s-fc3"},[i("span",[t._v(t._s(t.playListDetail.result.trackCount))]),t._v("首歌\n                        ")]),t._v(" "),i("div",{staticClass:"more s-fc3"},[t._v("\n                            播放："),i("strong",{staticClass:"s-fc6"},[t._v(t._s(t.playListDetail.result.playCount))]),t._v("次\n                        ")])]),t._v(" "),i("div",[i("table",{staticClass:"m-table"},[t._m(2),t._v(" "),i("tbody",t._l(t.playListDetail.result.tracks,function(s,a){return i("tr",{staticClass:"even"},[i("td",[i("div",{staticClass:"hd"},[i("span",{staticClass:"ply",attrs:{title:"播放"},on:{click:function(a){t.player(s.id)}}},[t._v(" ")]),t._v(" "),i("span",{staticClass:"num"},[t._v(t._s(a+1))])])]),t._v(" "),i("td",[i("div",{staticClass:"f-cb"},[i("div",{staticClass:"tt"},[i("div",{staticClass:"ttc"},[i("span",{staticClass:"txt"},[i("router-link",{attrs:{to:"/songDetail/"+s.id,title:s.name}},[i("b",{attrs:{title:s.name}},[t._v(t._s(s.name))])])],1)])])])]),t._v(" "),i("td",{staticClass:"s-fc3"},[i("span",[t._v(t._s(t._f("dtTime")(s.duration)))])]),t._v(" "),i("td",[i("div",{staticClass:"text"},[i("span",t._l(s.artists,function(a){return i("a",{attrs:{href:"javascript:;",title:a.name}},[t._v(t._s(a.name)),i("span",{directives:[{name:"show",rawName:"v-show",value:s.artists.length>1,expression:"song.artists.length>1"}]},[t._v("/")])])}))])]),t._v(" "),i("td",[i("div",{staticClass:"text"},[i("a",{attrs:{href:"javascript:;",title:s.album.name}},[t._v(t._s(s.album.name))])])])])}))])])])]):i("div",{staticClass:"loading"},[i("img",{attrs:{src:a("G/2H")}})])])]),t._v(" "),i("div",{staticClass:"right"},[i("app-recommend")],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("i",[s("em",{staticClass:"ply"}),this._v("\n                                        播放\n                                    ")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",[s("span",{staticClass:"f-ff2"},[this._v("歌曲列表")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("thead",[s("tr",[s("th",{staticClass:"first w1"},[s("div",{staticClass:"wp"},[this._v(" ")])]),this._v(" "),s("th",{staticClass:"w5"},[s("div",{staticClass:"wp af0"})]),this._v(" "),s("th",{staticClass:"w2"},[s("div",{staticClass:"wp af1"})]),this._v(" "),s("th",{staticClass:"w3"},[s("div",{staticClass:"wp af2"})]),this._v(" "),s("th",{staticClass:"w4"},[s("div",{staticClass:"wp af3"})])])])}]};var v=a("C7Lr")(r,l,!1,function(t){a("1ala")},"data-v-4796b658",null);s.default=v.exports},cV3P:function(t,s,a){"use strict";var i={data:function(){return{hotDj:[{name:"陈立",intro:"心里学家、美食家陈立教授",img:a("YX8l")},{name:"DJ艳秋",intro:"著名音乐节目主持人",img:a("zvOj")},{name:"国家大剧院古典音乐频道",intro:"国家大剧院古典音乐官方",img:a("5yHz")},{name:"谢谢收听",intro:"南京电台主持人王馨",img:a("5AzH")},{name:"DJ晓苏",intro:"独立DJ，CRI环球旅游广播特邀DJ",img:a("DtB0")}],singers:[{img:a("laPi")},{img:a("XhW2")},{img:a("qF06")},{img:a("TDyv")},{img:a("MJBj")}]}}},e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"g-wrap7"},[t._m(0),t._v(" "),a("ul",{staticClass:"m-piclist f-cb"},t._l(t.singers,function(t){return a("li",[a("a",{staticClass:"f-tdn",attrs:{href:"javascript:;",title:""}},[a("img",{attrs:{src:t.img}})])])})),t._v(" "),t._m(1),t._v(" "),a("ul",{staticClass:"m-rctlist f-cb"},t._l(t.hotDj,function(s){return a("li",[a("div",{staticClass:"cver u-cover u-cover-3"},[a("a",{attrs:{href:"javascript:;"}},[a("img",{attrs:{src:s.img}})])]),t._v(" "),a("div",{staticClass:"info"},[a("p",{staticClass:"f-thide"},[a("a",{staticClass:"s-fc0",attrs:{href:"javascript:;"}},[t._v(t._s(s.name))])]),t._v(" "),a("p",[a("span",{staticClass:"by s-fc4"},[t._v("by")]),t._v(" "),a("a",{staticClass:"nm f-thide s-fc3",attrs:{href:"javascript:;"}},[t._v(t._s(s.intro))]),t._v(" "),a("sup",{staticClass:"u-icn u-icn-84"})])])])}))])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{staticClass:"u-hd3"},[s("span",{staticClass:"f-f1"},[this._v("喜欢这个歌单的人")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{staticClass:"u-hd3"},[s("span",{staticClass:"f-f1"},[this._v("相关推荐")])])}]};var n=a("C7Lr")(i,e,!1,function(t){a("27UG")},"data-v-96794054",null);s.a=n.exports}});
//# sourceMappingURL=chunk3.js.map?faca4026ff15a8db9ea3