<template>
    <button @click="push">{{title}}</button>
</template>

<script>
    export default {
        name: "router-button",
        data: function () {
            return {}
        },
        methods: {
            push() {
                if (this.path === "/" && !window.confirm("Do you want to sign out?")) {
                    return
                }
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