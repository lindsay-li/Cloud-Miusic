import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const GET_PLAYLIST ='GET_PLAYLIST'
const GET_TOPLIST = 'GET_TOPLIST'
const GET_HIGHQUALITY='GET_HIGHQUALITY'
const GET_PLAYLISTDETAIL='GET_PLAYLISTDETAIL'
const GET_SEARCH='GET_SEARCH'
const GET_SONGDETAIL='GET_SONGDETAIL'
const GET_SONGURLIMG='GET_SONGURLIMG'
const EMPTY = 'EMPTY'

const store =new Vuex.Store({

    state:{
        playList:{},
        topList:[],
        highQuality:{},
        playListDetail:{},
        Search:{},
        heightIs:'none',
        isLogin:false,
        playLisTs:[],
        songDetail:{},
        isSong:0,
        isplaylist:0
    },
    getters:{
        playList(state){
            return state.playList
        },
        topList(state){
            return state.topList
        },
        highQuality(state){
            return state.highQuality
        },
        playListDetail(state){
            return state.playListDetail
        },
        Search(state){
            return state.Search
        },
        heightIs(state){
            return state.heightIs
        },
        songDetail(state){
            return state.songDetail
        }
    },
    actions:{
        getPlaylist({commit,state}){
            axios.get('/personalized',{
                xhrFields: {
                withCredentials: true
                }
            })
            .then((res)=>{
                if(res.data.code==200){
                    commit(GET_PLAYLIST,res.data.result.slice(0,8))
                }
            })
        },
        getToplist({commit,state},idex){
            let arr=[]
            for(let i in idex){
            axios.get("/top/list",{
                xhrFields: {
                withCredentials: true
                },
                params:{
                    idx:idex[i]
                }
            })
            .then((res)=>{
                if(res.data.code==200){
                    arr.push(res.data.playlist)
                    commit(GET_TOPLIST,arr)
                }
                
            })
        }
        },
        getHighquality({commit,state},type){
            commit(EMPTY,{})
            axios.get("/top/playlist/",{
                xhrFields: {
                withCredentials: true
                },
                params:{
                    order:type.order,
                    cat:type.cat,
                    limit:type.limit,
                    offset:type.offset
                }
            })
            .then((res)=>{
                // console.log(res)
                if(res.data.code==200){
                    commit(GET_HIGHQUALITY,res.data)
                }
            })
        },
        getPlaylistDetail({commit,state},id){
            axios.get("/playlist/detail",{
                xhrFields: {
                withCredentials: true
                },
                params:{
                    id:id.id
                }
            })
            .then((res)=>{
                if(res.data.code==200){
                    commit(GET_PLAYLISTDETAIL,res.data)
                }
            })
        },
        getSimiPlaylist({commit,state},id){
            axios.get("/personalized",{
                xhrFields: {
                withCredentials: true
                },
                params:{
                    // id:2120602346
                }
            })
            .then((res)=>{
                // console.log(res)
                if(res.data.code==200){
                
                }
            })
        },
        getSearch({commit,state},type){
        axios.get('/search',{
                xhrFields: {
                withCredentials: true
                },
                params:{
                    keywords:type.kword,
                    type:type.type
                }
                }).then((res)=>{
                    // console.log(res)
                    if(res.data.code==200){
                        commit(GET_SEARCH,res.data)
                    }
                })
        },
        getSongdetail({commit,state},id){
            axios.get('/song/detail',{
                xhrFields: {
                withCredentials: true
                },
                params:{
                    ids:id.id
                }
                }).then((res)=>{
                    if(res.data.code==200){
                    commit(GET_SONGDETAIL,res.data)  
                    }
                })
        }
    },
    mutations:{
        [GET_PLAYLIST](state,data){
            state.playList=data
        },
        [GET_TOPLIST](state,data){
            state.topList=data
        },
        [GET_HIGHQUALITY](state,data){
            state.highQuality=data
        },
        [GET_PLAYLISTDETAIL](state,data){
            state.playListDetail=data
            state.isplaylist++
        },
        [GET_SEARCH](state,data){
            state.Search=data
        },
        [GET_SONGDETAIL](state,data){
            state.songDetail=data
            state.isSong++
        },
        showHeight:state=>{
            state.heightIs='block'
        },
        hideHeight:state=>{
            state.heightIs='none'
        },
        showLogin:state=>{
            state.isLogin=true
        },
        hideLogin:state=>{
            state.isLogin=false
        },
        pushSong:(state,data)=>{
            var songs=data;
            for(var i=0;i<songs.length;i++){
                state.playLisTs.unshift(songs[i])
            }    
        },
        unshiftSong:(state,data)=>{
            state.playLisTs.unshift(data)
        },
        //离开当前页面后执行
        destroyed_: (state,data)=> {
            state.playListDetail = {};
        },
        [EMPTY](state,data){
            state.highQuality = data;
        },
        songDetail_:(state,data)=>{
            state.songDetail = {};
        }
    },
})
export default store