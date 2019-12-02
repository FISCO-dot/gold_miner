

cc.Class({
    extends: cc.CircleCollider,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.radius = Math.sqrt(this.node.width *this.node.height/Math.PI);
    },

    start () {

    },

    // update (dt) {},
});
