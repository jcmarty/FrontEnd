<template>
  <div class="hello">
    <h1>(404) Page NotFound</h1>
  </div>
</template>

<script>
export default {

  beforeMount(){
    if(!this.$store.getters.isAuthenticated){
      this.$router.replace("/admin/login");
    }
    else {
      this.$router.replace("/admin");
    }
  }
};
</script>
