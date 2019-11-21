<template>
<v-app>
<v-navigation-drawer
  v-model="drawer"
  app
  clipped
>
  <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-navigation-drawer>

  <v-app-bar app clipped-left>
       <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
       <v-toolbar-title>Pontomeu</v-toolbar-title>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-content>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>

  <v-footer app>
    <!-- -->
    <span class="center">Pontomeu &copy; 2019</span>
  </v-footer>
  </v-app>
</template>

<script>

export default {
data: () => ({
  drawer: null,
  items: [
    { title: 'Dashboard', icon: 'mdi-view-dashboard' },
    { title: 'Photos', icon: 'mdi-image' },
    { title: 'About', icon: 'mdi-help-box' },
  ]
})
}

</script>
