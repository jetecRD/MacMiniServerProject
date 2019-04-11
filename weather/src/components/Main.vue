<template>
    <div class="main">
        <h1 class="title">{{title}}</h1>
        <div class="" id="contentText">
            <button class="count_btn" type="button" v-on:click="plus">{{button_plus}}</button>
            <button class="count_btn" type="button" v-on:click="minus">{{button_minus}}</button>
            <p>{{msg}}: {{count}}</p>
            <div style="text-align: left">
                {{weather}}
            </div>
        </div>
    </div>
</template>

<script>

    import * as actions from "../store/action";
    import {mapState} from 'vuex';

    const computed = mapState({count: "count", msg: "msg", weather: "weather"});


    export default {
        name: "Main",
        props: {
            title: String,
            button_plus: String,
            button_minus: String
        },
        data: function () {
            return {}
        },
        methods: {
            plus: actions.plus,
            minus: actions.minus
        },
        computed: computed
    }





</script>

<style scoped>

    .main {
        text-align: center;
    }

    .main .title {
        position: relative;
        color: #6db9fd;
        margin-top: 70px;
    }

    .border-blue {
        border: 1px blue solid;
    }

    .count_btn {
        width: 100px;
        height: 60px;
        border-radius: 5px;
        margin: 5px 5px 0 5px;
    }

    #contentText {
        position: relative;
        margin: auto;
        width: 400px;
        height: 300px;
    }

    #contentText p {
        color: #ff0000;
    }

</style>