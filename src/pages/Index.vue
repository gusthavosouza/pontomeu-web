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

import Api from "@/api/Api"

export default {
  data: () => ({
    loading: true,
    user: null
  }),
  created () {
  Api.getUser(5)
    .then(response => {
      this.user = response.data,
      this.loading = false
    })
    .catch(() => {
      alert("ERROR");
      this.loading = false;
    });
  }
}
</script>
