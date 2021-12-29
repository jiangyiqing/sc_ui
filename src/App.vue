<template>
<div id="app">
    <div id="nav" v-if="$router.currentRoute.path !=='/game'"  style="color:white">
        <router-link to="/">Home</router-link> |
        <!-- <router-link to="/about">游戏</router-link> |
        <router-link to="/game">game</router-link> -->
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
</div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    // color: #2c3e50;
    // color: antiquewhite;
    // background-image: url("assets/sc-background.png");
    // background-repeat: repeat;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

body,
html {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;

}

body {
    background-image: url("assets/bg.jpg");
    background-repeat: repeat;
    width: 100%;
    min-height: 100%;
    color: beige;
    background-size: cover;
}
</style>
