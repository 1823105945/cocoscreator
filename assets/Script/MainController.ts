// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    bird0: cc.Sprite = null;

    @property(cc.Sprite)
    bird1: cc.Sprite = null;

    @property(cc.Sprite)
    bird2: cc.Sprite = null;

    @property(cc.Node)
    birdParent: cc.Node = null;

    @property(cc.Node)
    bg0: cc.Node = null;

    @property(cc.Node)
    bg1: cc.Node = null;

    @property(cc.Node)
    tree0: cc.Node = null;

    @property(cc.Node)
    tree1: cc.Node = null;

    @property(cc.Node)
    tree2: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    time=0;

    speed=0;

    start () {
        let treeOffsetX=200;
        let spaceX=(960+1024)/3;
        this.tree0.x=treeOffsetX+spaceX*0;
        this.tree1.x=treeOffsetX+spaceX*1;
        this.tree2.x=treeOffsetX+spaceX*2;
    }

    update (dt) {
        let  timeTmp=this.time+dt;
        this.time=timeTmp;
        if (this.time > 0.5){
            if (this.bird0.node.active){
                this.bird0.node.active=false;
                this.bird1.node.active=true;
            } else if (this.bird1.node.active){
                this.bird1.node.active= false;
                this.bird2.node.active=true;

            } else  if (this.bird2.node.active){
                this.bird2.node.active=false;
                this.bird0.node.active=true;
            }
            this.time=0;

        }

        // let birdPY=this.birdParent.y;
        // this.birdParent.y=birdPY-2;
        this.speed=this.speed-0.05;
        this.birdParent.y=this.birdParent.y+this.speed;

        this.move(this.bg1);
        this.move(this.bg0);
        this.moveTree(this.tree0);
        this.moveTree(this.tree1);
        this.moveTree(this.tree2);
        this.collisionClock(this.tree0,this.birdParent)
        this.collisionClock(this.tree1,this.birdParent)
        this.collisionClock(this.tree2,this.birdParent)
    }
    //背景移动
    move(bg){
        bg.x=bg.x-1;
        if (bg.x<-960){
            bg.x=bg.x+960*2;
        }
    }
    //障碍物树的移动
    moveTree(tree){
        tree.x=tree.x-2;
        if (tree.x<(-960/2-200)) {
            tree.x=tree.x+960+1024;
            tree.y=300-(Math.random()*300);
            console.log(tree.y);
        }
    }

//    点击屏幕
    onButtonClock(){
        console.log("点击了");
        this.speed=3;
    }

    // 小鸟和管子发生碰撞
    collisionClock(tree,bird){

        if (bird.x+bird.width/2<tree.x-tree.width/2){
            return;
        }else if (bird.x-bird.width/2>tree.x+tree.width/2){
            return;
        }else if ((bird.y+bird.height/2<tree.y+tree.height/2)&&(bird.y-bird.height/2>tree.y-tree.height/2)){
            return;
        }
        console.log("碰撞了");
    }
}

