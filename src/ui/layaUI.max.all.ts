
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class BackGroundUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":288,"height":512},"child":[{"type":"Image","props":{"y":0,"x":0,"width":288,"skin":"bird/bg_day.png","height":512}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.BackGroundUI.uiView);
        }
    }
}
