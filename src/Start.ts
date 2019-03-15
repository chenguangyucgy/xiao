// 程序入口
class GameMain {

    land: Land; //陆地
    bird: Bird; //主角

    landHeight: number = 50;    //陆地高度
    yspeed: number = 0; //下落速度
    g: number = 0.98;   //重力加速度
    isLive: boolean = true; //主角是否活着

    //上下2个管道，2个数组
    pipeups: Laya.Sprite[] = [];
    pipedowns: Laya.Sprite[] = []

    uiscore: Laya.Text;
    score: number = 0;
    constructor() {
        Laya.init(288, 512, Laya.WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.frameRate = "slow";
        //   Laya.Stat.show();

        Laya.loader.load("res/atlas/bird.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS)



    }



    onLoaded(): void {

        //加载背景图片
        var bg: Laya.Sprite = new Laya.Sprite();
        bg.graphics.drawTexture(Laya.loader.getRes("bird/bg_day.png"));
        Laya.stage.addChild(bg);


        //加载陆地
        this.land = new Land(this.landHeight);
        this.land.zOrder = 10;  //把陆地设置为最前， 不然会被管道覆盖，但是必须在主角之下
        Laya.stage.addChild(this.land);


        //加载主角
        this.bird = new Bird("2");  //有3个外形的小鸟， 0 1 2

        this.bird.pos(50, 200);
        this.bird.pivot(24, 24);
        this.bird.zOrder = 20;
        Laya.stage.addChild(this.bird);

        //添加管道
        this.addPipe();

        //显示分数
        this.uiscore = new Laya.Text();
        this.uiscore.text = "分数:0";
        this.uiscore.fontSize = 22;
        this.uiscore.x = 100;

        this.uiscore.color = "#f00"
        Laya.stage.addChild(this.uiscore);

        //处理点击事件
        Laya.stage.on(Laya.Event.CLICK, this, this.onClick);

        //每帧事件
        Laya.stage.frameLoop(1, this, this.onLoop);
    }

    onClick(): void {
        //如果主角死了， 重新点击 就开始
        if (!this.isLive) {
            this.reset();
            return;
        }

        this.yspeed = -8;;      //向上蹦多少
        this.bird.rotation = -45;//向上旋转一下

        Laya.SoundManager.playSound("sound/sfx_wing.wav", 1);

    }

    lastPipeIndex: number = 0;  //最后一个管道的下标
    onLoop(): void {

        if (!this.isLive) return;   //如果主角死了， 就不用旋转 以及 管道移动了

        //下落以及是否碰撞到地板        
        this.yspeed += this.g;
        this.bird.y += this.yspeed;
        if (this.bird.y >= Laya.stage.height - this.landHeight - 16) {
            this.bird.y = Laya.stage.height - this.landHeight - 16;
            this.yspeed = 0;
            this.death();
        }



        //旋转主角
        if (this.bird.rotation <= 90) {
            this.bird.rotation += 3;
        }


        //管道移动
        for (var i = 0; i < this.pipeups.length; i++) {
            this.pipeups[i].x -= 2;
            this.pipedowns[i].x -= 2;

            //管道超过界面了
            if (this.pipeups[i].x < -54) {    //-52是管道的宽度，这里设置成 -54，也就是说 完全看不到了，还超过一点
                //重新设置成新的管道
                this.pipeups[i].y = -Math.random() * 250;
                this.pipedowns[i].y = this.pipeups[i].y + 430;

                this.pipeups[i].x = this.pipeups[this.lastPipeIndex].x + 160;
                this.pipedowns[i].x = this.pipeups[i].x;
                this.lastPipeIndex = i;
            }
        }


        //碰撞检测
        for (var i = 0; i < this.pipeups.length; i++) {
            var up: Laya.Rectangle = this.pipeups[i].getBounds();
            var down: Laya.Rectangle = this.pipedowns[i].getBounds();

            //这里不用 intersects 检测碰撞原因是， 图片素材 有许多空白的地方，比如 小鸟只有20的像素，但是图片有30的像素
            //误差较大， 所有自己检测了，顺便调整了一下
            if (
                (this.bird.x + 10 >= up.x && (this.bird.y - 15 <= up.bottom || this.bird.y >= up.bottom + 95) && this.bird.x <= up.right)   //判断是否和上面管道相撞
            ) {
                this.death();
                return;

            }

            //判断是否加分
            if (up.right == this.bird.x) {
                Laya.SoundManager.playSound("sound/sfx_point.wav", 1);
                this.uiscore.text = "分数:" + (++this.score);
            }

        }





    }

    death(): void {

        if (!this.isLive) return;    //死一次就够了，不用死透了
        this.isLive = false;
        this.land.isMove = this.isLive; //停止管道移动
        this.bird.bird.stop();  //停止播放动画
        Laya.SoundManager.playSound("sound/sfx_hit.wav", 1);


    }

    reset(): void {
        //其实 刷新一下网页 就行了，感觉不厚道，还是实现一下吧
        //Laya.Browser.window.location.reload();


        //初始化管道
        for (var i = 0; i < this.pipeups.length; i++) {

            this.pipeups[i].y = -Math.random() * 250;
            this.pipedowns[i].y = this.pipeups[i].y + 430;

            this.pipeups[i].x = 160 * (i + 1);
            this.pipedowns[i].x = this.pipeups[i].x;
            this.lastPipeIndex = i;
        }
        //初始化分数
        this.score = 0;
        this.uiscore.text = "分数:0";
        this.bird.pos(50, 200);
        this.bird.rotation = 0;
        this.land.isMove = true;
        this.yspeed = 0;    //把下落速度归零，不然一复活 就会瞬间摔死
        this.isLive = true; //重生
    }

    addPipe(): void {


        for (var i = 0; i < 3; i++) {

            var y: number = -Math.random() * 250;
            var x: number = 160 * (i + 1);

            //添加上面管道
            var p: Laya.Sprite = new Laya.Sprite();
            p.loadImage("bird/pipe_down.png");
            p.pos(x, y);
            this.pipeups.push(p);
            Laya.stage.addChild(p);

            //添加下面管道
            p = new Laya.Sprite();
            p.loadImage("bird/pipe_up.png");
            p.pos(x, y + 430);
            this.pipedowns.push(p);
            Laya.stage.addChild(p);

            //最后是哪根管道，这里用来记录一下，最左边管道消失后，可以作为参考
            this.lastPipeIndex = i;

        }



    }

}
new GameMain();