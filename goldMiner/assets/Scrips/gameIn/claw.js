
cc.Class({
    extends: cc.Component,

    properties: {
        ropeAudio:cc.AudioClip,
        goldAssem:cc.Node,
        stoneAssem:cc.Node,
        bombThrowPrefab:cc.Prefab,
        rotationSpeed : 1,
        bombSpeed: 500,
        bombNum:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    
    clawOnLoad:function() {
        this.gameInfo =cc.find("PersistNode").getComponent("Persist");
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = false;
        this.node.setPosition(cc.v2(0,320));
        this.bombThrowNode = cc.instantiate(this.bombThrowPrefab);
        this.bombThrowNode.setPosition(cc.v2(-34,360));
        this.node.parent.addChild(this.bombThrowNode);
        this.explosite = this.bombThrowNode.getComponent(cc.Animation);
        this.bombThrowNode.active = false;
        this.t = 0 ;
        this.node.angle =-70;
        this.rotate = 1;
        // console.log('onload rotate'+ this.rotate);
        this.iniPos = cc.v2(0,320);
        this.clawReturnSpeed = this.gameInfo.clawSpeed*2;
        this.node.parent.on('touchstart', function ( event ) {
            // console.log('rotate'+this.rotate);
            if(this.rotate == 1)  {
                this.clawStretch();
            }
            if(this.rotate == -1 && this.gameInfo.bombNum > 0){
                this.bombThrow();
            }
        }.bind(this));
        this.bombNum.string = 'x'+ this.gameInfo.bombNum;
    },

    clawStretch: function(){
        this.rotate = 0 ;
        this.manager.enabled = true;
        cc.audioEngine.playEffect(this.ropeAudio, true);
    },
    onCollisionEnter: function (other) {
        this.catchNode = other.node;
        var pos = this.catchNode.parent.convertToWorldSpaceAR(this.catchNode.position);
        this.node.position = this.node.parent.convertToNodeSpaceAR(pos);
        this.node.angle = Math.atan(this.node.x/(320-this.node.y))*180/Math.PI;
        console.log('angle'+this.node.angle)
        if(other.node.isChildOf(this.goldAssem)){
            this.clawReturnSpeed = this.gameInfo.clawSpeed - other.node.width * other.node.height*this.gameInfo.goldDensity;
        }
        else if(other.node.isChildOf(this.stoneAssem)){
            this.clawReturnSpeed = this.gameInfo.clawSpeed - other.node.width * other.node.height*this.gameInfo.stoneDensity;
        }
        else{
            this.clawReturnSpeed = this.gameInfo.clawSpeed - this.gameInfo.otherDensity;
        }
    },
    bombThrow: function(){
        this.node.parent.off('touchstart');
        this.bombThrowNode.active = true;
        this.gameInfo.bombNum--;
        this.bombNum.string = 'x'+ this.gameInfo.bombNum;
    },
    start () {

    },

    update: function(dt) {
        if(this.rotate == 1){
            this.t += 1.2*dt ;
            var v = this.rotationSpeed * Math.sin(this.t)/Math.abs(Math.sin(this.t));
            this.node.angle += v * dt;

        }
        else if(this.rotate == 0){
            this.node.x =this.node.x + this.gameInfo.clawSpeed * Math.sin(this.node.angle*Math.PI/180) * dt;
            this.node.y =this.node.y - this.gameInfo.clawSpeed * Math.cos(this.node.angle*Math.PI/180) * dt;
            if(Math.abs(this.node.x) >= this.node.parent.width/2 || Math.abs(this.node.y-this.iniPos.y) > 800){
                this.rotate = -1;
            }
        }
        else{
            this.manager.enabled = false;
            this.node.x =this.node.x - this.clawReturnSpeed * Math.sin(this.node.angle*Math.PI/180) * dt;
            this.node.y =this.node.y + this.clawReturnSpeed * Math.cos(this.node.angle*Math.PI/180) * dt;
            if(this.iniPos.y <= this.node.y){
                cc.audioEngine.stopAll();
                this.clawOnLoad();
            }
        }
        if(this.bombThrowNode.active){
            if(this.bombThrowNode.y <= this.node.y) {
                this.bombThrowNode.x = this.node.x;
                this.explosite.play('explosite');
                this.catchNode.destroy();
                this.clawOnLoad();
            }
            if(this.bombThrowNode.y > this.node.y){
                this.bombThrowNode.x = this.bombThrowNode.x + this.bombSpeed * Math.sin(this.node.angle*Math.PI/180) * dt;
                this.bombThrowNode.y =this.bombThrowNode.y - this.bombSpeed * Math.cos(this.node.angle*Math.PI/180) * dt;
            }
        }
        
    },

});
