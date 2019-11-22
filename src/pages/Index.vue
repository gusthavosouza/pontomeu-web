<template>
  <div class="section">
    <p v-if="loading" class="notification is-info">
      Loading
    </p>

    <template v-else>
      <h1 class="title">Welcome {{ user.name }}</h1>
    </template>
  </div>
</template>

<script>

import { user } from "@/services/user"

export default {
  data: () => ({
    loading: true,
    user: null
  }),
  created () {
  user.getUser()
    .then(response => {
      this.user = response.data,
      this.loading = false
    })
    .catch(() => {
      this.loading = false;
    });
  }
}
</script>
