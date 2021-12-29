<template>
<div class="about">
    <h1>Solution Clash 化学挑战游戏</h1>

    <ow-content class="content" style="font-size: 1.5rem">
        <img src="../assets/logo.png" width=400 />
        <p>这是一个基于中学化学知识的互动对战游戏</p>
        <p>运用你的化学知识，用化学魔法，完成你的挑战</p>
    </ow-content>
    <ow-row class="row " style="margin-top: 100px">

        <ow-content class="content">
            <label>
                玩家 A 昵称
                <ow-input v-model="playerA"></ow-input>
            </label>
        </ow-content>

    </ow-row>

    <ow-row class="row centerBox">
        <ow-content class="content">

            <label>
                玩家 B 昵称
                <ow-input v-model="playerB"></ow-input>
            </label>
        </ow-content>

    </ow-row>

    <ow-button type="primary" class="startBtn" @click="toStartGame">开始游戏</ow-button>
    <div>
        <h2>你将会从以下卡牌中随机得到8张进行游戏 <br/>
                HCl NaOH Ca(OH)2 CaCO3 CuSO4.5H2O NH3.H2O H2S BaSO4 CuSO4 AgCl H2SO4 NaCl Na2SO3 Na
        </h2>
    </div>
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
            if (this.playerA === "" || this.playerB === "") {
                alert("请输入玩家昵称")
            } else {
                this.$store.state.playerName.a = this.playerA
                this.$store.state.playerName.b = this.playerB
                this.$router.push("game")
            }
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
