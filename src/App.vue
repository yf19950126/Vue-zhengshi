<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.el-aside{
  z-index: 1;
}
.content{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
}
@media screen and (max-width:480px){
  /*.ads {*/
    /*display:none;*/
  /*}*/
}
</style>
