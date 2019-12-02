

cc.Class({
    extends: cc.Component,

    properties: {
        explositeAudio:cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.explosite = this.node.getComponent(cc.Animation);
        this.explosite.explositeEnd = function(){
            console.log('destroynode');
            cc.audioEngine.stopAll();
            cc.audioEngine.playEffect(this.explositeAudio);         
            this.node.destroy();
        }.bind(this);
    },

    start () {

    },

    // update (dt) {},
});
