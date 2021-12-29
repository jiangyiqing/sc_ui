<template>
<ow-layout class="layout">
    <ow-header class="header">
        <h1>🪄 Solution Clash化学溶液竞技场</h1>
    </ow-header>
    <ow-layout>
        <ow-content class="content">
            <ow-row class="row">
                <!-- 玩家1 -->
                <ow-col :pc="{span: 8}">
                    <ow-hero url="http://bbbot-public-image.s3.cn-northwest-1.amazonaws.com.cn/avatar0.png" size="large"></ow-hero>
                    <!-- <ow-blood totalTextColor="#FFC429" residualTextColor="#909399" residualColor="#3B9CE1" goneColor="#909399" :total="150" :residual="120"></ow-blood> -->
                    <ow-row class="row">
                        <ow-content class="content heroName">
                            玩家昵称 : {{players[0].name}}
                            <p>
                                金币: {{players[0].credit}}
                            </p>
                            <!-- <p>
                                水量: {{players[0].water}}
                            </p> -->
                            <p>
                                pH: {{players[0].pH}}
                            </p>
                        </ow-content>
                    </ow-row>
                    <ow-row>
                        <ow-col :pc="{span: 8}">
                            <!-- 烧杯的内容 -->
                            <h3>成分</h3>
                            <div class="beaker-ele" v-for="(item, idx) in players[0].tube" :key="idx">
                                <p>
                                    {{item.name}} : {{item.quantity}}
                                </p>
                            </div>
                        </ow-col>
                        <ow-col :pc="{span: 8}">
                            <img src="@/assets/beaker.png" class="beaker" @mouseover="showBeakerA=true" @mouseleave="showBeakerA=false" @click="putBeakerA" />
                        </ow-col>
                    </ow-row>

                    <div v-if="showBeakerA==true">点击放入这里</div>
                    <div>
                        <div class="playerNotice" v-if="currPlayer===0">
                            <div class="content heroName">
                                {{players[0].name}}: 请选择卡牌
                            </div>
                        </div>
                    </div>

                    <ow-row class="row cards" v-if="currPlayer===90">
                        <div v-bind:class="(item.hovered==true || (currPlayer==0 && currCardId==idx))?'box foo-hover':'box'" v-for="(item, idx) in players[0].cards.slice(0, 4)" :key="idx" @mouseover="item.hovered = true" @mouseleave="item.hovered = false" @click="selectCard(item, 0, idx)">
                            <div v-bind:class="(currPlayer==0 && currCardId==idx)? 'foo-selected': ''">
                                <div v-if="item.hovered==true || (currPlayer==0 && currCardId==idx)">
                                    idx: {{idx}}
                                    element: {{item.name}}
                                    Hover to Show Secret
                                </div>
                                <p v-if="!item.hovered">Secret !!!</p>
                            </div>
                        </div>
                        <div v-if="currPlayer === 0 ">
                            <!-- <ow-button type="primary" @click="toAction(0, 1)">加入对方烧杯</ow-button>
                        <ow-button type="warning" @click="toAction(0, 0)">加入已方烧杯</ow-button> -->
                            <ow-button type="danger" @click="toEndRound(0)">结束回合</ow-button>
                            <!-- <ow-button type="danger" @click="toQuit(0)">结束游戏</ow-button> -->
                        </div>
                    </ow-row>

                </ow-col>
                <!-- 游戏通告 -->
                <ow-col :pc="{span: 8}" class="centerBox">
                    <div style="background-color: #000">
                    <img src="@/assets/img/logo.png" style="width: 80%"/>

                    </div>
                    <h2>当前回合 {{currentRealRound}}</h2>
                    <div>当前玩家 {{players[currPlayer].name}}</div>
                    <!-- <div style="color: red;font-size: 24px">
                        已选择 {{players[currPlayer].cards[currCardId]}}
                    </div> -->

                    <ow-modal :is-fixed="false" :is-open.sync="isOpen" class="modal">
                        <template slot="header">
                            {{currAction}}
                        </template>
                        <div style="margin-bottom: 12px" v-for="(item, idx) in currentRoundRes" :key="idx">
                            <h3>{{item}}</h3>
                        </div>
                        <template slot="footer">
                            <ow-button @click="isOpen = false">Close</ow-button>
                        </template>
                    </ow-modal>
                    <ow-collapse-group :selected.sync="selectedCollapse">
                        <ow-collapse title="点击查看对战记录" name="1">
                            <div>
                                <ow-scroll style="border: 4px solid red;" :height="360">
                                    <div style="border: 2px solid black;" v-if="currAction !== ''">
                                        <div v-for="(item, idx) in actionLog" :key="idx">
                                            {{idx}}: {{item}}
                                        </div>
                                    </div>
                                </ow-scroll>

                            </div>
                        </ow-collapse>
                    </ow-collapse-group>
                    <!-- card selected -->
                    <div class="cardInfo" v-if="players[currPlayer].cards[currCardId] !== undefined">
                        <h2 style="color: red">{{players[currPlayer].cards[currCardId].name}}</h2>
                        <h3 style="color: blue">{{players[currPlayer].cards[currCardId].type}}</h3>
                        <p>{{players[currPlayer].cards[currCardId].description}}</p>
                    </div>

                </ow-col>
                <!-- 玩家2 -->
                <ow-col :pc="{span: 8}">
                    <div class="col-item col-item-primary"></div>
                    <ow-hero url="http://bbbot-public-image.s3.cn-northwest-1.amazonaws.com.cn/avatar1.png" size="large"></ow-hero>
                    <!-- <ow-blood totalTextColor="#FFC429" residualTextColor="#909399" residualColor="#3B9CE1" goneColor="#909399" :total="150" :residual="50"></ow-blood> -->
                    <ow-row class="row">
                        <ow-content class="content heroName">
                            玩家昵称 : {{players[1].name}}
                            <p>
                                金币: {{players[1].credit}}
                            </p>
                            <!-- <p>
                                水量: {{players[1].water}}
                            </p> -->
                            <p>
                                pH: {{players[1].pH}}
                            </p>
                        </ow-content>

                    </ow-row>
                    <ow-row>
                        <ow-col :pc="{span: 8}">
                            <!-- 烧杯的内容 -->
                            <h3>成分</h3>
                            <div class="beaker-ele" v-for="(item, idx) in players[1].tube" :key="idx">
                                <p>
                                    {{item.name}} : {{item.quantity}}
                                </p>
                            </div>
                        </ow-col>
                        <ow-col :pc="{span: 8}">
                            <img src="@/assets/beaker.png" class="beaker" @mouseover="showBeakerB=true" @mouseleave="showBeakerB=false" @click="putBeakerB" />
                        </ow-col>
                    </ow-row>
                    <div v-if="showBeakerB==true">点击放入这里</div>

                    <!-- <div>
                        <img src="@/assets/beaker.png" class="beaker" @mouseover="showBeakerB=true" @click="putBeakerB" @mouseleave="showBeakerB=false" />

                    </div> -->
                    <div v-if="currPlayer===1" style="text-align:center">
                        <div class="content heroName">
                            {{players[1].name}}: 请选择卡牌
                        </div>
                    </div>
                    <ow-row class="row cards " v-if="currPlayer===91">
                        <div v-bind:class="(item.hovered==true || (currPlayer==1 && currCardId==idx))?'box foo-hover  ':'box' " v-for="(item, idx) in players[1].cards.slice(0, 4)" :key="idx" @mouseover="item.hovered = true" @mouseleave="item.hovered = false" @click="selectCard(item, 0, idx)">
                            <div v-if="item.hovered==true || (currPlayer==1 && currCardId==idx)">
                                idx: {{idx}}
                                {{typeof(item.cid)}} name: {{item.name}}
                                Hover to Show Secret
                            </div>
                            <p v-if="!item.hovered">Secret !!!</p>
                        </div>

                        <div v-if="currPlayer === 1">
                            <!-- <ow-button type="primary" @click="toAction(1, 1)">加入对方烧杯</ow-button>
                        <ow-button type="warning" @click="toAction(1, 0)">加入已方烧杯</ow-button> -->
                            <ow-button type="danger" @click="toEndRound(1)">结束回合</ow-button>
                            <!-- <ow-button type="danger" @click="toQuit(1)">结束游戏</ow-button> -->
                        </div>
                    </ow-row>

                </ow-col>

            </ow-row>
        </ow-content>
    </ow-layout>
    <ow-footer class="footer">
        <!-- player A cards  -->
        <ow-row class="row cards" v-if="currPlayer===0">
            <div v-bind:class="(item.hovered==true || (currPlayer==0 && currCardId==idx))?'box foo-hover':'box'" v-for="(item, idx) in players[0].cards.slice(0, 4)" :key="idx" @mouseover="item.hovered = true" @mouseleave="item.hovered = false" @click="selectCard(item, 0, idx)">
                <ow-popover trigger="hover" class="popover" position="top">
                    <div v-bind:class="(currPlayer==0 && currCardId==idx)? 'foo-selected': ''">
                        <div v-if="item.hovered==true || (currPlayer==0 && currCardId==idx)">
                            <div class="element-name">
                                {{item.name}}
                            </div>
                            <div class="cost">
                                $: {{item.cost}}
                            </div>
                        </div>
                        <div v-if="!item.hovered && (idx != currCardId) ">
                            <div>
                                <div class="">
                                    {{item.name}}
                                </div>
                                <div class="cost">
                                    $: {{item.cost}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <template slot="content">
                        <div>点击选择这张牌，放进烧杯？</div>
                    </template>

                </ow-popover>
            </div>
            <!-- 第 5 张牌 -->
            <div v-bind:class="(item.hovered==true )?'box foo-hover  ':'box2' " v-for="(item) in players[0].cards.slice(4, 5)" :key="item.cid" @mouseover="item.hovered = true" @mouseleave="item.hovered = false">
                <ow-popover class="popover" position="top">
                    <div v-if="item.hovered==true ">
                        <div class="name">
                            {{item.name}}
                        </div>
                        <div class="cost">
                            {{item.cost}}
                        </div>
                    </div>
                    <div v-if="!item.hovered">
                        <div class="name2">
                            {{item.name}}
                        </div>
                        <div class="cost">
                            {{item.cost}}
                        </div>
                    </div>
                    <template slot="content">
                        <div>只能选择前 4 张牌</div>
                    </template>

                </ow-popover>
            </div>

        </ow-row>
        <div v-if="currPlayer === 0 ">
            <!-- <ow-button type="primary" @click="toAction(0, 1)">加入对方烧杯</ow-button>
                        <ow-button type="warning" @click="toAction(0, 0)">加入已方烧杯</ow-button> -->
            <ow-button type="danger" @click="toEndRound(0)">结束回合</ow-button>
            <!-- <ow-button type="danger" @click="toQuit(0)">结束游戏</ow-button> -->
        </div>
        <!-- player B cards  -->
        <ow-row class="row cards " v-if="currPlayer===1">
            <div v-bind:class="(item.hovered==true || (currPlayer==1 && currCardId==idx))?'box foo-hover  ':'box' " v-for="(item, idx) in players[1].cards.slice(0, 4)" :key="idx" @mouseover="item.hovered = true" @mouseleave="item.hovered = false" @click="selectCard(item, 0, idx)">
                <div v-if="item.hovered==true || (currPlayer==1 && currCardId==idx)">
                    <div class="element-name">
                        {{item.name}}
                    </div>
                    <div class="cost">
                        {{item.cost}}
                    </div>
                </div>
                <div v-if="!item.hovered && idx != currCardId">
                    <div class="name">
                        {{item.name}}
                    </div>
                    <div class="cost">
                        {{item.cost}}
                    </div>
                </div>
            </div>
            <div v-bind:class="(item.hovered==true)?'box foo-hover ':'box2' " v-for="(item, idx) in players[1].cards.slice(4, 5)" :key="item.cid" @mouseover="item.hovered = true" @mouseleave="item.hovered = false">
                <ow-popover class="popover" position="top">

                    <div v-if="item.hovered==true ">
                        <div class="name">
                            {{item.name}}
                        </div>
                        <div class="cost">
                            {{item.cost}}
                        </div>
                    </div>
                    <div v-if="!item.hovered && idx != currCardId">
                        <div class="name2">
                            {{item.name}}
                        </div>
                        <div class="cost">
                            {{item.cost}}
                        </div>
                    </div>
                    <template slot="content">
                        <div>只能选择前 4 张牌</div>
                    </template>
                </ow-popover>
            </div>
        </ow-row>
        <div v-if="currPlayer === 1">
            <!-- <ow-button type="primary" @click="toAction(1, 1)">加入对方烧杯</ow-button>
                        <ow-button type="warning" @click="toAction(1, 0)">加入已方烧杯</ow-button> -->
            <ow-button type="danger" @click="toEndRound(1)">结束回合</ow-button>
            <!-- <ow-button type="danger" @click="toQuit(1)">结束游戏</ow-button> -->
        </div>
    </ow-footer>
</ow-layout>
</template>

<script>
export default {
    data() {
        return {
            roundCredit: [
                3, 5, 7, 9, 9, 9, 9, 9, 11, 13, 13, 13, 13, 13, 13, 13, 15, 15, 15, 17
            ],
            currentRoundRes: [],
            showBeakerA: false,
            showBeakerB: false,
            gameOver: false,
            isOpen: false,
            currCardId: null,
            selected: "0",
            currentRound: 1,
            currentRealRound: 1,
            currPlayer: 0,
            cardSelected: 0,
            scoreA: 0,
            scoreB: 0,
            players: [{
                    name: "player A",
                    cards: [],
                    credit: 3,
                    water: 6,
                    tube: [],
                    pH: 7
                },
                {
                    name: "player B",
                    cards: [],
                    credit: 3,
                    water: 6,
                    tube: [],
                    pH: 7
                }
            ],
            currAction: "",
            actionLog: [],
            beakerA: [],
            beakerB: [],
            selectedCollapse: []
        }
    },
    methods: {
        /**
         *  初始化游戏
         */
        intiGame() {
            const that = this
            var cardNo = 8
            var players = that.players
            //   init player Score card ?
            /**
             * 玩家 
             *   cards: [{
             *             no: 1
             *             name: "ca+",
             *             cost: 5
             *          }]
             *  tube: {
             *           water: 100,
             *          },
             *  credit: 100
             */
            var url = that.$api + "/init_cards"
            console.log(url)
            that.$http.post(url).then(
                res => {
                    // players[0].cards = res.data.cards[0]
                    // players[1].cards = res.data.cards[1]
                    for (let i = 0; i < res.data.cards[0].length; i++) {
                        players[0].cards.push({
                            name: res.data.cards[0][i].name,
                            description: res.data.cards[0][i].description,
                            type: res.data.cards[0][i].type,
                            cost: res.data.cards[0][i].cost,
                            hovered: false
                        })
                        players[1].cards.push({
                            name: res.data.cards[1][i].name,
                            description: res.data.cards[1][i].description,
                            type: res.data.cards[1][i].type,
                            cost: res.data.cards[1][i].cost,
                            hovered: false
                        })
                    }
                    that.players = players
                    console.log("players", players[0], players[1])
                }
            )
            // for (cardNo = 0; cardNo < 8; cardNo++) {
            //     players[0].cards.push({
            //         // cid: cardNo.toString(),
            //         name: "something " + cardNo.toString(),
            //         cardCredit: 3,
            //         hovered: false
            //     })
            //     players[1].cards.push({
            //         // cid: cardNo.toString(),
            //         name: "something B",
            //         cardCredit: 3,
            //         hovered: false
            //     })
            // }
            // that.players = players
        },
        initPlayer() {
            // 填写玩家姓名
            console.log("init player")
            var playerA = this.$store.getters.getPlayerName("a")
            var playerB = this.$store.getters.getPlayerName("b")
            console.log("player A", playerA, playerB)
            console.log("player names", this.$store.state.playerName)
            this.players[0].name = playerA
            this.players[1].name = playerB
            this.scoreA = 0
            this.scoreB = 0
        },
        selectCard(card, playerId, currCardId) {
            /**
             * 选中卡牌 
             * 1. 检查 剩余 credit 是否大于 card cost
             */
            const that = this
            console.log("select card", playerId, currCardId, typeof (currCardId))
            // console.log("cardtype:", that.players[currCardId])
            that.cardSelected = 1
            that.currCardId = currCardId
        },
        putBeakerA() {
            // 将卡牌放进 A 烧杯
            const that = this
            var currPlayer = that.currPlayer
            var currCardId = that.currCardId
            console.log("put card to beakerA", this.players[currPlayer].cards[currCardId].name)
            // 检查 是否 credit 
            console.log(this.players[currPlayer])
            if (this.players[currPlayer].credit >= this.players[currPlayer].cards[currCardId].cost) {
                that.toAction(currPlayer, 0)
            } else {
                alert("金币不足, 请换牌，或结束回合")
            }
        },
        putBeakerB() {
            // 将卡牌放进 B 烧杯
            const that = this
            var currPlayer = that.currPlayer
            var currCardId = that.currCardId
            console.log("put card to beakerB", this.players[currPlayer].cards[currCardId].name)
            if (this.players[currPlayer].credit >= this.players[currPlayer].cards[currCardId].cost) {
                that.toAction(currPlayer, 1)
            } else {
                alert("金币不足, 请换牌，或结束回合")
            }
        },
        /**
         *  玩家动作
         */
        toAction(playerId, tubeId) {
            /**
             *  将 卡牌元素放入烧杯， 发送请求给后台
             *  post
             *      当前烧杯的 score， water， beaker内容 ,cardName 发送给后台，
             *  return
             *      新 score，water， 新的 beaker 内容
             *       
             *  然后：
             *      更新 玩家 score， water， 和烧杯内容 tube， credit
             *      reset 当前玩家和卡牌选择数据
             * 
             */
            const that = this
            var currPlayer = that.currPlayer
            var currCardId = that.currCardId

            // console.log(that.actionLog)
            /**
             * to send action and get result
             */
            var url = that.$api + "/react"
            var currPlayerScore = tubeId === 0 ? that.scoreA : that.scoreB
            var reactData = {
                score: currPlayerScore,
                water: that.players[tubeId].water,
                beaker: that.players[tubeId].tube,
                card: that.players[currPlayer].cards[currCardId]
            }
            console.log("reactData", reactData)
            that.$http.post(url, reactData).then(
                res => {
                    console.log("react res", res.data)
                    that.players[tubeId].tube = res.data.beaker
                    that.players[tubeId].water = res.data.water
                    that.players[tubeId].pH = res.data.pH
                    that.players[currPlayer].credit = that.players[currPlayer].credit - that.players[currPlayer].cards[currCardId].cost
                    console.log(this.players[playerId].name, "将", this.players[currPlayer].cards[currCardId].name, "加入", this.players[tubeId].name, "烧杯")
                    var currAction = [this.players[playerId].name, "将", this.players[currPlayer].cards[currCardId].name, "加入", this.players[tubeId].name, "烧杯"].join(" ")
                    that.currAction = currAction
                    that.currentRoundRes = res.data.displays
                    that.actionLog.push(currAction)
                    console.log(" to change cards", this.players[currPlayer].cards, currCardId)
                    var newCards = that.changeCardSeq(this.players[currPlayer].cards, currCardId)
                    that.players[currPlayer].cards = newCards
                    if (tubeId === 0) {
                        that.scoreA = res.data.score
                    } else {
                        that.scoreB = res.data.score
                    }
                    that.isOpen = true
                    that.cardSelected = 0
                    that.currCardId = 99
                    // setTimeout(function () {
                    //     that.isOpen = false
                    // }, 3000)
                }
            )
            // reset states
        },
        changeCardSeq(cards, idx) {
            /**
             *  使用卡后，将卡放到最后
             *  return new cards
             */
            console.log("curr cards ", cards, idx)
            var usedCard = cards[idx]
            cards.splice(idx, 1)
            cards.push(usedCard)
            console.log("new cards", cards)
            return cards
        },
        toEndRound(playerId) {
            // 结束回合
            var that = this
            var currentRealRound = Math.ceil(that.currentRound / 2)
            console.log(that.currentRound, currentRealRound)
            console.log("(playerId + 1)", (playerId + 1) % 2)
            var nxtPlayer = (playerId + 1) % 2 === 0 ? 0 : 1
            that.currCardId = 99
            that.currPlayer = nxtPlayer
            that.currentRound += 1
            that.players[playerId].credit = that.roundCredit[currentRealRound]
            that.currentRealRound = currentRealRound
        },
        toQuit(playerId) {
            var that = this
            var player = that.player[playerId]
            that.currAction = player.name + " 放弃了游戏"
            that.isOpen = true
            that.gameOver = true
        }
    },
    created() {
        console.log("router", this.$route.path)
        this.initPlayer()
        this.intiGame()
    },
    computed: {},
    watch: {
        /**
         *  判断输赢
         *  任何一方的 score 的 绝对值 > water 即 loss
         */
        currentRound: function () {
            if (this.currentRealRound > 9) {
                console.log("to stop")
                var playerAfScore = this.scoreA / this.players[0].water
                var playerBfScore = this.scoreB / this.players[1].water
                if (playerAfScore > playerBfScore) {
                    alert(this.players[1].name + "获得胜利")
                } else if (playerAfScore < playerBfScore) {
                    alert(this.players[0].name + "获得胜利")
                } else {
                    alert("平局")
                }
            }
        },
        scoreA: function () {
            console.log(this.scoreA, "scoreA")
            if (Math.abs(this.scoreA) / this.players[0].water >= 1) {
                alert(this.players[1].name + "获得胜利！")
            }
        },
        scoreB: function () {
            console.log(this.scoreB, "scoreB")
            if (Math.abs(this.scoreB) / this.players[1].water >= 1) {
                alert(this.players[0].name + "获得胜利！")
            }
        }
    }
}
</script>

<style scoped>
.footer {
    /* padding-top: 30px;
    padding-bottom: 20px; */
    bottom: 30px;
    position: absolute;
    left: 20%;
    right: 20%
}

.heroName {
    font-size: 2rem;
}

.name2 {
    font-size: .8rem;
    overflow-wrap: break-word;
}
.content {
    color: bisque;
}

.box {
    border: 1p solid;
    border-color: black;
    vertical-align: middle;

    /* padding: 5px; */
    width: 100px;
    height: 160px;
    color: cadetblue;
    background-color: lightblue;
    /* background-image: url("../assets/img/cards/hover.jpg"); */
    background-size: cover;
    background-position: center center;
    margin-left: auto;
    margin-right: auto
}

.beaker-ele {
    display: flex;
    flex-direction: column;
}

h2 {
    font-size: 36px;
}

h3 {
    font-size: 24px;
}
.cardInfo {
    border-color: cadetblue;
    border: 2px solid;
    margin-left: 20px;
    margin-right: 20px;
    box-shadow: 5px 5px 5px #000;
    padding: 10px;
    background-color: #E1F5FE;
}
.box2 {
    border: 1p solid;
    border-color: black;
    vertical-align: middle;

    /* padding: 5px; */
    width: 80px;
    height: 120px;
    color: cadetblue;
    background-color: lightgrey;
    /* background-image: url("../assets/img/cards/hover.jpg"); */
    background-size: cover;
    background-position: center center;
    margin-left: auto;
    margin-right: auto;

}

.foo-hover {
    background-color: bisque;
    transform: scale(1.2);
}

.foo-selected {
    transform: scale(1);
}

.centerBox {
    border: 1p solid;
    border-color: black;
    padding: 25px;
    padding-top: 0px;
    background-color: #FEF9F4;
    opacity: 0.7;
    color: darkgreen;
    margin-bottom: 20%;
}

.element-name {
    margin-top: 20%;
    margin-left: 5px;
    font-size: 1rem;
    position: center center;
    overflow: auto;
    color: black;
    font-weight: bolder;
    vertical-align: middle;

}

.cost {
    color: chocolate;
    font-weight: bolder;
}

.box-right {
    text-align: right;
    float: right;
}

.playerNotice {
    text-align: center;
    padding-left: 0;
    padding-right: 0;
    padding-top: 40px;
}

.cards {
    padding-top: 40px;
    padding-bottom: 30px;
}

.beaker {
    padding-top: 50px;
    width: 200px;
}

.modal {
    width: 70%;
    background-color: transparent;
    margin-left: auto;
    margin-right: auto
}

.layout {
    padding-top: 10px;
}
</style>
