<template>
  <p>
    <router-link to="/docs/html">Html</router-link> | 
    <router-link to="/docs/css">CSS</router-link> | 
    <router-link to="/docs/es6">ES6</router-link> | 
    <router-link to="/docs/js">Js</router-link> |
    <router-link to="/docs/angular">Angular</router-link> |
    <router-link to="/docs/comparision">Frameworks Comparision</router-link> |
    <router-link to="/docs/comparision">Version Control (Git, GitHub)</router-link> |
    <router-link to="/docs/comparision">Package Manager (NPM, Yarn)</router-link> | 
    <router-link to="/docs/react">React </router-link> | 
    <router-link to="/docs/nextJs">Next JS </router-link> | 
    <router-link to="/docs/testing">Testing </router-link>
    <router-link to="/docs/deployment">Deployment </router-link>
    <router-link to="/docs/general">General </router-link>
    <br />
  </p>
  <router-view></router-view>
</template>

<script>
  export default {
    name: "CodingDocs",
  };
</script>
