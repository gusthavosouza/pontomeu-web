<template>

<v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense>
        <v-list-item v-for="item in drawerItems" :key="item.title" link>
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</v-navigation-drawer>

</template>

<script>

  export default {
    props: ['drawerItems', 'drawer'],
    name: 'CustomDrawer',
    data: () => ({
      // drawer: null
    })

  }

</script>
