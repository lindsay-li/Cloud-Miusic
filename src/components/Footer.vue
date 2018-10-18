<template>
  <div class="footer">
      <div class="serve">
          <div class="copy">
              <p>
                  <a href="">关于本站</a>
                  <span>|</span>
                  <a href="">网站说明</a>
                  <span>|</span>
                  <a href="">联系作者</a>
                  <span>|</span>
                  <a href="">索要源码</a>
                  <span>|</span>
                  <a href="">意见反馈</a>
              </p>
              <p class="state">
                  本站所有音乐及视频资源归网易&copy;版权所有 本站不含任何盈利性质 如需转载请备注说明
              </p>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name:"app-footer",
  data(){
      return{}
  }
}
</script>
<style scoped>
    .footer{
        height: 140px;
        overflow: hidden;
        border-top: 1px solid #d3d3d3;
        background: #f2f2f2;
    }
    .footer>.serve{
        width: 980px;
        margin: 0 auto;
    }
    .footer>.serve>.copy{
        width: 100%;
        padding-top:35px; 
        line-height:24px; 
    }
    .serve>.copy>p{
        text-align: center;
    }
    .serve>.copy>p>a{
        color: #999;
        font-size: 12px;
    }
    .serve>.copy>p>a:hover{
        text-decoration: underline;
    }
    .serve>.copy>p>span{
        margin:  0 8px 0 10px;
        color: #c2c2c2;
        font-size: 12px;
    }
    .serve>.copy>.state{
        color: #666;
        font-size: 12px;
    }
</style>
