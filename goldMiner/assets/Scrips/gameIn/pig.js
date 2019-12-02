

cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 100,
        pigAnimation:cc.Animation,
        scoreAudio:cc.AudioClip,
    },


    onLoad () {
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        this.pullFlag = 0;
        console.log('pig1')
        this.claw = this.game.clawNode.getComponent('claw');
        this.pick = 0;
        console.log("pig2")
        this.return = 0;
    },

    onCollisionEnter: function (other) {
        if(this.pick == 0){
            this.pickNode = other.node;
        }
        if(other.node == this.game.clawNode){
            this.manager.enabled = false;
            console.log("pig catch");
            this.claw.rotate = -1;
            this.pullFlag = 1;
        }
        else if(other.node.isChildOf(this.game.diamondAssem)){
            this.pick = 1;
        }
        else{

            this.return = 1 ;
        }
    },
                                                                                             
    update (dt) {
        if(this.pullFlag == 1) {
            
            this.node.x =this.node.x - this.claw.clawReturnSpeed * Math.sin(this.game.clawNode.angle*Math.PI/180) * dt;
            this.node.y =this.node.y + this.claw.clawReturnSpeed * Math.cos(this.game.clawNode.angle*Math.PI/180) * dt;
            if(this.pick ==1){
                this.pickNode.x = this.pickNode.x - this.claw.clawReturnSpeed * Math.sin(this.game.clawNode.angle*Math.PI/180) * dt;
                this.pickNode.y =this.pickNode.y + this.claw.clawReturnSpeed * Math.cos(this.game.clawNode.angle*Math.PI/180) * dt;
            }
            if(this.node.parent.convertToWorldSpaceAR(this.node.position).y > this.game.clawNode.parent.convertToWorldSpaceAR(this.claw.iniPos).y)
            {
                this.game.gameInfo.score += 20;
                this.game.scoreDisplay.string =  this.game.gameInfo.score;
                cc.audioEngine.playEffect(this.scoreAudio, false);
                this.node.destroy();
            }
        }
        
        else{
            console.log('x'+this.node.parent.convertToWorldSpaceAR(this.node.position).x)
            this.node.x += this.moveSpeed*dt;
            if(this.pigAnimation.currentClip == null || (this.moveSpeed > 0 && this.pigAnimation.currentClip.name != 'pigMoveRight'))    this.pigAnimation.play('pigMoveRight',false);
            else if(this.moveSpeed < 0 && this.pigAnimation.currentClip.name != 'pigMoveLeft')    this.pigAnimation.play('pigMoveLeft',false);
            if( this.node.parent.convertToWorldSpaceAR(this.node.position).x < 0 || this.node.parent.convertToWorldSpaceAR(this.node.position).x > 700 || this.return == 1){
                this.moveSpeed = -1*this.moveSpeed;
                this.return = 0;
            }
        }

        if(this.pick == 1){
            this.pickNode.x += this.moveSpeed*dt;
        }

    },
});
