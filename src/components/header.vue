<template>
  <div class="nav">
      <div class="nav-top">
          <div class="nav-right">
            <a href="javascript:;" class="nav-login" @click.prevent="logined">登录</a>
            <a href="" class="nav-register">注册</a>
          </div>
      </div>
      <div class="nav-wrap">
          <div class="nav-primary">
              <div class="nav-logo">
                  <a href=""></a>
              </div>
              <div class="nav-search">
                  <div class="inp">
                      <input type="text" maxlength="30" placeholder="音乐、视频、电台、用户" v-model="kword" @keyup="getData($event)" @focus="handleFocus" @blur="hide" @keydown.down="changeDown" @keyup.enter="searchKwords">
                  </div>
                  <div class="inp-btn">
                      <input type="button" @click.prevent="searchKwords">
                  </div>
              </div>
              <div class="search-list"  v-show="dynamic">
                  <div class="search-result">
                      <p class="note">
                          <a href="" class="tag">搜“<span>{{kword}}</span>”相关用户</a>
                      </p>
                      <div class="rap">
                          <div class="itm" v-show="result.songs !== undefined">
                              <h3 class="hd">
                                  <i class="icn-1"></i>
                                  <em>单曲</em>
                              </h3>
                              <ul>
                                  <li v-for="(song,index) in result.songs">
                                      <router-link :to="'/songDetail/'+song.id">{{song.name}}<span v-for="arts in song.artists">-{{arts.name}}&nbsp;</span>
                                      </router-link>
                                  </li>
                              </ul>
                          </div>
                          <div class="itm" v-show="result.artists !== undefined">
                              <h3 class="hd">
                                  <i class="icn-2"></i>
                                  <em>歌手</em>
                              </h3>
                              <ul>
                                  <li v-for="(artist,index) in result.artists">
                                      <!-- <a :href="artist.id">{{artist.name}}</a> -->
                                      <router-link to="/singer">{{artist.name}}</router-link>
                                  </li>
                              </ul>
                          </div>
                          <div class="itm" v-show="result.albums !== undefined">
                              <h3 class="hd">
                                  <i class="icn-3"></i>
                                  <em>专辑</em>
                              </h3>
                              <ul>
                                  <li v-for="album in result.albums">
                                      <!-- <a :href="album.id">{{album.name}}<span>-{{album.artist.name}}</span></a> -->
                                      <router-link to="/singer">{{album.name}}<span>-{{album.artist.name}}</span></router-link>
                                  </li>
                              </ul>
                          </div>
                          <div class="itm" v-show="result.mvs !== undefined">
                              <h3 class="hd">
                                  <i class="icn-4"></i>
                                  <em>视频</em>
                              </h3>
                              <ul>
                                  <li v-for="mv in result.mvs">
                                      <!-- <a :href="mv.id">MV:{{mv.name}}<span>-{{mv.artistName}}</span></a> -->
                                      <router-link to="/singer">MV:{{mv.name}}<span>-{{mv.artistName}}</span></router-link>
                                  </li>
                              </ul>
                          </div>
                          <div class="itm" v-show="result.playlists !== undefined">
                              <h3 class="hd">
                                  <i class="icn-5"></i>
                                  <em>歌单</em>
                              </h3>
                              <ul>
                                  <li v-for="playlist in result.playlists">
                                      <router-link :to="'/playlist_detail/'+playlist.id">{{playlist.name}}</router-link>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="nav-secondary">
          <div class="nav-items">
              <ul>
                  <li><router-link to="/index">推荐</router-link></li>
                  <li><router-link :to="'/toplist/'+3">排行榜</router-link></li>
                  <li><router-link to="/playlist">歌单</router-link></li>
                  <li><router-link to="/anchor">主播电台</router-link></li>
                  <li><router-link to="/singer">歌手</router-link></li>
                  <li><router-link to="/newCD">新碟上架</router-link></li>
              </ul>
          </div>
      </div>
      <div class="mask-login" v-if="isLogin">
          <div class="mode">
              <div class="tel">手机号登录</div>
          </div>
          <div class="m-content">
              <div class="c-login">
                  <div class="utel">
                      <a href="javascript:;">+86</a>
                      <input type="text" placeholder="请输入手机号" maxlength="12">
                  </div>
                  <div class="upwd">
                      <input type="password" placeholder="请输入密码">
                  </div>
                  <div class="auto">
                      <label>
                          <input type="checkbox">自动登录
                      </label>
                      <a href="">忘记密码？</a>
                  </div>
                  <div class="login">
                      <a href="">
                          <i>登&nbsp;&nbsp;&nbsp;录</i>
                      </a>
                  </div>
              </div>
              <div class="c-register">
                  <a href="">没有帐号？免费注册&nbsp;&nbsp;></a>
              </div>
          </div>
          <span class="off" title="关闭登录" @click="off">x</span>
      </div>
      <div class="mask" v-if="isLogin"></div>
  </div>
</template>
<script>
export default {
  name:"app-header",
  data () {
      return {
        kword:"",
        dynamic:false,
        now:-1,
        result:{"songs":[],"aibums":[],"artists":[],"mvs":[],"playlists":[]},
        mask:false
      }
  },
  methods:{
      getData(e){
        if(e.keyCode==38 || e.keyCode==40) return;
        this.$http.get('/search/suggest',{
        xhrFields: {
        withCredentials: true
        },
        params:{
            keywords:this.kword
        }
    }).then((res)=>{
        if(res.data.code==200){
            this.result=res.data.result
        }
    })
        this.dynamic=true;
        if(this.kword == ''){
            this.dynamic=false;
        };
        if(JSON.stringify(this.result) == '{}'){
            this.dynamic=false;
        }
      },
      searchKwords:function(){
        this.$router.push({path: '/Search/result/' + this.kword})
      },
      hide:function(){
          document.addEventListener('click', (e) => {
            // console.log(e.target);
        // if (!this.$el.contains(e.target)){
        //     this.isShowDialog = false; 
        //         }
           
                if(!this.$el.contains(e.target)){
                    this.dynamic=false;
                }
         })
        //   this.dynamic=false;   
      },
      handleFocus:function(){
                if(this.kword ==''){
                    this.dynamic=false;
                }else{
                    this.dynamic=true;
                }
      },
      logined:function(){
        //   this.mask=true;
          this.$store.commit('showLogin')
      },
      off:function(){
        //   this.mask=false;
          this.$store.commit('hideLogin')
      },
  },
    computed:{
        isLogin(){
            return this.$store.state.isLogin
        }
    }
}
</script>
<style scoped>
.nav{
    background-color: #f0f3ef;
    position: relative;
    width: 100%;
    /* margin-bottom: 40px; */
    border-bottom: 1px solid #e2e2e2;
}
.nav .nav-top{
    height: 28px;
    background-color: #242424;
    margin-bottom: 10px;
}
.nav .nav-top .nav-right{
    float: right;
    margin: 0 12px 0 0;
    line-height: 28px;
}
.nav-top .nav-right a{
    display: inline-block;
    padding: 0 12px;
    height: 28px;
    color: #fff;
    font-size: 12px;
}
.nav-top .nav-right a:hover{
    text-decoration: underline;
}
.nav .nav-wrap{
    border-bottom: 1px solid #e5ebe4;
}
.nav-wrap .nav-primary{
    width: 980px;
    margin: 0 auto;
    position: relative;
    padding: 10px 0 5px;
}
.nav-primary .nav-logo{
    float: left;
    height: 59px;
    width: 170px;
    margin: 0 13px 0 0;
}
.nav-primary .nav-logo a{
    display: block;
    width: 100%;
    height: 100%;
    background: url("../assets/cloud-logo.png") no-repeat;
}
.nav-primary .nav-search{
    margin-left: 145px;
    padding: 10px 0 15px 0;
}
.nav-search .inp{
    float: left;
    width: 470px;
    height: 34px;
    text-align: center;
    margin-right: -3px;
    cursor: text;
    background: url("../assets/nav_mu_bg.png") no-repeat;
}
.nav-search .inp input{
    background: #fff;
    width: 96%;
    margin: 0;
    text-align: left;
    height: 30px;padding-left: 10px;
    outline: none;
    border: none;
}
.nav-search .inp-btn{
    float: left;
    width: 37px;
    height: 32px;
    overflow: hidden;
}
.nav-search .inp-btn input{
    width: 100%;
    height: 100%;
    padding: 32px 0 0 0;
    overflow: hidden;
    cursor: pointer;
    border: none;
    border-radius:0 3px 3px 0;
    background: url("../assets/search1.png") no-repeat;
    background-color: #C10D0C;
    background-size: 70%;
    background-position: 5px 3px;
}
.nav-search:after {
    content: '\0020';
    display: block;
    clear: both;
}
.nav .nav-secondary{
    width: 980px;
    margin: 0 auto;
    overflow: hidden;
}
.nav-secondary .nav-items{
    font-size: 14px;
}
.nav-secondary .nav-items ul{
    margin: 9px 0;
}
.nav-secondary .nav-items li{
    display: inline;
    margin-right: 25px;
    font-weight: bold;
}
.nav-secondary .nav-items li a:link{
    color: #555d53;
    text-decoration: none;
}
.nav-secondary .nav-items li a:hover{
    color: #C10D0C;
}
.nav-secondary .nav-items li a.active{
    color: #fff;
    padding: 3px 5px;
    font-weight: normal;
    font-size: 12px;
    border-radius: 7px;
    background-color: #C10D0C;
}
a:visited{
    color: #555d53;
    text-decoration: none;
}
.nav-primary .search-list{
    position: absolute;
    top:52px;
    left: 183px;
    width: 469px;
    z-index: 120;
    box-sizing: border-box;
    border: 1px solid #bebebe;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 4px 7px #555;
    text-shadow: 0 1px 0 rgba(255,255,255,0.9);
    border-top: 0;
}
.search-result .note{
    height: 17px;
    padding: 11px 10px;
    border-bottom: 1px solid #e2e2e2;
}
.search-result .note .tag{
    color: #3879D9;
    font-size: 14px;
}
.note .tag>span{
    color: #666;
    font-size: 14px;
}
.search-result .hd{
    float: left;
    width: 62px;
    padding: 10px 0 0 10px;
    line-height: 17px;
    font-weight: normal;
    color: #333;
}
.search-result .hd>i{
    float: left;
    display:block;
    margin: 1px 5px 0 0;
    width: 14px;
    height: 15px;
    background: url("../assets/icon.png") no-repeat;
}
.search-result .hd em{
    float: left;
    font-style: normal;
    text-align: left;
    font-size: 14px;
}
.search-result .hd>.icn-1{
    background-position:-35px -300px;
}
.search-result .hd>.icn-2{
    background-position: -50px -300px;
}
.search-result .hd>.icn-3{
    background-position: -35px -320px;
}
.search-result .hd>.icn-4{
    background-position: -60px -862px;
}
.search-result .hd>.icn-5{
    background-position: -50px -320px;
}
.search-result ul{
    float: left;
    width: 390px;
    margin-top: -1px;
    padding: 6px 0 5px;
    border-bottom: 1px solid #e2e2e2;
    border-left: 1px solid #e2e2e2;
}
.search-result ul li{
  float: left;
  width: 100%;
  font-size: 14px;
}
.search-result ul li:hover{
    background-color: #e2e2e2;
}
.search-result ul li a{
    display: block;
    width: 100%;
    text-indent: 12px;
    line-height: 24px;
    color: #3879D9;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    white-space: nowrap;
}
.search-result ul li a>span{
    color: #666;
}
.nav .mask-login{
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left:-265px;
    margin-top:-157px;  
    width: 530px;
    border-radius: 4px;
    box-shadow: 0 5px 16px rgba(0,0,0,0.8);
    border: none;
    background: #fff;
    z-index: 3002;
}
.nav .mode{
    position: relative;
    border-bottom: 1px solid #191919;
    border-radius: 4px 4px 0 0;
    background: #2d2d2d;
}
.nav .mode>.tel{
    padding-right: 45px;
    height: 38px;
    line-height: 38px;
    padding-left: 18px;
    border-radius: 3px 3px 0 0;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
}
.nav .m-content{
    border: 1px solid #878787;
    border-width: 0 1px 1px;
    border-radius: 0 0 4px 4px;
    background: #fff;
}
.m-content .c-login{
    padding: 30px 0 43px;
    width: 220px;
    margin: 0 auto;
}
.m-content .c-login .utel{
    position: relative;
    height: 30px;
    border: 1px solid #cdcdcd;
    border-radius: 2px;
    z-index: 10;
}
.c-login .utel>a{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 18px 0 5px;
    border-right: 1px solid #cdcdcd;
    color: #333;
    font-size: 12px;
}
.c-login .utel>input{
    display: inline-block;
    width: 151px;
    padding: 5px 8px 5px;
    height: 20px;
    line-height: 20px;
    border: none;
    font-size: 12px;
    color: #333;
    outline: none;
}
.m-content .c-login .upwd{
    margin-top: 10px;
}
.c-login .upwd>input{
    width: 206px;
    height: 19px;
    padding: 5px 6px 6px;
    border: 1px solid #cdcdcd;
    border-radius: 2px;
    line-height: 19px;
    font-size: 12px;
    color: #333;
    outline: none;
}
.m-content .c-login .auto{
    margin-top: 10px;
}
.c-login .auto label{
    color: #666;
    font-size: 12px;
}
.c-login .auto input{
    vertical-align: middle;
}
.c-login .auto a{
    color: #666;
    font-size: 12px;
    margin-left:83px; 
}
.c-login .auto a:hover{
    color: #3879D9;
}
.m-content .c-login .login{
    margin-top: 20px;
}
.c-login .login a{
    display: inline-block;
    width: 215px;
    padding: 0 5px 0 0;
    height: 31px;
    line-height: 31px;
    overflow: hidden;
    vertical-align: top;
    text-align: center;
    background: url("../assets/button2.png") no-repeat;
    background-position: right -388px;
}
.c-login .login i{
    color: #fff;
    font-style: normal;
    font-size: 12px;
}
.m-content .c-register{
    padding: 0 19px;
    height: 48px;
    border-top: 1px solid #c6c6c6;
    border-radius: 0 0 4px 4px;
    line-height: 48px;
    background-color: #f7f7f7;
    text-align: right;
}
.m-content .c-register a{
    font-size: 12px;
    color: #999;
}
.m-content .c-register a:hover{
    color: #3879D9;
    text-decoration: underline;
}
.mask-login .off{
    position: absolute;
    z-index: 20;
    top: 10px;
    right: 15px;
    width: 10px;
    height: 10px;
    cursor: pointer;
    color: #ccc;
}
.nav .mask{
    z-index: 3001;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #7B7B7B;
    opacity: 0.5;
}
</style>
