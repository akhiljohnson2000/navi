<script>
export default {
  name: "App",
};

</script>

<style>
a {
  color: white !important;
}

body {
  color: white !important;
  background-color: #18514b !important;
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}

</style>

<template>
  <p>
    <!-- <router-link to="/docs">Docs</router-link> |
    <router-link to="/workout">Workouts</router-link> | 
    <router-link to="/cool-works">SomeCoolWorks</router-link>  -->
    <br />
  </p>
  <router-view></router-view>
</template>