webpackJsonp([4],{S62b:function(t,i,e){"use strict";(function(t){var s=e("4YfN"),a=e.n(s),n=e("9rMa");i.a={name:"app-player",data:function(){return{audioObj:null,ctx:null,source:null,analyser:null,gain:null,context:null,width:0,height:0,currentID:0,cycle:2,val:0,timer:null,timer1:null,isV:"hidden",wiD:0,cTime:"00:00",dTime:"00:00",canvas:"",drawIndex:5,size:64,animateID:null,Dots:[],maxFrame:0,minFrame:9999,currFrame:0,currTime:0,elapseTime:0,_sTime:0,_sTFrame:0,flag:null,url:"",FPS:"",lyric:null,lyriced:!1,effectSize:[{num:16,width:26},{num:32,width:32},{num:64,width:26},{num:128,width:26},{num:512,width:32}],sizeIndex:64,nthLine:0,labelTimes:[],hands:!0,imgUrl:null,arname:"",name:""}},methods:{init:function(){this.audioObj=t("#mp3").get(0)},init2:function(){window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.msAudioContext;try{this.ctx=new window.AudioContext}catch(t){this.ctx=null,console.log("Your browser can't support Audio API!")}null!==this.ctx&&this.ctx instanceof AudioContext&&(this.source=this.ctx.createMediaElementSource(this.audioObj),this.gain=this.ctx.createGain(),this.analyser=this.ctx.createAnalyser(),this.source.connect(this.gain),this.gain.connect(this.analyser),this.analyser.connect(this.ctx.destination),this.analyser.smoothingTimeConstant=.7,this.analyser.fftSize=128)},init3:function(t){this.context=t.getContext("2d"),this.width=t.offsetWidth,this.height=t.offsetHeight},play:function(){this.audioObj.play()},pause:function(){this.audioObj.pause()},playBtn:function(){this.audioObj.paused?this.play():this.pause()},nextBtn:function(){if(this.pause(),this.currentID<this.playLists.length-1){var t=this.playLists[this.currentID+1].id;this.playd(t),this.currentID++,this.getPicurl(t)}else this.playd(this.playLists[0].id),this.currentID=0,this.getPicurl(this.playLists[0].id)},random:function(t,i){return Math.round(Math.random()*(i-t)+t)},prevBtn:function(){if(this.pause(),this.currentID>0){var t=this.playLists[this.currentID-1].id;this.playd(t),this.currentID--,this.getPicurl(t)}else{var i=this.playLists.length-1,e=this.playLists[i].id;this.playd(e),this.currentID=i,this.getPicurl(e)}},ended:function(){this.nextBtn()},bingAudioObj:function(){var i=this;t(this.audioObj).on({play:function(){t(".playBtn").addClass("playing"),t(".onplay").removeClass("onplay"),t(".list li[data-id="+i.currentID+"]").addClass("onplay")},pause:function(){t(".playBtn").removeClass("playing")},ended:function(){i.ended()}})},volume:function(){"hidden"==this.isV?(this.isV="visible",this.volGroove()):this.isV="hidden"},changes:function(){isNaN(this.audioObj.duration)||(this.audioObj.currentTime=document.querySelector(".line").value*this.audioObj.duration,this.audioObj.paused||this.audioObj.play())},values:function(){var t=this;this.timer=setInterval(function(){t.val=t.audioObj.currentTime/t.audioObj.duration,t.cTime=t.Ctime(t.audioObj.currentTime),t.dTime=t.Ctime(t.audioObj.duration),t.scrollLyric(),t.FPS="max-FPS:"+t.maxFrame+"   | min-FPS:"+t.minFrame+"   | cur-FPS:"+t.currFrame},1e3)},Ctime:function(t){return this.toDoubleDigits(Math.floor(t/60))+":"+this.toDoubleDigits(Math.floor(t%60))},toDoubleDigits:function(t){var i=t.toString();return i.length<2&&(i="0"+i),i},volGroove:function(){var i=this;t(".volGroove").on("mousedown",function(){i.changeVolumn(),"volBtn"==event.target.className&&t(document).on({mousemove:function(t){i.changeVolumn()},mouseup:function(){t(document).unbind("mousemove"),t(document).unbind("mouseup")}})})},changeVolumn:function(){var i=t("#footer").get(0).offsetTop-event.clientY-18;i=i<0?0:i>90?90:i,t(".volBtn").css("bottom",i+"px"),t(".currVol").css("height",i+3+"px"),this.setGain(i/90),0===i?t(".volume").addClass("mute"):t(".volume").removeClass("mute")},setGain:function(t){this.gain.gain.value=t},resizeCanvas:function(i,e){var s=t(".effect").get(0);document.documentElement.clientWidth<i?document.body.style.width=i+"px":document.body.style.width="100%",document.documentElement.clientHeight<e?document.body.style.height=e+"px":document.body.style.height="100%",this.canvas.width=s.offsetWidth,this.canvas.height=s.offsetHeight},setSize:function(t){this.size=t,this.analyser.fftSize=4*this.size},setSmooth:function(t){this.analyser.smoothingTimeConstant=t},addLineargrandient:function(){var t=this.context.createLinearGradient(0,this.height,0,0);t.addColorStop(0,"#ff9966"),t.addColorStop(.5,"#99ff66"),t.addColorStop(.8,"#9966ff"),t.addColorStop(1,"#6699ff"),this.context.fillStyle=t},visualizer:function(){var t=this;window.cancelAnimationFrame(this.animateID);var i,e=new Uint8Array(this.size);switch(this.context.fillStyle="",this.context.strokeStyle="",this.context.shadowBlur=0,this.drawIndex){case 0:this.addLineargrandient(),this.getDots(),i=function(i){t.columnDraw(i)};break;case 1:this.getDots(),i=function(i){t.bubbleDraw(i)};break;case 2:this.setSmooth(.85),this.addShadow(),i=function(i){t.phosphorDraw(i)};break;case 5:this.setSmooth(.9),this.getDots(),i=function(i){t.spiralDraw(i)}}this.start(),requestAnimationFrame(function s(){t.analyser.getByteFrequencyData(e),t.context.clearRect(-1e3,-1e3,t.width+1e3,t.height+1e3),i(e),t.update(),t.animateID=requestAnimationFrame(s)}),i(e)},getDots:function(){for(var t=0;t<this.size;t++){var i=this.random,e=i(0,this.width),s=i(0,this.height),a=i(2,5),n=i(2,5),r="rgba("+i(200,255)+","+i(66,200)+","+i(66,200)+","+i(.6,1)+")",o="rgba("+i(200,255)+","+i(66,200)+","+i(66,200)+","+i(.1,.5)+")";this.Dots.push({x:e,y:s,dx:a,dy:n,color:r,color2:o,cap:0})}},start:function(){this.currTime=this._sTime=new Date},update:function(){var t=new Date;t-this._sTime>=1e3?(this.currFrame=this._sTFrame,this.maxFrame=this.currFrame>this.maxFrame?this.currFrame:this.maxFrame,this.minFrame=this.currFrame<this.minFrame?this.currFrame:this.minFrame,this._sTFrame=0,this._sTime=t):++this._sTFrame,this.elapseTime=t-this.currTime,this.currTime=t},spiralDraw:function(t){this.context.lineWidth=2;var i=10;this.context.translate(this.width/2,this.height/2);for(var e=0,s=[0],a=0,n=1;a<this.size;a++)a==n*this.size/8-1&&(s.push(e),n++),e+=t[a];for(a=1;a<s.length;a++)s[a-1]=8*(s[a]-s[a-1])/this.size;this.context.beginPath();for(a=0;a<this.size;a++)this.context.strokeStyle="rgba("+parseInt(27)+",254,"+parseInt(15)+",1)",i=100+t[a]/256*((this.height>this.width?this.width:this.height)-200)/2,this.context.moveTo(i,0),this.context.arc(0,0,i,0,2*Math.PI,!0);this.context.stroke(),i=100,this.context.beginPath(),this.context.rotate(.2*Math.PI/this.size);for(a=0;a<this.size;a++)this.context.fillStyle="rgba("+parseInt(155)+","+parseInt(244)+",181,1)",this.context.rotate(2*Math.PI/this.size),this.context.fillRect(i,0,t[a]/2,7);this.context.stroke();var r=this.Dots[0];r.cap-=.004*Math.PI;for(a=0;a<8;a++)this.context.beginPath(),this.context.lineWidth=4,this.context.strokeStyle="rgba(24,"+parseInt(240)+","+parseInt(222)+",0.8)",this.context.arc(0,0,90-10*a,r.cap-s[a]/256*2*Math.PI/2,r.cap+s[a]/256*2*Math.PI/2,!1),this.context.stroke();this.context.translate(-this.width/2,-this.height/2)},columnDraw:function(t){var i=.6*this.width/this.size;i=i>20?20:i;for(var e=.1*this.height,s=0;s<this.size;s++){var a=this.Dots[s],n=Math.floor(s*this.width/this.size),r=.8*(Math.floor((s+1)*this.width/this.size)-n),o=t[s]/256*(this.height-i),h=.5+(a.cap-o)/(.2*this.height);a.cap-=h,a.cap<0&&(a.cap=0),o>0&&o+e>a.cap&&(a.cap=o+e),a.cap>this.height-i&&(a.cap=this.height-i),this.context.fillRect(n,this.height,r,-o),this.context.fillRect(n,this.height-a.cap,r,-i)}},bubbleDraw:function(t){for(var i=0;i<this.size;i++){var e=this.Dots[i],s=6+t[i]/256*(this.height>this.width?this.width:this.height)/10,a=this.context.createRadialGradient(e.x,e.y,0,e.x,e.y,s);a.addColorStop(0,e.color2),a.addColorStop(1,e.color),this.context.beginPath(),this.context.arc(e.x,e.y,s,0,2*Math.PI,!0),this.context.fillStyle=a,this.context.fill(),e.x+=e.dx,e.x=e.x>this.width?0:e.x}},addShadow:function(){this.context.shadowColor="#0033ff",this.context.shadowBlur=1,this.context.shadowOffsetX=0,this.context.shadowOffsetY=0,this.context.fillStyle="#BECEE9"},phosphorDraw:function(t){this.context.fillRect(0,this.height/2+1,this.width,-1);var i=.6*this.width/this.size;i=i>20?20:i;this.height;for(var e=0;e<this.size;e++){var s=Math.floor(e*this.width/this.size),a=.6*(Math.floor((e+1)*this.width/this.size)-s),n=t[e]/256*(this.height-i);this.context.fillRect(s,this.height/2+n/2,a,-n)}},Column:function(){this.drawIndex=0,this.resizeCanvas(700,500),this.visualizer()},Bubble:function(){this.drawIndex=1,this.resizeCanvas(700,500),this.visualizer()},Phosphor:function(){this.drawIndex=2,this.resizeCanvas(700,500),this.visualizer()},Spiral:function(){this.drawIndex=5,this.resizeCanvas(700,500),this.visualizer()},effectsize:function(t){switch(t){case 16:this.setSize(16),this.sizeIndex=16;break;case 32:this.setSize(32),this.sizeIndex=32;break;case 64:this.setSize(64),this.sizeIndex=64;break;case 128:this.setSize(128),this.sizeIndex=128;break;case 512:this.setSize(512),this.sizeIndex=512;break;default:this.setSize(64),this.sizeIndex=64}this.visualizer()},changeCycleStyle:function(){this.cycle<3&&this.cycle>0?this.cycle++:this.cycle=1},lyricshow:function(){this.lyriced=!this.lyriced},loadLyric:function(){if(null!==this.lyric){this.nthLine=0,this.currUrl=this.lyric,this.labelTimes=[];for(var i=/\[([0-9]{2})\:([0-9]{2})(\.)([0-9]{2,3})\]/,e=this.lyric.split("\n"),s="",a=0;a<e.length;a++){var n=i.exec(e[a]);if(n){this.labelTimes.push(this.labelTimeToSecns(n[0]));11==n[0].length?s+="<div>"+e[a].slice(n.index+11)+"</div>":s+="<div>"+e[a].slice(n.index+10)+"</div>"}}t(".lyricSlider").html(s),t(".lyricSlider div").css("margin-bottom","10px"),this.scrollLyric()}else{var r="";r+='<p class="noLyricTitle">纯音乐!</p><br/>',r+='<a href="javascript:void(0)" class="noLyricUpload">Upload a lyric</a>',t(".lyricSlider").html(r)}},labelTimeToSecns:function(t){return parseFloat(60*t.slice(1,3))+parseFloat(t.slice(4,10))},scrollLyric:function(){var i,e=this.labelTimes[this.nthLine],s=null,a=0;this.audioObj.currentTime>e&&(i=t(".lyricSlider div:eq("+this.nthLine+")"),t(".play").css("color","#ccc"),i.addClass("play"),i.css("color","#1BFE0F"),s=t(".lyricBoard").get(0),a=(a=parseInt(i.get(0).offsetTop-s.offsetHeight/2+25))<0?0:a,this.addDomBufferAnimate(s,{scrollTop:a},20),this.nthLine++)},addDomBufferAnimate:function(t,i,e,s){clearInterval(t.timer),t.timer=setInterval(function(){var e=!0;for(var a in i){var n=t[a],r=(i[a]-n)/10;r=r>0?Math.ceil(r):Math.floor(r),n!=i[a]&&(e=!1),t[a]=n+r}e&&(clearInterval(t.timer),s&&s())},e)},handle:function(){var i=t(".musicList");1==this.hands?(i.animate({left:"-250px"},"linear"),this.hands=!1):(i.animate({left:"0px"},"linear"),this.hands=!0)},playd:function(t){this.url="song/media/outer/url?id="+t+".mp3"},playds:function(){this.playd(this.playLists[0].id),this.playl(this.playLists[0].id),this.getPicurl(this.playLists[0].id),this.currentID=0},playdd:function(t,i){this.getPicurl(t),this.playd(t),this.playl(t),this.currentID=i},playl:function(t){var i=this;this.$http.get("/lyric",{xhrFields:{withCredentials:!0},params:{id:t}}).then(function(t){1==t.data.nolyric?i.lyric=null:t.data.lrc.lyric&&(i.lyric=t.data.lrc.lyric),i.loadLyric()})},getPicurl:function(t){var i=this;this.$http.get("/song/detail",{xhrFields:{withCredentials:!0},params:{ids:t}}).then(function(t){200==t.data.code&&(i.name=t.data.songs[0].name,i.imgUrl=t.data.songs[0].al.picUrl,i.arname=t.data.songs[0].ar[0].name)})},closePlayerBox:function(){this.$store.commit("hideHeight")}},mounted:function(){var i=this;this.init(),this.init2(),this.values(),window.onload=function(){},this.canvas=t("#canvas").get(0),window.onresize=function(){i.resizeCanvas(700,500),i.init3(i.canvas),i.visualizer()},this.setSize(64),this.bingAudioObj()},created:function(){},computed:a()({},Object(n.b)(["playListDetail","songDetail","songUrlImg"]),{playLists:function(){return this.$store.state.playLisTs},heightis:function(){return this.$store.state.heightIs}}),watch:{val:function(){this.wiD=this.val},lyric:function(){this.loadLyric()},playLists:function(){console.log(1234),this.$store.commit("showHeight"),this.playds()},heightis:function(){var t=this;"block"==this.heightis&&(this.timer1=setTimeout(function(){t.resizeCanvas(700,500),t.init3(t.canvas),t.visualizer()},500))}},destroyed:function(){clearInterval(this.timer),clearTimeout(this.time1),this.timer=null,this.timer1=null}}}).call(i,e("fu2u"))},W30V:function(t,i){},aN8A:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("S62b"),a={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{style:"display:"+t.heightis,attrs:{id:"container"}},[e("div",{attrs:{id:"header"}},[e("div",{staticClass:"logologo",domProps:{textContent:t._s(t.FPS)}}),t._v(" "),e("div",{staticClass:"effectList"},[e("div",{staticStyle:{width:"40%"}},[e("div",{staticClass:"effectStyle"},[e("a",{attrs:{href:"#"}},[e("div",{class:{checked:0==t.drawIndex},on:{click:function(i){return i.preventDefault(),t.Column(i)}}},[t._v("跳动音符")])]),t._v(" "),e("a",{attrs:{href:"#"}},[e("div",{class:{checked:1==t.drawIndex},on:{click:function(i){return i.preventDefault(),t.Bubble(i)}}},[t._v("漂浮气泡")])]),t._v(" "),e("a",{attrs:{href:"#"}},[e("div",{class:{checked:2==t.drawIndex},on:{click:function(i){return i.preventDefault(),t.Phosphor(i)}}},[t._v("对称音符")])]),t._v(" "),e("a",{attrs:{href:"#"}},[e("div",{class:{checked:5==t.drawIndex},on:{click:function(i){return i.preventDefault(),t.Spiral(i)}}},[t._v("旋转线条")])])])]),t._v(" "),e("div",{staticClass:"closePlayerBox",on:{click:t.closePlayerBox}},[t._v("\n                收起均衡器\n            ")]),t._v(" "),e("div",{staticStyle:{width:"40%"}},[e("div",{staticClass:"effectSize"},t._l(t.effectSize,function(i){return e("a",{attrs:{href:"#"}},[e("div",{class:{checked:t.sizeIndex==i.num},style:"width:"+i.width+"px",on:{click:function(e){e.preventDefault(),t.effectsize(i.num)}}},[t._v(t._s(i.num))])])}))])])]),t._v(" "),e("div",{attrs:{id:"main"}},[e("transition",{attrs:{name:"hide"}},[e("div",{staticClass:"musicList"},[e("a",{attrs:{href:"#"}},[e("div",{staticClass:"handle",on:{click:t.handle}},[t._v(" HIDE ")])]),t._v(" "),e("div",{staticClass:"list"},[t.playLists.length>=1?e("ul",t._l(t.playLists,function(i,s){return e("li",{attrs:{"data-id":s}},[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){e.preventDefault(),t.playdd(i.id,s)}}},[e("span",[t._v(t._s(s+1))]),t._v("\n                        "+t._s(i.name))])])})):t._e()]),t._v(" "),e("div",{staticClass:"current"},[e("div",{staticClass:"pic"},[e("img",{attrs:{src:t.imgUrl}})]),t._v(" "),e("div",{staticClass:"detail"},[e("p",[t._v(t._s(t.name)+"-"),e("span",[t._v(t._s(t.arname))])])])])])]),t._v(" "),e("div",{staticClass:"effect"},[e("canvas",{attrs:{id:"canvas",width:"",height:""}}),t._v(" "),e("audio",{attrs:{src:"/proxy/html/"+t.url,autoplay:"autoplay",id:"mp3",crossOrigin:"anonymous"}})])],1),t._v(" "),e("div",{attrs:{id:"footer"}},[e("div",{staticClass:"controls"},[e("a",{staticClass:"prevBtn",attrs:{href:"javascript:void(0)"},on:{click:function(i){return i.preventDefault(),t.prevBtn(i)}}}),t._v(" "),e("a",{staticClass:"playBtn",attrs:{href:"javascript:void(0)",title:"播放/暂停(P)"},on:{click:function(i){return i.preventDefault(),t.playBtn(i)}}}),t._v(" "),e("a",{staticClass:"nextBtn",attrs:{href:"javascript:void(0)"},on:{click:function(i){return i.preventDefault(),t.nextBtn(i)}}})]),t._v(" "),e("div",{staticClass:"timeline"},[e("p",{domProps:{textContent:t._s(t.cTime)}},[t._v("00:00")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.val,expression:"val",modifiers:{lazy:!0}}],staticClass:"line",attrs:{type:"range",min:"0",max:"1",value:"0",step:"0.0005"},domProps:{value:t.val},on:{change:[function(i){t.val=i.target.value},t.changes]}}),t._v(" "),e("p",{domProps:{textContent:t._s(t.dTime)}},[t._v("00:00")]),t._v(" "),e("div",{staticClass:"slider"},[e("div",{staticClass:"slider-w",style:"width:"+100*t.wiD+"%;"})])]),t._v(" "),e("div",{staticClass:"social"},[e("div",{staticClass:"vol",style:{visibility:t.isV}},[e("div",{staticClass:"volBack"}),t._v(" "),t._m(0)]),t._v(" "),e("a",{staticClass:"item volume",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.volume(i)}}}),t._v(" "),e("a",{staticClass:"item loop",class:{listing:1==t.cycle,single:2==t.cycle,random:3==t.cycle},attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.changeCycleStyle(i)}}}),t._v(" "),e("a",{staticClass:"item local",attrs:{href:"#"}}),t._v(" "),e("input",{staticStyle:{display:"none"},attrs:{type:"file",multiple:"",id:"file"}}),t._v(" "),e("a",{staticClass:"item lyric",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.lyricshow(i)}}},[t._v("词")])])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.lyriced,expression:"lyriced"}],staticClass:"lyr"},[e("div",{staticClass:"lyricBoard"},[e("div",[t._v(t._s(t.name))]),t._v(" "),t._m(1)])])])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"volGroove"},[i("div",{staticClass:"currVol",staticStyle:{height:"50px"}}),this._v(" "),i("div",{staticClass:"volBtn",staticStyle:{bottom:"50px"}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"lyricSlider",staticStyle:{position:"relative"}},[i("p",{staticClass:"noLyricTitle"},[this._v("纯音乐!")]),i("br"),this._v(" "),i("a",{staticClass:"noLyricUpload",attrs:{href:"javascript:void(0)"}},[this._v("Upload a lyric")])])}]};var n=function(t){e("W30V")},r=e("C7Lr")(s.a,a,!1,n,"data-v-6ef08ca8",null);i.default=r.exports}});
//# sourceMappingURL=chunk4.js.map?ec2a2984fbed18fa89ff