<template>

<!-- App.vue -->
<v-app>
  <component :is="layout">
    <router-view />
  </component>

</v-app>
</template>

<style>
  .center {
    margin: 0 auto;
    text-align: left;
  }
</style>

<script>

const default_layout = "default";

export default {

computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  created() {
    // add some stuff here
  },
  updated() {
    // we can add some stuff here
  },

  name: 'App',

  components: {
    // no need
  }
};
</script>
