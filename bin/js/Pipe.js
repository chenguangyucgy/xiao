var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var Pipe = (function (_super) {
    __extends(Pipe, _super);
    function Pipe() {
        var _this = _super.call(this) || this;
        var tup = Laya.loader.getRes("bird/pipe_down.png");
        var tdown = Laya.loader.getRes("bird/pipe_up.png");
        _this.up = new Laya.Sprite();
        _this.up.graphics.drawTexture(tup);
        _this.addChild(_this.up);
        _this.down = new Laya.Sprite();
        _this.down.graphics.drawTexture(tdown, 0, 430);
        _this.addChild(_this.down);
        return _this;
    }
    return Pipe;
}(Laya.Sprite));
//# sourceMappingURL=Pipe.js.map