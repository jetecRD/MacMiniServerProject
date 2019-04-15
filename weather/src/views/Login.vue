<template>
    <div id="app">
        <h1>Login</h1>
        <input id="acc" type="email" placeholder="example@email.com" @keyup="check" />
        <br/>

        <input id="pwd" type="password" placeholder="password" @keyup="check"/>
        <br/>
        <button>SignUp</button>
        <button id="login" @click="login" disabled="disabled">Login</button>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data: function() {
          return {
          }
        },
        methods: {
            login() {
                const account = document.getElementById("acc").value
                const password = document.getElementById("pwd").value
                this.$store.state.account = account
                this.$store.state.password = password
                this.$router.push({ name: 'weather' })
            },
            check(event) {
                const account = document.getElementById("acc")
                const password = document.getElementById("pwd")
                const regex_acc = (new RegExp(/^[\w.]+@\w+.com(\.\w+)?$/)).exec(account.value)
                const regex_pwd = (new RegExp(/^[\w.]{4,16}$/)).exec(password.value)
                const login = document.getElementById("login")
                if (regex_acc && regex_pwd) {
                    if (event.keyCode === 13) {
                        this.login()
                        return
                    }
                    account.style.outlineColor = ""
                    login.removeAttribute("disabled")
                }else {
                    account.style.outlineColor = regex_acc ? "" : "red"
                    login.setAttribute("disabled", "disabled")
                }
            }
        }
    }


</script>

<style scoped>
    #app {
        text-align: center;
        position: relative;
        top: 70px;
    }
    h1 {
        position: relative;
        margin: 0.22333in auto ;
    }

    input {
        width: 350px;
        height: 35px;
        border: 2px #909090 solid;
        border-radius: 5px;
        background-color: white;
        font-size: 17px;
    }
    input:first-of-type {
        margin: 5px auto 0;
    }
    input:last-of-type {
        margin: 10px auto 5px;
    }

    button {
        position: relative;
        width: 150px;
        height: 40px;
        border-radius: 5px;
        margin-top: 30px;
    }
    button:first-of-type {
        margin-right: 25px;
    }
    button:last-of-type {
        margin-left: 25px;
    }

</style>