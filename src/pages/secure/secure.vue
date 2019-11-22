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
</div>

</template>

<script>

export default {
    name: 'Secure',
    mounted: function () {
    },
    data: () => ({
        overlay: false
    }),
    
}

</script>
