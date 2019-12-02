

cc.Class({
    extends: cc.Component,
    
    properties: {
        maxScale:1.2,
        minScale:0.2,
        scoreAudio:cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.back = 0;
        this.pullFlag = 0;
        this.claw = this.game.clawNode.getComponent('claw')
        this.area = this.node.width * this.node.height;
    },

    onCollisionEnter: function (other) {
        if(other.node == this.claw.node){
            console.log('gold catch')
            this.claw.rotate = -1;
            this.pullFlag = 1;
        }

    },

    start () {

    },

    update :function(dt) {
        if(this.pullFlag == 1) {
            this.node.x =this.node.x - this.claw.clawReturnSpeed * Math.sin(this.game.clawNode.angle*Math.PI/180) * dt;
            this.node.y =this.node.y + this.claw.clawReturnSpeed * Math.cos(this.game.clawNode.angle*Math.PI/180) * dt;
            if(this.node.parent.convertToWorldSpaceAR(this.node.position).y > this.game.clawNode.parent.convertToWorldSpaceAR(this.claw.iniPos).y)
            {
                this.game.gameInfo.score += Math.round(this.area/75)
                this.game.scoreDisplay.string =  this.game.gameInfo.score;
                cc.audioEngine.playEffect(this.scoreAudio, false);
                this.node.destroy();

            }
        }
    },
});
