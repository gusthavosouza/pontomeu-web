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

  },
  updated() {

  },

  name: 'App',

  components: {

  },
  data: () => ({
    drawer: null,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' },
    ]
  })
};
</script>
