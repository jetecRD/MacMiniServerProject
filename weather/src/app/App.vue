<template>
    <div id="app">
        <div id="bar">
            <button class="flow-left bar_btn" id="sidebar_control" type="button" @click="bar_action">
                <img style="width: 50px; height: 50px" src="../assets/sidebar.png"/>
            </button>
            <button class="flow-right bar_btn" id="reload"  type="button">
                reload
            </button>
            <div class="title">
            <h1>{{title}}</h1>
            </div>
        </div>
        <div class="sidebar" id="sidebar">
            <router-button path="/" title="Home"></router-button>
            <router-button path="/about" title="About"></router-button>
            <!--<button @click="getData">aaa</button>-->
        </div>
        <router-view/>
    </div>
</template>

<script>
    import RouterButton from "../router/router-button";

    export default {
        components: {RouterButton},
        data: function() {
            return {
                title: "三十六小時天氣預報"
            }
        },
        methods: {
            bar_action: barAction,
        }
        ,
        mounted() {
        }
    }


    function barAction() {
        const bar = document.getElementById("sidebar_control");
        if (bar.getAttribute("status") == null) {
            bar.setAttribute("status", "true");
        }
        const status = bar.getAttribute("status");

        if (status === "true") {
            showBar();
            return
        }
        hideBar();
    }

    function showBar() {
        const bar = document.getElementById("sidebar_control");
        const view = document.getElementById("sidebar");
        bar.setAttribute("status", "false");
        if (view.classList.contains("sidebar_hide")) {
            view.classList.remove("sidebar_hide")
        }
        view.classList.add("sidebar_show")
    }

    function hideBar() {
        const bar = document.getElementById("sidebar_control");
        const view = document.getElementById("sidebar");
        bar.setAttribute("status", "true");
        if (view.classList.contains("sidebar_show")) {
            view.classList.remove("sidebar_show")
        }
        view.classList.add("sidebar_hide")
    }


</script>

<style>
    @import "style.css";
</style>


