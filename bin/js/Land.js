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
var Land = /** @class */ (function (_super) {
    __extends(Land, _super);
    function Land(landHeight) {
        var _this = _super.call(this) || this;
        //2个地板 接起来，向左移动    
        _this.land_1 = new Laya.Sprite();
        _this.land_2 = new Laya.Sprite();
        _this.isMove = true; //陆地是否滚动， 如果主角死了，就不滚动了
        _this.te = Laya.loader.getRes("bird/land.png");
        //绘制2个地板图片        
        _this.land_1.graphics.drawTexture(_this.te);
        _this.land_2.graphics.drawTexture(_this.te);
        //初始坐标， 把第2个地板 放到第一个地板左边， 而不是 舞台的宽度， 因为 地板宽度大于舞台宽度
        _this.land_1.pos(0, Laya.stage.height - landHeight);
        _this.land_2.pos(_this.te.width, Laya.stage.height - landHeight);
        _this.addChild(_this.land_1);
        _this.addChild(_this.land_2);
        Laya.stage.frameLoop(1, _this, _this.MoveLand);
        return _this;
    }
    Land.prototype.MoveLand = function () {
        //这里就是 轮流向左移动， 消失就放右边了        
        if (!this.isMove)
            return;
        this.land_1.x -= 2;
        this.land_2.x -= 2;
        if (this.land_1.x <= -this.te.width) {
            this.land_1.x = this.te.width + this.land_2.x;
        }
        else if (this.land_2.x <= -this.te.width) {
            this.land_2.x = this.te.width + this.land_1.x;
        }
    };
    return Land;
}(Laya.Sprite));
//# sourceMappingURL=Land.js.map