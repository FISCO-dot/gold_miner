

cc.Class({
    extends: cc.Component,

    properties: {
        goldDensity:100,
        stoneDensity:150,
        otherDensity:50,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () { 
        cc.game.addPersistRootNode(this.node);
        this.initialInfo();
        this.shopInitial();
    },
    initialInfo:function(){
        this.score = 0;
        this.stage = 1;
        this.bombNum = 2;
    },
    shopInitial: function(){
        this.clawSpeed = 100; 
        this.stonePrice = 0.01/4;
        this.diamondPrice = 0.16;
    },
    start () {

    },

    // update (dt) { },
});
