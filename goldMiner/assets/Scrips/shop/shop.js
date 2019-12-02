

cc.Class({
    extends: cc.Component,

    properties: {
        bombPrefab:cc.Prefab,
        strengthMedicinePrefab:cc.Prefab,
        stoneValueMedicinePrefab:cc.Prefab,
        diamondValueMedicinePrefab:cc.Prefab,
        shoperAnimation:cc.Animation,
        shopAudio:cc.AudioClip,
        cashNode:cc.Node,
        stage:cc.Label,
        money:cc.Label,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameInfo = cc.find("PersistNode").getComponent("Persist")
        this.stageNum = this.gameInfo.stage;
        this.moneyNum = this.gameInfo.score;
        this.spawnNewGoods();
        this.gameInfo.shopInitial();
        this.stage.string ='stage:'+ this.stageNum;
        this.money.string = '$:'+this.moneyNum;
        this.purchurse = 0;
    },
    spawnNewGoods: function(){
        var i = 1;
        var goodList = [];
        for(i = 1;i <5;i++){
            if(this.gameInfo.stage < 4)
                var choose = Math.ceil(Math.random()*3.0);
            else
                var choose = Math.ceil(Math.random()*4.0);
            goodList.push(choose);
            switch(choose){
                case 1:
                    var good = cc.instantiate(this.bombPrefab);
                    good.getComponent('bombPrefab').shop = this;
                    break;
                case 2:
                    var good = cc.instantiate(this.strengthMedicinePrefab);
                    good.getComponent('strengthMedicinePrefab').shop = this;
                    break;
                case 3:
                    console.log('stone')
                    var good = cc.instantiate(this.stoneValueMedicinePrefab);
                    good.getComponent('stoneValueMedicinePrefab').shop = this;
                    break;
                case 4:
                    var good = cc.instantiate(this.diamondValueMedicinePrefab);
                    good.getComponent('diamondValueMedicinePrefab').shop = this;
                    break;
            }
            this.node.addChild(good);
            good.setPosition(cc.v2(-300+100*(i-1),-140));
        }
    },
    onNextStageButtClicked: function(){
        cc.audioEngine.playEffect(this.shopAudio);
        if(this.purchurse == 0)
            this.shoperAnimation.play('angry');
        else{
            this.cashNode.active = true;
            var cashAnimation =this.cashNode.getComponent(cc.Animation);
            cashAnimation.playAdditive('cash');
            this.shoperAnimation.playAdditive('happy');
        }
        this.gameInfo.score = this.moneyNum;
        this.gameInfo.stage++;
    },
    start () {

    },

    // update (dt) {},
});
