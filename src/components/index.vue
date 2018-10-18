<template>
  <div>
      <app-car></app-car>
      <app-section></app-section>
  </div>
</template>
<script>
import carousel2 from './carousel2'
import section from './section'
export default {
  components: {
    "app-car":carousel2,
    "app-section":section,
  }
}
</script>
