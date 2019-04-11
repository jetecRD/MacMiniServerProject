<template>
    <button  @click="action">{{title}}</button>
</template>

<script>
    export default {
        name: "router-button",
        data: function() {
            return {}
        },
        methods: {
            action: function () {
                this.$router.push(this.path)
            }
        },
        props: {
            path: String,
            title: String
        }
    }
</script>

<style scoped>

</style>