(function($, root){
    function Control(len){
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function(){
            return this.getIndex(-1);
        },
        next: function(){
            return this.getIndex(1);
        },
        getIndex: function(val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val +len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlIndex = Control;
})(window.Zepto, window.player || (window.player = {}))