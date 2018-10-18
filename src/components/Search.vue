<template>
<div>
  <app-header></app-header>
  <router-view></router-view>
  <app-footer></app-footer>
  </div>
</template>
<script>
import header from '../components/header'
import Footer from '../components/Footer'
export default {
  components:{
      "app-header":header,
      "app-footer":Footer
  }
}
</script>
