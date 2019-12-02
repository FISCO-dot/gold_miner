

cc.Class({
    extends: cc.Component,

    properties: {
        timeLimit : 60,
        goldPrefab:cc.Prefab,
        stonePrefab:cc.Prefab,
        goldAssem:cc.Node,
        stoneAssem:cc.Node,
        underGD:cc.Node,
        caveBG:cc.Node,
        playerNode:cc.Node,
        clawNode:cc.Node,
        timerNode:cc.Node,
        timerDisplay:cc.Label,
        scoreNode:cc.Node,
        scoreDisplay:cc.Label,
        stageDisplay:cc.Label,
        restartButt:cc.Node,
        ropeNode:cc.Node,
        bombNode:cc.Node,
    },

    
    onLoad:function() {
        this.goldAssem.destroyAllChildren();
        this.stoneAssem.destroyAllChildren();
        var claw = this.clawNode.getComponent('claw');
        this.time = this.timeLimit;
        this.gameInfo = cc.find("PersistNode").getComponent("Persist");
        claw.clawOnLoad();
        this.spawnNewGolds();
        this.spawnNewStones();
        this.scoreDisplay.string =  this.gameInfo.score;
        this.stageDisplay.string = 'Stage:'+ this.gameInfo.stage;
        this.scoreLine = (this.gameInfo.stage-1)*200 +50;
     },
    spawnNewGolds: function(){
        this.itemList = [];
        this.itemNodeList = [];
        for(var i = 0;i < 8; i++){
            var newGold = cc.instantiate(this.goldPrefab);
            var width = newGold.width ;
            newGold.getComponent('gold').game = this;
            newGold.width = (Math.random()+0.2)  * width;
            newGold.height = newGold.width/width * newGold.height;
            do{
                var pick = true ;
                var pos = this.getPosition();
                if(this.itemList.length == 0) break;
                for(var j=0;j < this.itemList.length; j++){
                    var v = pos.sub(this.itemList[j]);
                    if(v.mag() < 200){
                        pick = false;
                        break;
                    }
                }
            }while(pick == false);
            newGold.setPosition(pos);
            this.itemList.push(pos);
            this.itemNodeList.push(newGold);
            this.goldAssem.addChild(newGold);
        }

    },
    spawnNewStones: function(){

        for(var i = 0;i < 5; i++){
            var newStone = cc.instantiate(this.stonePrefab);
            
            var width = newStone.width ;
            newStone.getComponent('stone').game = this;
            newStone.width = (Math.random()+0.2)  * width;
            newStone.height = newStone.width/width * newStone.height;
            do{
                var pick = true ;
                var pos = this.getPosition();
                if(this.itemList.length == 0) break;
                for(var j=0;j < this.itemList.length; j++){
                    var v = pos.sub(this.itemList[j]);
                    if(v.mag() < 100){
                        pick = false;
                        break;
                    }
                }
            }while(pick == false);
            newStone.setPosition(pos);
            this.itemList.push(pos);
            this.itemNodeList.push(newStone);
            this.stoneAssem.addChild(newStone);
        }

    },

    getPosition: function(){
        var ranX = 50 + 0.8 * Math.random() * this.node.width;
        var ranY = 50 + 0.8 * Math.random() * this.underGD.height;
        // var ranX = 500;
        // var ranY = 500;
        return(cc.v2(ranX,ranY)); 
    },
    gameOver: function(){
        cc.director.pause();
        cc.audioEngine.stopAll();
        this.restartButt.active = true;
    },

    restartButtClick: function(){
        this.restartButt.active = false;
        this.gameInfo.initialInfo();
        cc.director.resume();
        this.onLoad();

    },
    update (dt) {
        this.time -= dt;
        if(Math.round(this.time) == 0){
            if(this.gameInfo.score < this.scoreLine)
                this.gameOver(); 
            else
                cc.director.loadScene('shop');
        }
        else{
            this.timerDisplay.string = Math.round(this.time);
        }
    },
});
