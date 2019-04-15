<template>
    <div class="home">
        <div id="bar">
            <button class="flow-left bar_btn" id="sidebar_control" type="button" @click="show_hide">
                <img style="width: 50px; height: 50px" src="../assets/sidebar.png"/>
            </button>
            <button class="flow-right bar_btn" id="reload" type="button" @click="reload">
                <img style="width: 50px; height: 50px" src="../assets/reload.png"/>
            </button>
            <div class="title">
                <h1>{{title}}</h1>
            </div>
        </div>
        <div class="sidebar" id="sidebar">
            <!-- eslint-disable-next-line -->
            <router-button v-for="p in route" :path="p.path" :title="p.title" ></router-button>
        </div>
        <router-view/>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    import RouterButton from "../router/router-button";
    import * as actions from "../store/action"
    import Vue from 'vue'
    // import {mapState} from 'vuex'
    export default {
        name: 'home',
        data: function () {
            return {
                route: [
                    {path: "/home", title: "Home"},
                    {path: "/about", title: "About"},
                    {path: "/", title: "Logout"}
                ],
                title: "三十六小時天氣預報",
                current: () => {
                    console.log(this.$router.currentRoute.path)
                    return this.$router.currentRoute.path
                }
            }
        },
        components: {
            RouterButton,
        },
        methods: {
            show_hide: bar_action,
            reload: getWeather
        },
        mounted() {
            getWeather()
        }
    }

    function bar_action() {
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

    function getWeather() {
        const vue = new Vue()
        vue.$http.get("https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=rdec-key-123-45678-011121314&format=JSON")
            .then(
                response => {
                    let data = response.body.cwbopendata.dataset.location
                    let a = []
                    for (let i of data) {
                        let m = {}
                        m["locationName"] = i.locationName
                        //
                        m["elementKeys"] = i.weatherElement.map($0 => $0.elementName)
                        //
                        m["weatherElement"] = {}
                        for (let e of i.weatherElement) {
                            m.weatherElement[e.elementName] = e.time
                        }

                        a.push(m)
                    }
                    console.log(a)
                    actions.setWeather(a)
                },
                () => {
                    actions.setWeather("")
                })
    }
</script>

<style scoped>
@import "style.css";

</style>