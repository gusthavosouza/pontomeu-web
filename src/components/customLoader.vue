

<template>

<v-overlay :value="show">
    <div class="text-center">
        <v-progress-circular indeterminate color="primary" :size="50" :width="5"></v-progress-circular>
    </div>
</v-overlay>

</template>

<script>

export default {
    props: ['show'],
    data: () => ({
        // overlay: false
    }),
    methods: {
        showOverlay() {
                // this.overlay = true;
            },

            hideOverlay() {
                // this.overlay = false;
            }
    },
    name: 'CustomLoader'
}

</script>
