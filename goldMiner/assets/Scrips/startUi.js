
cc.Class({
    extends: cc.Component,

    properties: {
        startButt:cc.Node,
        beginUi:cc.Node,
        startAudio:cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        this.startUiDisappear = this.beginUi.getComponent(cc.Animation);
        this.startUiDisappear.disappearPlayEnd = function(){
            cc.director.loadScene('game');
        }.bind(this);
        
    },
    onStartButtClick: function(){
        cc.audioEngine.playEffect(this.startAudio, false);
        this.startUiDisappear.play('disappear');
    },



    // update (dt) {},
});
