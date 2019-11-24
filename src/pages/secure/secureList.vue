<style>

.results {
    width: 300px;
    margin: 0 auto;
    text-align: left;
    background: #eee;
    padding: 10px;
}

</style>

<template>

<div>
    <loader-spinner ref="spinner" :show="overlay" />

    <div v-if="items">

    <v-list shaped>
          <v-subheader>REPORTS</v-subheader>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

    </div>

    <div class="text-center" align-center justify-center v-else>
        <h1> Nenhum registro encontrado! </h1>
    </div>
</div>

</template>

<script>

import {
    logdaywork
}
from '@/services/logdaywork'

export default {
    name: 'SecureList',
    mounted: function() {
      this.loadWorkDay();
    },
    data: () => ({
        overlay: false,
        items: null,
        error: false
    }),
    methods: {
        loadWorkDay() {
          this.overlay = true;
          logdaywork.loadDayWork(this.$route.params.id).then(response => {
              this.overlay = false
              if (response.code == 200) {
                  this.items = response.data.results;
              }

          }).catch(() => {
              this.overlay = false
          });
        }
    }

}

</script>
