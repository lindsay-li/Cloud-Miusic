<template>
  <!-- <div id="container" :style="'height:'+heightis"> -->
  <div id="container" :style="'display:'+heightis">
    <div id="header">
        <div class="logologo" v-text="FPS"></div>
        <div class="effectList">
            <div style="width:40%;">
                <div class="effectStyle">
                    <a href="#"><div  :class="{checked:drawIndex==0}"@click.prevent="Column">跳动音符</div></a>
                    <a href="#"><div  :class="{checked:drawIndex==1}"@click.prevent="Bubble">漂浮气泡</div></a>
                    <a href="#"><div  :class="{checked:drawIndex==2}"@click.prevent="Phosphor">对称音符</div></a>
                    <a href="#"><div :class="{checked:drawIndex==5}"  @click.prevent="Spiral">旋转线条</div></a>
                </div>
            </div>
            <div class="closePlayerBox" @click="closePlayerBox">
                收起均衡器
            </div>
            <div style="width:40%;">
                <div class="effectSize">
                    <a href="#" v-for=" effect in effectSize"><div :style="'width:'+effect.width+'px'" :class="{ 'checked':sizeIndex==effect.num}" @click.prevent="effectsize(effect.num)">{{effect.num}}</div></a>
                </div>
            </div>
        </div>
    </div>
    <div id="main">
        <transition name="hide">
        <div class="musicList">
            <a href="#"><div class="handle" @click="handle"> HIDE </div></a>
            <div class="list">
                <ul v-if="playLists.length>=1">
                    <li v-for="(song,index) in playLists" :data-id="index">
                        <a href="javascript:;" @click.prevent="playdd(song.id,index)">
                        <span>{{index+1}}</span>
                        {{song.name}}</a>
                    </li>  
                </ul>
            </div>
            <div class="current">
                <div class="pic"><img :src="imgUrl"></div>
                <div class="detail">
                    <p>{{name}}-<span>{{arname}}</span></p>
                </div>
            </div>
        </div>
        </transition>
        <div class="effect">
            <canvas id="canvas" width="" height=""></canvas>
            <audio :src="'/proxy/html/'+url"  autoplay="autoplay" id="mp3" crossOrigin="anonymous"></audio>
            <!-- <audio :src="url"  autoplay="autoplay" id="mp3" crossOrigin="anonymous"></audio> -->
        </div>
    </div>
    <div id="footer">
        <div class="controls">
            <a class="prevBtn" href="javascript:void(0)" @click.prevent="prevBtn"></a>
            <a class="playBtn" href="javascript:void(0)" @click.prevent="playBtn" title="播放/暂停(P)"></a>
            <a class="nextBtn" href="javascript:void(0)" @click.prevent="nextBtn"></a>
        </div>
        <div class="timeline">
            <p v-text="cTime">00:00</p>
            <input type="range" class="line" min="0" max="1" value="0"    step="0.0005" @change="changes" v-model.lazy="val" />
            <p v-text="dTime">00:00</p>
            <div class="slider">
                <div class="slider-w" :style="'width:'+wiD*100+'%;'"></div>
            </div>
        </div>
        <div class="social">
            <div class="vol"  :style="{visibility:isV}" >
                <div class="volBack" ></div>
                <div class="volGroove" >
                    <div class="currVol" style="height:50px;"></div>
                    <div class="volBtn" style="bottom:50px"></div>
                </div>
            </div>
            <a href="#" class="item volume" @click.prevent="volume"></a>
            <a href="#" class="item loop" @click.prevent="changeCycleStyle" :class="{'listing':cycle==1,'single':cycle==2,'random':cycle==3}"></a>
            <a href="#" class="item local"></a>
            <input type="file" multiple id="file" style="display:none"/>
            <a href="#" class="item lyric" @click.prevent="lyricshow">词</a>
        </div>
    </div>
    <div class="lyr" v-show="lyriced">
        <div class="lyricBoard">
            <div>{{name}}</div>
            <div class="lyricSlider" style="position: relative">
                <p class="noLyricTitle">纯音乐!</p><br/>
                <a href="javascript:void(0)" class="noLyricUpload">Upload a lyric</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:"app-player",
  data(){
      return{
        audioObj:null,
        ctx:null,
        source: null,
        analyser: null,
        gain: null,
        context:null,
        width:0,
        height:0,
        currentID:0,
        cycle:2,
        val:0,
        timer:null,
        timer1:null,
        isV:"hidden",
        wiD:0,
        cTime:"00:00",
        dTime:"00:00",
        canvas:"",
        drawIndex: 5,
        size:64,
        animateID:null,
        Dots:[],
        maxFrame: 0,
        minFrame:9999,
        currFrame: 0,
        currTime: 0,
        elapseTime: 0,
        _sTime: 0,
        _sTFrame: 0,
        // array:null,
        flag:null,
        url:"",
        FPS:"",
        lyric:null,
        lyriced:false,
        effectSize:[{"num":16,"width":26},{"num":32,"width":32},{"num":64,"width":26},{"num":128,"width":26},{"num":512,"width":32},],
        sizeIndex:64,
        nthLine:0,
        labelTimes:[],
        hands:true,
        imgUrl:null,
        arname:"",
        name:"",
      }
  },
  methods:{
    init:function(){
        this.audioObj = $("#mp3").get(0);
    },
    init2:function(){
        window.AudioContext =window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        try{
            this.ctx = new window.AudioContext();
        } catch(e){
            this.ctx = null;
            console.log("Your browser can't support Audio API!");
        }
        if(this.ctx !== null && this.ctx instanceof AudioContext){ 
        this.source = this.ctx.createMediaElementSource(this.audioObj);
        this.gain = this.ctx.createGain();
        this.analyser = this.ctx.createAnalyser();
        this.source.connect(this.gain);
        this.gain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
        this.analyser.smoothingTimeConstant = 0.7;
        this.analyser.fftSize = 128;
        }
    },
    init3:function(canvas){
        this.context = canvas.getContext("2d");
        this.width = canvas.offsetWidth;
        this.height = canvas.offsetHeight;
    },
    play:function(){
         this.audioObj.play();
    },
    pause:function(){
        this.audioObj.pause();
    },
    playBtn:function(){
        if(this.audioObj.paused){
            this.play()
        }else{
            this.pause()
        }     
    },
    nextBtn:function(){
        this.pause()
        if(this.currentID<this.playLists.length-1){
            var id=this.playLists[this.currentID+1].id
            this.playd(id)
            this.currentID++
            this.getPicurl(id)
        }else{
            this.playd(this.playLists[0].id)
            this.currentID=0
            this.getPicurl(this.playLists[0].id)
        }    
    },
    random:function(m,n){
        return Math.round(Math.random()*(n-m)+m);
    },
    prevBtn:function(){
        this.pause()
        if(this.currentID>0){
            var id=this.playLists[this.currentID-1].id
            this.playd(id)
            this.currentID--
            this.getPicurl(id)
        }else{
            var i = this.playLists.length-1
            var n=this.playLists[i].id
            this.playd(n)
            this.currentID=i
            this.getPicurl(n)
        }
        
    },
    ended:function(){
        this.nextBtn()
    },
    bingAudioObj:function(){
         $(this.audioObj).on({
            "play":  ()=>{
                $(".playBtn").addClass("playing");   // change play/pause button style
                $(".onplay").removeClass("onplay");    // change current music style of playlist
                $(".list li[data-id=" + this.currentID + "]").addClass("onplay");
                // scrollList();   // scrolled playlist to current music's location
                // Lyric.loadLyric(Player.playList[Player.currentID].lyricUrl, function(){
                //     Lyric.relocateLyric(Player.audioObj.currentTime, 0, Lyric.labelTimes.length - 1); // todo:package it
                // });
            },
            "pause": function(){
                $(".playBtn").removeClass("playing");
            },
            "ended": ()=>{
                this.ended();
            },
        })
    },
    volume:function(){
        if(this.isV=="hidden"){
            this.isV="visible"
            this.volGroove()
        }else{
            this.isV="hidden"
        }
    },
    changes:function(){
        if( !isNaN(this.audioObj.duration) ){
                    this.audioObj.currentTime = (document.querySelector(".line").value) * (this.audioObj.duration)
                    if(!this.audioObj.paused){
                        this.audioObj.play();
                    }
                }
    },
    values:function(){
        this.timer=setInterval(()=>{
            this.val=this.audioObj.currentTime / this.audioObj.duration
            this.cTime=this.Ctime(this.audioObj.currentTime)
            this.dTime=this.Ctime(this.audioObj.duration)
            this.scrollLyric()
            this.FPS="max-FPS:" + this.maxFrame + "   | min-FPS:" + this.minFrame + "   | cur-FPS:" + this.currFrame
        },1000)
    },
    Ctime:function(val){
        return this.toDoubleDigits(Math.floor(val / 60))+":"+
            this.toDoubleDigits(Math.floor(val % 60));
    },
    toDoubleDigits: function(num){
        var t = num.toString();
        if(t.length < 2 ){
            t = "0" + t;
        }
        return t;
    },
    volGroove:function(){
        $(".volGroove").on("mousedown", ()=>{
            this.changeVolumn();
            if(event.target.className == "volBtn"){
                $(document).on({
                    "mousemove": (event)=>{
                        this.changeVolumn();
                    },
                    "mouseup": ()=>{
                        $(document).unbind("mousemove");
                        $(document).unbind("mouseup");
                    }
                })
            }
        });
        
    }, 
    changeVolumn:function(){
        var v=$("#footer").get(0).offsetTop - event.clientY - 18
        v = (v < 0)? 0: (v > 90)? 90: v;
            $(".volBtn").css("bottom", v + "px");
            $(".currVol").css("height", v + 3 + "px");
            this. setGain(v / 90);
            if(v === 0){
                $(".volume").addClass("mute");
            } else {
                $(".volume").removeClass("mute");
            }
    },
    setGain: function(vol){
        this.gain.gain.value = vol;
    },
    resizeCanvas:function(minW,minH){
        var oEff = $(".effect").get(0);
        if(document.documentElement.clientWidth < minW){
            document.body.style.width = minW + "px";
        }else{
            document.body.style.width = "100%";
        }
        if(document.documentElement.clientHeight < minH){
            document.body.style.height = minH + 'px';
        }else{
            document.body.style.height = "100%";
        }
        this.canvas.width = oEff.offsetWidth;
        this.canvas.height = oEff.offsetHeight;
    },
    setSize:function(s){
        this.size = s;
        this.analyser.fftSize =4 * this.size;
    },
    setSmooth: function(s){
        this.analyser.smoothingTimeConstant = s;
    },
    addLineargrandient:function(){
        var lineargrandient=this.context.createLinearGradient(0,this.height,0,0);
        lineargrandient.addColorStop(0,'#ff9966');
        lineargrandient.addColorStop(0.5,'#99ff66');
        lineargrandient.addColorStop(0.8,'#9966ff');
        lineargrandient.addColorStop(1,'#6699ff');
        this.context.fillStyle=lineargrandient;
    },
    visualizer:function(){
        var _this = this
        window.cancelAnimationFrame(this.animateID)
        let array = new Uint8Array(this.size)
        var draw
        this.context.fillStyle = ""
        this.context.strokeStyle = ""
        this.context.shadowBlur = 0
        switch(this.drawIndex){
            case 0:
                this.addLineargrandient();
                this.getDots();
                draw =function(arr){
                    _this.columnDraw(arr);
                };
                break;
            case 1:
                this.getDots();
                draw =function(arr){
                    _this.bubbleDraw(arr);
                };
                break;
            case 2:
                //this.getDots();
                this.setSmooth(0.85);
                this.addShadow();
                draw =function(arr){
                    _this.phosphorDraw(arr);
                };
                break;
            case 5:
                this.setSmooth(0.9)
                this.getDots()
                draw =function(arr){
                    _this.spiralDraw(arr);
                }
                break;
        } 
        this.start()
        function v(){
            _this.analyser.getByteFrequencyData(array);
            _this.context.clearRect(-1000, -1000, _this.width + 1000, _this.height + 1000);
           draw(array);
            _this.update();
            _this.animateID =requestAnimationFrame(v);
        }
        requestAnimationFrame(v);
        draw(array);
    },
    getDots:function(){
        for(var i=0;i<this.size;i++){
            var random = this.random;
            var x=random(0, this.width);
            var y=random(0, this.height);
            var dx=random(2, 5);
            var dy=random(2, 5);
            var color = "rgba(" + random(200, 255) + ","+ random(66, 200) + "," + random(66, 200) + "," + random(0.6, 1)+")";
            var color2 = "rgba(" + random(200,255)+","+random(66,200)+","+random(66,200)+","+random(0.1,0.5)+")";
            this.Dots.push({
                x:x,
                y:y,
                dx:dx,
                dy:dy,
                color:color,
                color2:color2,
                cap:0
            });
        }
    },
    start:function(){
        this.currTime = this._sTime = new Date();
    },
    update: function(){
        var fTime = new Date();
        if(fTime - this._sTime >= 1000){
            this.currFrame = this._sTFrame;
            this.maxFrame = (this.currFrame > this.maxFrame)? this.currFrame: this.maxFrame;
            this.minFrame = (this.currFrame < this.minFrame)? this.currFrame: this.minFrame;
            this._sTFrame = 0;
            this._sTime = fTime;
        } else {
            ++this._sTFrame;
        }
        this.elapseTime = fTime - this.currTime;
        this.currTime = fTime;
    },
    spiralDraw:function(arr){
        this.context.lineWidth = 2;
        var r = 10;
        this.context.translate(this.width / 2, this.height / 2);
        var avg = 0;
        var avgArr = [0];
        for (var i = 0,j = 1; i < this.size ; i++){
            if( i == (j * this.size / 8 - 1) ){
                avgArr.push( avg );
                j++;
            }
            avg += arr[i];
        }
        for (var i = 1; i < avgArr.length; i++){
            avgArr[i - 1] = (avgArr[i]  - avgArr[i - 1]) * 8 / this.size;
        }
        this.context.beginPath();
        for (var i = 0; i < this.size; i++) {
            this.context.strokeStyle = "rgba(" + parseInt(255 - 228) + ",254," + parseInt(255 - 240) + ",1)";
            r = 100 + arr[i] / 256 * ((this.height > this.width ? this.width : this.height) - 200) / 2;
            this.context.moveTo(r, 0);
            this.context.arc(0, 0, r, 0, 2 * Math.PI, true);
        }
        this.context.stroke();
        r = 100;
        this.context.beginPath();
        //this.context.fillStyle= "white";
        this.context.rotate(0.2 * Math.PI / this.size);
        for (var i = 0; i < this.size; i++) {
            this.context.fillStyle = "rgba(" + parseInt(255 - 100) + "," + parseInt(255 - 11) + ",181,1)";
            this.context.rotate(2 * Math.PI / this.size);
            this.context.fillRect(r, 0, arr[i]/2, 7)
        }
        this.context.stroke();
        var o = this.Dots[0]
        o.cap -= 0.004 * Math.PI
        for(var i = 0;i < 8; i++){
            this.context.beginPath();
            this.context.lineWidth = 4;
            this.context.strokeStyle ="rgba(24," + parseInt(255 - 15) + "," + parseInt(255 - 33) + ",0.8)";
            this.context.arc(0, 0, 90 - 10 * i, o.cap - avgArr[i] / 256 * 2 * Math.PI / 2, o.cap + avgArr[i] / 256 * 2 * Math.PI / 2 , false)
            this.context.stroke();
        }
        //this.context.fillStyle= "white";
         this.context.translate(-this.width / 2, -this.height / 2);
    },
    columnDraw: function(arr){
        var t=0.6*this.width/this.size;
        t=(t>20)?20:t;
        var d=0.1*this.height;
        for (var i = 0; i < this.size; i++) {
            var o = this.Dots[i];
            var x = Math.floor(i * this.width / this.size);
            var w = 0.8 * (Math.floor((i + 1) * this.width / this.size) - x);
            var h = arr[i] / 256 * (this.height-t);
            var v=0.5+(o.cap-h)/(0.2*this.height); 
            o.cap-=v;
            if(o.cap<0){
                o.cap=0;
            }
            if(h>0&&h+d>o.cap){
                o.cap=h+d;
            }
            if(o.cap>this.height-t){
                o.cap=this.height-t;
            }
            this.context.fillRect(x, this.height, w, -h);
            this.context.fillRect(x, this.height-o.cap, w, -t);
        }
    },
    bubbleDraw: function(arr){
        for(var i = 0; i < this.size; i++){
            var o= this.Dots[i];
            var r=6+arr[i]/256*(this.height>this.width?this.width:this.height)/10;
            var g=this.context.createRadialGradient(o.x,o.y,0,o.x,o.y,r);
            g.addColorStop(0,o.color2);
            g.addColorStop(1,o.color);
            this.context.beginPath();
            this.context.arc(o.x,o.y,r,0,Math.PI*2,true);
            this.context.fillStyle=g;
            this.context.fill();
            o.x+=o.dx;
            o.x=o.x>this.width?0:o.x;
        }
    },
    addShadow:function(){
        this.context.shadowColor = "#0033ff";
        this.context.shadowBlur = 1;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.fillStyle = '#BECEE9'
    },
    phosphorDraw: function(arr){
        this.context.fillRect(0, this.height / 2 +  1, this.width, -1);
        var t=0.6*this.width/this.size;
        t=(t>20)?20:t;
        var d=0.1*this.height;
        for (var i = 0; i < this.size; i++) {
            var x = Math.floor(i * this.width / this.size);
            var w = 0.6 * (Math.floor((i + 1) * this.width / this.size) - x);
            var h = arr[i] / 256 * (this.height-t);
            this.context.fillRect(x, this.height / 2 +  h / 2, w, -h);
        }
    },
    Column:function(){
        this.drawIndex=0
        this.resizeCanvas(700,500)
        this.visualizer();
    },
    Bubble:function(){
        this.drawIndex=1
        this.resizeCanvas(700,500)
        this.visualizer();
    },
    Phosphor:function(){
        this.drawIndex=2      
        this.resizeCanvas(700,500)
        this.visualizer();
    },
    Spiral:function(){
        this.drawIndex=5        
        this.resizeCanvas(700,500)
        this.visualizer();
    },
    effectsize:function(n){
       switch( n ){
            case 16:
                this.setSize(16);
                this.sizeIndex=16
                break;
            case 32:
                this.setSize(32);
                this.sizeIndex=32
                break;
            case 64:
                this.setSize(64);
                this.sizeIndex=64
                break;
            case 128:
                this.setSize(128);
                this.sizeIndex=128
                break;
            case 512:
                this.setSize(512);
                this.sizeIndex=512
                break;
            default:
                this.setSize(64);
                this.sizeIndex=64
            }
            this.visualizer();
    },
    changeCycleStyle:function(){       
         if(this.cycle<3 && this.cycle>0){
            this.cycle++
        }else{
            this.cycle=1
        }   
    },
    //歌词方法
    lyricshow:function(){
        this.lyriced=!this.lyriced
    },
    loadLyric:function(){
        if(this.lyric !==null){
            this.nthLine = 0;
            this.currUrl = this.lyric;
            this.labelTimes = [];
            var pattern = /\[([0-9]{2})\:([0-9]{2})(\.)([0-9]{2,3})\]/,
                lyrs = this.lyric.split("\n"),
                html=""
            for(var i = 0; i < lyrs.length; i++){
                var match = pattern.exec(lyrs[i])
                if(match){
                    this.labelTimes.push( this.labelTimeToSecns(match[0]) );
                    var iyricts=""
                    if(match[0].length==11){
                        iyricts=lyrs[i].slice(match.index + 11) 
                        html += "<div>" + iyricts + "</div>";
                    }else{
                        iyricts=lyrs[i].slice(match.index + 10) 
                        html += "<div>" + iyricts + "</div>";
                    }
                }
            }
            $(".lyricSlider").html(html);
            $(".lyricSlider div").css("margin-bottom","10px")
            this.scrollLyric() 
        }else{
            var htmls=""
            htmls +=`<p class="noLyricTitle">纯音乐!</p><br/>`
            htmls +=`<a href="javascript:void(0)" class="noLyricUpload">Upload a lyric</a>`
            $(".lyricSlider").html(htmls);
        }
    },
    labelTimeToSecns:function(s){
        return parseFloat(s.slice(1, 3) * 60) + parseFloat(s.slice(4, 10))
    },
    scrollLyric: function(){
        var labeltime = this.labelTimes[this.nthLine],
            lyric = null,
            top = 0,
            $playingLine;
        if(this.audioObj.currentTime > labeltime){
            $playingLine =  $(".lyricSlider div:eq("+ this.nthLine +")");
            $(".play").css("color","#ccc")
            $playingLine.addClass("play");
            $playingLine.css("color","#1BFE0F")
            lyric = $(".lyricBoard").get(0);
            top = parseInt($playingLine.get(0).offsetTop - lyric.offsetHeight / 2 + 25);
            top = (top < 0)? 0: top;
            this.addDomBufferAnimate(lyric, {"scrollTop": top}, 20);
            this.nthLine++;
        }
    },
    addDomBufferAnimate:function(obj, json, t, fnEnd){
        clearInterval(obj.timer);  //每个对象使用不同且唯一的计时器。
        obj.timer = setInterval(function () {
            var stop = true;
            for (var attr in json) {
                var cur = obj[attr];
                var speed = (json[attr] - cur) / 10;  //缓冲运动使用的公式
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (cur != json[attr]) {
                    stop = false;
                }
                obj[attr] = cur + speed;   //更新样式
            }
            if (stop) {
                clearInterval(obj.timer);
                if (fnEnd)fnEnd();
            }
        }, t);
    },
    //歌曲列表
    handle:function(){
       var musiclist=$(".musicList")
       if(this.hands==true){
           musiclist.animate({left:"-250px"},"linear")
           this.hands=false
       }else{
           musiclist.animate({left:"0px"},"linear")
           this.hands=true
       }
       
    },
    playd:function(id){
        // this.$http.get('/api/music/url',{
        // xhrFields: {
        // withCredentials: true
        // },
        //   params:{
        //     id:id,
        //   }
        // }).then((response)=>{
        //     var newUrl=response.data.data[0].url
        //     this.url=newUrl.slice(25,)
        //     // this.url=response.data.data[0].url
        // })
       this.url = `song/media/outer/url?id=${id}.mp3`
    },
    playds:function(){
        this.playd(this.playLists[0].id)
        this.playl(this.playLists[0].id)
        this.getPicurl(this.playLists[0].id)
        this.currentID=0
    },
    playdd:function(id,i){
        this.getPicurl(id)
        this.playd(id)
        this.playl(id)
        this.currentID=i
    },
    playl:function(id){
        this.$http.get('/lyric',{
        xhrFields: {
        withCredentials: true
        },
          params:{
            id:id
          }
        }).then((response)=>{
            if(response.data.nolyric==true){
                this.lyric=null
            }else if(response.data.lrc.lyric){
                this.lyric=response.data.lrc.lyric
            }
            this.loadLyric()
        })
    },
    getPicurl:function(id){
        this.$http.get('/song/detail',{
            xhrFields: {
                withCredentials: true
            },
            params:{
                ids:id
            }
        })
        .then((res)=>{
            if(res.data.code==200){
                this.name=res.data.songs[0].name
                this.imgUrl=res.data.songs[0].al.picUrl
                this.arname=res.data.songs[0].ar[0].name
            }
        })
    },
    closePlayerBox(){
        this.$store.commit('hideHeight')
    }
  },
  mounted(){
    this.init()
    this.init2()
    this.values()
    window.onload=()=>{

    }
    this.canvas=$("#canvas").get(0)
    // this.resizeCanvas(700,500)
    // this.init3(this.canvas)
    // this.visualizer()
    window.onresize=()=>{
        this.resizeCanvas(700,500)
        this.init3(this.canvas)
        this.visualizer()
    }
    this.setSize(64)
    this.bingAudioObj()
  },
  created(){
    //   this.playlist()
     
    // this.playd()
    
  },
  computed:{
    ...mapGetters([
        'playListDetail',
        'songDetail',
        'songUrlImg'
      ]),
    playLists(){
       return this.$store.state.playLisTs
    }, 
    heightis(){
        return this.$store.state.heightIs
    }
  },
  watch:{
      val:function(){
        this.wiD=this.val
      },
      lyric:function(){
          this.loadLyric()   
      },
      playLists:function(){
          console.log(1234)
          this.$store.commit('showHeight')
          this.playds()
      },
      heightis:function(){
          if(this.heightis=='block'){
            this.timer1=setTimeout(()=>{
            this.resizeCanvas(700,500)
            this.init3(this.canvas)
            this.visualizer()
          },500)
          }
      },

  },
    destroyed(){
        clearInterval(this.timer)
        clearTimeout(this.time1)
        this.timer=null
        this.timer1=null
    }
}
</script>
<style scoped>
.playBtn,.prevBtn,.nextBtn,.loop,.volume,.local{
    background: url('../assets/playbar.png') no-repeat 0 9999px;
}
a{
    text-decoration: none;
    color:inherit;
}
#container{
    width:100%;
    height:100%;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3000;
}
#header{
    width:100%;
    height:47px;
    border-bottom: 3px solid #922222;
    background: #303035;
}
#header .logologo{
    width:242px;
    height:100%;
    line-height: 47px;
    float:left;
    color:white;
    font-size: 11px;
    white-space:nowrap;
}
#header .effectList{
    position: relative;
    width:calc(100% - 242px);
    height:100%;
    float:left;
    /* background: white; */
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.effectStyle{
    width:400px;
    margin:0 auto;
}
.effectStyle div{
    margin:15px 5px;
    height:20px;
    background: #9f9f9f;
    border-radius: 3px;
    color:#020406;
    text-align: center;
    line-height: 20px;
    float:left;
    box-shadow: 0 -1px 1px black inset;
    padding: 6px 10px;
}
.effectStyle div:hover{
    color:#9f9f9f;
    background: #923232;
}
.effectStyle .checked{
    color:#fff;
    background: #922222;
}
.effectStyle .checked:hover{
    color:#bbb;
    background: #922222;
}
.effectSize{
    margin:0 0 0 333px;
}
.effectSize div{
    margin:17px 5px;
    font-size: 11px;
    width:28px;
    height:18px;
    text-align: center;
    line-height: 19px;
    float:left;
    color:#020406;
    background: #9f9f9f;
    border-radius: 5px;
    box-shadow: 0 -1px 1px black inset;
    padding: 6px 10px;
}
.effectSize div:hover{
    color:#9f9f9f;
    background: #923232;
}
.effectSize .checked{
    color:#fff;
    background: #922222;
}
.effectSize .checked:hover{
    color:#bbb;
    background: #922222;
}

#main{
    position: relative;
    width:100%;
    height:calc(100% - 100px);
    
}
#main .musicList{
    position: absolute;
    left:0;
    width:249px;
    height:100%;
    float:left;
    background: rgba(20,22,24,0.6);
    border-right: 1px solid rgba(35,40,45,0.8);
}
.musicList .handle{
    position: absolute;
    top:0px;
    right:-20px;
    height:80px;
    width:20px;
    text-align: center;
    color:rgba(146,34,34,0.8);
    line-height: 20px;
    font-size: 16px;
    writing-mode:vertical-lr;
    -ms-writing-mode:tb-rl;
    background: rgba(159,159,159,0.8);
    box-shadow: 0 -1px 1px black inset;
}
.musicList .handle:hover{
    color:rgba(159,159,159,0.8);
    background: rgba(146,34,34,0.8);
}
#main .musicList .list{
    width:100%;
    height:calc(100% - 60px);
    overflow-y: auto;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.list li{
    width:100%;
    height:28px;
    list-style: none;
    color:#ccc;
    line-height: 28px;
    text-decoration: none;
    padding-left:10px ;
}
.list li a{
    display: block;
}
.list span{
    color:rgba(204, 204, 204, 0.5);
    margin-right: 5px;
    font-size: 11px;
}

.list li:nth-child(odd){
    background:rgba(56, 58, 62, 0.45) ;
}
.list li:nth-child(even){
    background:rgba(42, 44, 48, 0.45) ;
}
.list li:hover{
    background:rgba(70, 72, 77, 0.6) ;
    color:#eee;
}
.list ul .selected{
    background: rgba(90, 96, 100, 0.8);
    color:#fff;
}
.list ul .onplay{
    background: rgba(150, 40, 40, 0.8);
    color:#fff;
}

#main .musicList .current{
    width:100%;
    height:59px;
    border-top:1px solid rgba(35,40,45,0.8);
}
#main .musicList .current .pic{
    width:59px;
    height:100%;
    box-shadow:1px 0 5px black;
    background-image: url('../assets/icebear.jpg');
    float:left;
    display: block;
}
#main .musicList .current .pic img{
    width: 100%;
    height: 100%;
}
#main .musicList .current .detail{
    width:182px;
    height:100%;
    float:right;
    padding-top: 15px;
    padding-left: 8px;
}
#main .musicList .current .detail p{
    color:#ccc;
    text-decoration: none;
    font-size: 12px;
    white-space: pre-line;
    word-wrap: break-word;
}
#main .effect{
    width:100%;
    height:100%;
    /* background: url("../assets/1467603440554.jpg") no-repeat; */
    background-color: #000;
    /* background-size:100% 100%; */
    float:left;
}

#footer{
    width:100%;
    height:49px;
    background: #303035;
    border-top: 1px solid #354045;
}
.controls{
    width:150px;
    height:100%;
    padding-top: 7px;
    margin-left: 30px;
    /* background: #6699ff; */
    float:left;
}
.controls a{
    height:100%;
    float:left;
    margin-right:18px;
    overflow: hidden;
}
.prevBtn{
    width:28px;
    height:28px;
    background-position:0 -130px ;
    margin-top: 5px;
}
.prevBtn:hover{
    background-position:-30px -130px ;
}
.playBtn{
    width:36px;
    height:36px;
    margin-top: 0;
    background-position: 0 -204px;
}
.palyBtn:hover{
    background-position: -40px -204px;
}
.playBtn.playing{
    background-position: 0 -165px;
}
.playBtn.playing:hover{
    background-position: -40px -165px;
}
.nextBtn{
    width:28px;
    height:28px;
    background-position:-80px -130px ;
    margin-top: 5px;
    margin-right:8px;
}
.nextBtn:hover{
    background-position:-110px -130px ;
}

#footer .timeline{
    position: relative;
    width:calc(100% - 330px);
    height:100%;
    /* background: #9966ff; */
    float:left;
}
#footer .timeline .slider{
    position: relative;
    width: calc(100% - 100px);
    height: 8px;
}
#footer .timeline .slider .slider-w{
    position: absolute;
    left: 50px;
    top: 22px;
    height: 8px;
    border-radius: 15px;
    background: #922222;
    z-index: 1;
}
#footer .timeline p{
    line-height: 50px;
    color:#999;
    width:50px;
    text-align: center;
    float:left;
    text-shadow: 0 1px 0 #121212;
}

#footer .timeline input[type="range"] {
    width:calc(100% - 100px);
    float:left;
    box-shadow: 0 1px 0 0px #424242, 0 1px 0 #060607 inset, 0px 2px 10px 0px black inset,
            1px 0px 2px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;
    margin-top: 22px;
    background-color: #272728;
    border-radius: 15px;
    -webkit-appearance: none;
    height:8px;
    cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb{
    -webkit-appearance: none;
    cursor: default;
    top: -5px;
    height: 20px;
    width: 20px;
    background: none repeat scroll 0 0 ;
    border-radius: 15px;
    /* box-shadow: 0 -1px 1px black inset; */
    cursor: pointer;
    z-index: 500;
}
input[type="range"]::-ms-track{
    background-clip: darkred;
}
input[type="range"]::-webkit-media-slider-thumb{
    background: darkred;
}
input[type="range"]::-ms-thumb{
    -webkit-appearance: none;
    cursor: default;
    border-radius: 4px;
    top: -5px;
    height: 8px;
    width: 12px;
    background: none repeat scroll 0 0 #777;
}
imput[type="range"]::-moz-range-progress{
    background: #922222;   
}
/* imput[type="range"]::-ms-fill-lower{
    background: rgba(146,34,34,0.8);
    background-size:20px;
} */
input[type="range"]::-webkit-slider-thumb:before {
    position: relative;
    left:0;
    top:0;
   width:500px;
    height:500px;
    background: red;
}
input[type="range"]::-webkit-slider-thumb:hover {
    height: 22px;
    width: 22px;
    /* box-shadow: 0 -2px 2px black inset;
    background: none repeat scroll 0 0 #7f7f7f; */
    z-index: 1000;
}
input[type="range"]:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

#footer .social{
    width:145px;
    height:100%;
    /* background: #ccc; */
    padding-left: 5px;
    float:left;
    padding-top: 13px;
    position: relative;
}
#footer .social .vol{
    position: absolute;
    top:-114px;
    left:9px;
    width:32px;
    height:113px;

}
#footer .social .vol .volBack{
    position: absolute;
    width:100%;
    height:100%;
    background:#303035;
    border:1px solid #354045;
    border-bottom: 0;
}

#footer .social .vol .volGroove{
    padding: 4px 0;
    top:7px;
    position: absolute;
    left:14px;
    width:6px;
    height:93px;
    background: rgba(6,7,9,0.6);
    box-shadow: 0 1px 0 0px #424242, 0 1px 0 #060607 inset, 0px 1px 3px 0px black inset,
    1px 0px 1px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;
    border-radius: 10px;
}
#footer .social .vol .currVol{
    position: absolute;
    bottom:0px;
    width: 6px;
    left:0px;
    background: #922222;
    overflow: hidden;
}
#footer .social .vol .volBtn{
    position: absolute;
    cursor: default;
    left:-6px;
    height: 18px;
    width: 18px;
    background: none repeat scroll 0 0 #666;
    border-radius: 15px;
    box-shadow: 0 -1px 1px black inset;
}
#footer .social .vol .volBtn:hover{
    height: 20px;
    width: 20px;
    box-shadow: 0 -2px 2px black inset;
    background: none repeat scroll 0 0 #7f7f7f;
}
#footer .social .item{
    margin-left: 5px;
}
.volume{
    width: 25px;
    height:25px;
    background-position: -2px -248px;
    float:left;
}
.volume:hover{
    background-position: -31px -248px;
}
.volume.mute{
    background-position:-104px -69px;
}
.volume.mute:hover{
    background-position:-126px -69px;
}
#footer .social .loop{
     width: 25px;
     height:25px;
     float:left;
 }
#footer .social .single{
    background-position: -66px -344px;
}
#footer .social .single:hover{
    background-position: -93px -344px;
}
#footer .social .listing{
    background-position: -3px -344px;
}
#footer .social .listing:hover{
    background-position: -33px -344px;
}
#footer .social .random{
    background-position: -66px -248px;
}
#footer .social .random:hover{
    background-position: -93px -248px;
}

#footer .social .local{
    width: 25px;
    height:25px;
    background-position: -88px -163px;
    float:left;
}
#footer .social .local:hover{
    background-position: -88px -189px;
}
#footer .social .lyric{
    width: 25px;
    height:25px;
    line-height: 25px;
    font-size: 14px;
    font-weight: bold;
    color:#999;
    float:left;
    text-decoration: none;
    text-align: center;
}
#footer .social .lyric:hover{
    color:#ccc;
}
.lyricBoard{
    color:#ccc;
    background: rgba(20,22,24,0.6);
    border:1px solid rgba(35,40,45,0.8);
    position: relative;
    width:250px;
    height:100%;
    text-align: center;
    overflow-y: auto;
    padding: 10px;
    float:right;
}
.lyricBoard div{
    margin-bottom: 16px;
    line-height:16px;
    font-size: 14px;
    color: #ccc;
    opacity: 0.7;
}
.lyricSlider div.play{
    color: #922222;
}
.lyricBoard div.play{
    color:#922222;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 8px;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    height:16px;
    border-radius: 4px;
    background-color: rgba(255,255,255,0.2);
}
::-webkit-scrollbar-thumb:hover{
    background-color: rgba(255,255,255,0.5);
}

.lyricControl{
    position: absolute;
    float:left;
    height:150px;
    width:15px;
}
.lyricControl div{
    position: relative;
    height:50px;
    width:100%;
    position: relative;
    height:60px;
    width:100%;
    color:white;
    text-align: center;
    color:rgba(146,34,34,0.8);
    line-height: 15px;
    font-size: 14px;
    writing-mode:vertical-lr;
    -ms-writing-mode:tb-rl;
    background: rgba(159,159,159,0.8);
    box-shadow: 0 -1px 1px black inset;
}
/* .fixBtn{


} */
.lyr{
    position:absolute;
    width:285px;
    height:80%;
    min-height:160px;
    max-height: 500px;
    top:60px;
    right:20px;
}
.noLyricTitle{
    position: relative;
    top:58px;
    font-size: 14px;
}
.noLyricUpload{
    position: relative;
    top:49px;
    text-decoration: underline;
    color:red;
}

.hide-enter-active, .hide-leave-active {
    transition: all .5s linear;
}
.hide-enter, .hide-leave-active {
    transition: all .5s linear;
}

.closePlayerBox{
    color:#fff;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 4px;
    background-color: #922222;
}
</style>
