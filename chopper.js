class chopper {
    constructor(gameEngine) {
        this.walkingAnimator = new Animator(ASSET_MANAGER.getAsset("./walkingchopper.png"), 2, 0, 70, 73, 8, 0.14, true);
        this.standingAnimator = new Animator(ASSET_MANAGER.getAsset("./standingchopper.png"), 0, 0, 64, 71, 4, 0.3, true);
        this.punchAnimator1 = new Animator(ASSET_MANAGER.getAsset("./punch1.png"), 2, 0, 99, 76, 4, 0.15, false);
        this.punchAnimator2 = new Animator(ASSET_MANAGER.getAsset("./punch2.png"), 2, 0, 94, 66, 4, 0.15,false);
        this.punchAnimator3 = new Animator(ASSET_MANAGER.getAsset("./punch3.png"), 0, 0, 84, 81, 4, 0.15,false);
        this.monsterAnimator = new Animator(ASSET_MANAGER.getAsset("./monsterchopper.png"), 10, 0, 290, 316, 6, 0.14, true);
        this.runAnimator = new Animator(ASSET_MANAGER.getAsset("./runchopper.png"), 5, 0, 70, 71, 6, 0.2,true);
        this.jumpAnimator = new Animator(ASSET_MANAGER.getAsset("./jumpchopper.png"), 0, 0, 89, 83, 8, 0.08,false);
        this.idleAnimator1 = new Animator(ASSET_MANAGER.getAsset("./idleluffy.png"), 6, 0, 111, 115, 4, 0.3,true);
        this.deadAnimator1 = new Animator(ASSET_MANAGER.getAsset("./deadluffy.png"), 0, 0, 100, 103, 4, 0.1,false);
        this.idleAnimator2 = new Animator(ASSET_MANAGER.getAsset("./idlejinbei.png"), 0, 0, 111, 115, 6, 0.5,true);
        this.deadAnimator2 = new Animator(ASSET_MANAGER.getAsset("./deadjinbei.png"), 0, 0, 125, 103, 4, 0.2,false);
        this.currentAnimator = this.walkingAnimator;
        this.dummyAnimator = this.idleAnimator1;
        this.backgroundNumber = 1;
        this.game = gameEngine;
        this.x = 160;
        this.y = 140;
        this.speed = 150;
        this.scale = 1
        this.punchCount = 1;
        this.idleX = 320;
        this.idleY = 100;
        this.luffyWidth1 = 110;
        this.luffyWidth2 = 200;
        this.jinbeiWidth1 = 95;
        this.jinbeiWidth2 = 210;
        this.width1 = 110;
        this.width2 = 200;
    };

    update() {
        

        


        if(this.game.keys['ArrowLeft'] || this.game.keys['KeyA']) {
            this.scale = 1;
            this.x -= this.speed * this.game.clockTick * this.scale;
        }

        if(this.game.keys['ArrowRight'] || this.game.keys['KeyD']) {
            this.scale = -1;
            this.x -= this.speed * this.game.clockTick * this.scale;
        }

        const canvasWidth = this.game.ctx.canvas.width;
        if(this.x < 0) {
            this.x = 520;
            this.dummyAnimator.reset();

            
            if(this.backgroundNumber == 2) {
                this.game.ctx.canvas.style.backgroundImage = "url(background.png)";
                this.backgroundNumber = 1;
                this.dummyAnimator = this.idleAnimator1;
                this.width1 = this.luffyWidth1;
                this.width2 = this.luffyWidth2;
            } else {
                this.game.ctx.canvas.style.backgroundImage = "url(background2.png)";
                this.backgroundNumber = 2;
                this.dummyAnimator = this.idleAnimator2;
                this.width1 = this.jinbeiWidth1;
                this.width2 = this.jinbeiWidth2;
            }
            
            
        } else if(this.x > 540) {
            this.x = 0; 
            this.dummyAnimator.reset();

            
            if(this.backgroundNumber == 1) {
                this.game.ctx.canvas.style.backgroundImage = "url(background2.png)";
                this.backgroundNumber = 2;
                this.dummyAnimator = this.idleAnimator2;
                this.width1 = this.jinbeiWidth1;
                this.width2 = this.jinbeiWidth2;

            } else {
                this.game.ctx.canvas.style.backgroundImage = "url(background.png)";
                this.backgroundNumber = 1;
                this.dummyAnimator = this.idleAnimator1;
                this.width1 = this.luffyWidth1;
                this.width2 = this.luffyWidth2;
            }
            
            
        }

        

        let isPunching = (this.currentAnimator === this.punchAnimator1 || 
                          this.currentAnimator === this.punchAnimator2 || 
                          this.currentAnimator === this.punchAnimator3);
        let isJumping = this.currentAnimator === this.jumpAnimator;
        
        

        if((this.game.keys['ArrowUp'] || this.game.keys['KeyW']) && !isJumping && !isPunching) {
            this.currentAnimator = this.jumpAnimator;
            this.currentAnimator.reset();
            

        }


        if(this.game.keys['KeyF'] && !isPunching && !isJumping) {
            if(this.punchCount == 1) {
                this.currentAnimator = this.punchAnimator1;
            } else if (this.punchCount == 2) {
                this.currentAnimator = this.punchAnimator2;
            } else {
                this.currentAnimator = this.punchAnimator3;
                this.punchCount = 0;
                this.y -= 20;
            }
            this.currentAnimator.reset();
            
        }

        isPunching = (this.currentAnimator === this.punchAnimator1 || 
                          this.currentAnimator === this.punchAnimator2 || 
                          this.currentAnimator === this.punchAnimator3);
        isJumping = this.currentAnimator === this.jumpAnimator;

        if(isPunching && this.currentAnimator.isDone() ) {
            if(this.punchCount == 0) {
                this.y += 20;
            }
            this.punchCount += 1;
            if(this.game.isAnyKeyPressed()) {
                if(this.game.keys['Shift']) {
                    this.speed = 300;
                    this.currentAnimator = this.runAnimator;
                } else {
                    this.speed = 150;
                    this.currentAnimator = this.walkingAnimator;
                }
                
            } else {
                this.currentAnimator = this.standingAnimator;
            }
            console.log(this.x + 95);
            console.log(this.y);
        }

        if(isPunching && ((this.x + 95) >= this.idleX + this.width1 && (this.x + 95) <= this.idleX + this.width2)) {
            if(this.backgroundNumber == 1) {
                this.dummyAnimator = this.deadAnimator1;
            } else {
                this.dummyAnimator = this.deadAnimator2;
            }
            this.idleY = 110;
            
        }

        if(isJumping && this.currentAnimator.isDone()) {
            if(this.game.isAnyKeyPressed()) {
                if(this.game.keys['Shift']) {
                    this.speed = 300;
                    this.currentAnimator = this.runAnimator;
                } else {
                    this.speed = 150;
                    this.currentAnimator = this.walkingAnimator;
                }
                
            } else {
                this.currentAnimator = this.standingAnimator;
            }
        }

        if(!isPunching && !isJumping) {
            if(this.game.isAnyKeyPressed()) {
                if(this.game.keys['Shift']) {
                    this.speed = 300;
                    this.currentAnimator = this.runAnimator;
                } else {
                    this.speed = 150;
                    this.currentAnimator = this.walkingAnimator;
                }
                
            } else {
                this.currentAnimator = this.standingAnimator;
            }
        }
        

        

        
    };

    draw(ctx) {
        //ctx.save();
        //ctx.scale(-1,1);
        //ctx.drawImage(ASSET_MANAGER.getAsset("./walkingchopper.png"), 0, 0, 130, 135, -100, 100, 16*3, 32*3);
        this.currentAnimator.drawFrame(this.game.clockTick,ctx,this.x,this.y,this.scale);
        this.dummyAnimator.drawFrame(this.game.clockTick,ctx,this.idleX,this.idleY,1);
        
        //ctx.restore();
    };



}