<template>
    <div class="scroll" @click="backTop">
    </div>
</template>
<script>
 $(window).scroll(()=>{
    var scrollTop=$(window).scrollTop()
    var $scroll=$('.scroll')
    if(scrollTop>=360){
        $scroll.show()
    }else{
        $scroll.hide()
    }
})
export default {
    name:"app-scroll",
    methods:{
        backTop:function(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
    }
}
</script>
<style scoped>
.scroll{
    width: 49px;
    height: 44px;
    position: fixed;
    bottom: 150px;
    right: 12%;
    cursor: pointer;
    background: url("../assets/sprite.png") no-repeat ;
    background-position: -265px -47px;

}

</style>
