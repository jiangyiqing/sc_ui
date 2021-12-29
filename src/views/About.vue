<template>
<div class="about">
    <h1>Solution Clash 化学挑战游戏</h1>

    <ow-row class="row " style="margin-top: 100px">
        <ow-content class="content">
            <img src="../assets/logo.png" width=400 />
          <div style="font-size:1.2rem; padding:15px">
            <p>这是一个基于中学化学知识的互动对战游戏</p>
            <p>运用你的化学知识，用化学魔法，完成你的挑战</p>
  </div>
        </ow-content>

    </ow-row>
    <ow-row class="row centerBox">
        <ow-content class="content">

        </ow-content>

    </ow-row>

    <!-- <ow-button type="primary"  class="startBtn" @click="toStartGame">开始游戏</ow-button> -->

</div>
</template>

<script>
import {
    mapMutations
} from "vuex"

export default {
    data() {
        return {
            playerA: "",
            playerB: ""
        }
    },
    methods: {
        toStartGame() {
            console.log("to start game")
            this.$store.state.playerName.a = this.playerA
            this.$store.state.playerName.b = this.playerB
            this.$router.push("game")
        }
    }
}
</script>

<style scoped>
.centerBox {
    text-align: center;
    padding-left: 0;
    padding-right: 0;
    padding-top: 20px
}

.startBtn {
    margin-top: 20px;
    font-size: 2rem;
    padding: 2rem;
}
</style>
