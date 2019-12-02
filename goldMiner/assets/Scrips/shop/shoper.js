

cc.Class({
    extends: cc.Component,

    properties: {
  
    },



    onLoad () {
        var shoperAnimation = this.node.getComponent(cc.Animation);
        shoperAnimation.animationPlayEnd = function(){
            var stage =cc.find("PersistNode").getComponent('Persist').stage
            if(stage < 4)
                cc.director.loadScene('game');
            else if(stage >= 4 && stage % 2 == 0)
                cc.director.loadScene('game2');
            else
                cc.director.loadScene('game3');
        }.bind(this);
    },

    start () {

    },

    // update (dt) {},
});
