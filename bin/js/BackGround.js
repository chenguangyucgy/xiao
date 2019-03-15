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
var BackGround = (function (_super) {
    __extends(BackGround, _super);
    function BackGround(landHeight) {
        var _this = _super.call(this) || this;
        _this.land_1 = new Laya.Sprite();
        _this.land_2 = new Laya.Sprite();
        _this.te = Laya.loader.getRes("bird/land.png");
        _this.land_1.graphics.drawTexture(_this.te);
        _this.land_2.graphics.drawTexture(_this.te);
        _this.land_1.pos(0, Laya.stage.height - landHeight);
        _this.land_2.pos(_this.te.width, Laya.stage.height - landHeight);
        _this.addChild(_this.land_1);
        _this.addChild(_this.land_2);
        Laya.stage.frameLoop(1, _this, _this.MoveLand);
        return _this;
    }
    BackGround.prototype.MoveLand = function () {
        this.land_1.x -= 2;
        this.land_2.x -= 2;
        if (this.land_1.x <= -this.te.width) {
            this.land_1.x = this.te.width + this.land_2.x;
        }
        else if (this.land_2.x <= -this.te.width) {
            this.land_2.x = this.te.width + this.land_1.x;
        }
    };
    return BackGround;
}(Laya.Sprite));
//# sourceMappingURL=BackGround.js.map