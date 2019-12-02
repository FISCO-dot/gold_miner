cc.Class({
    extends: cc.Component,

    properties: {
        fundamentalPrice: 20,
        fluctuateRange:100,
        valueLabel:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.spawnNewValue();
        this.valueLabel.string = '$'+this.value;
    },
    spawnNewValue:function(){
        var stage = this.shop.stageNum;
        this.value = Math.round( this.fundamentalPrice + Math.random()*this.fluctuateRange + (stage-1) * 50);
    },
    onPurchurse: function(){   
        if(cc.find("PersistNode").getComponent("Persist").score > this.value){
            this.shop.purchurse = 1;     
            this.shop.moneyNum = this.shop.moneyNum - this.value;
            this.shop.money.string = '$:'+ this.shop.moneyNum;
            cc.find("PersistNode").getComponent("Persist").stonePrice *= 4;
            console.log("stoneprice"+cc.find("PersistNode").getComponent("Persist").stonePrice)
            this.node.destroy();
        }


    },

    // update (dt) {},
});