
cc.Class({
    extends: cc.Component,
    
    properties: {
        explositeAudio:cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.back = 0;
        this.pullFlag = 0;
        this.claw = this.game.clawNode.getComponent('claw')
        this.t = 0;
        this.explositeRadius = Math.sqrt(this.node.width * this.node.height/Math.PI)*3;

        this.explositAnimation = this.node.getComponent(cc.Animation);
        this.explositAnimation.explositeEnd = function(){
            for(var i = 0;i< this.game.itemList.length;i++){
                var pos_other = this.game.node.parent.convertToWorldSpaceAR(this.game.itemList[i]);
                if(this.node.position.sub(pos_other).mag() < this.explositeRadius){
                    this.game.itemNodeList[i].destroy();
                }
            }
            this.node.destroy();
        }.bind(this)
    },

    onCollisionEnter: function (other) {
        if(other.node == this.claw.node){
            this.claw.rotate = -1;
            this.audioVideoPlay();
        }
    },
    audioVideoPlay:function(){
        this.explositAnimation.play('bombBarrelExplosite');
        cc.audioEngine.playEffect(this.explositeAudio);
    },


});