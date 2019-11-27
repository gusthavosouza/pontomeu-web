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

    <div>
        <v-chip class="ma-2" color="pink" label text-color="white" justify-center absolute center top :style="{left: '50%', transform:'translateX(-50%)', top: '40%', position: 'absolute'}">
            Por favor selecione uma empresa para iniciar :)
        </v-chip>
    </div>
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
