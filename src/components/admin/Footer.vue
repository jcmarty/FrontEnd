<template>
<footer>
  <div class="pull-right">
    <strong>{{systemTitle}}</strong>. Developed by <a rel="students">COMTEQ students</a> | 2020
  <!-- <p style="float:right;">copyright@CCBC</p> -->
  </div>
  <div class="clearfix"></div>
</footer>
</template>
<script>
export default {
    name: 'Login',
    data() {
      return {
        systemTitle: this.$store.state.systemTitle,
      }
    }
}
</script>
