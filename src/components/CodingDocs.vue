<template>
  <p>
    <router-link to="/docs/html">Html</router-link> | 
    <router-link to="/docs/js">Js</router-link>
    <br />
  </p>
  <router-view></router-view>
</template>

<script>
  export default {
    name: "CodingDocs",
  };
</script>
