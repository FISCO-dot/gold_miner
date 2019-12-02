cc.Class({
    extends: cc.Component,

    properties: {
        clawNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ctx = this.getComponent(cc.Graphics); 
        this.ctx.clear();
        this.i =0 ;

    },

    start () {
    

    },

    plot:function () {
        this.ctx.lineWidth = 2;
        this.ctx.strokeColor = cc.Color.ORANGE;
        this.ctx.moveTo(this.clawNode.x, this.clawNode.y-330);
        this.ctx.lineTo(0, 0);
        this.ctx.stroke(); 
    },

    update: function(dt){
        this.i++;
        this.plot();
        if(this.i % 2 == 0)
            this.ctx.clear();

    }
});
