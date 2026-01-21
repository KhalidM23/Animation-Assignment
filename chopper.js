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
        this.currentAnimator = this.walkingAnimator;
        this.game = gameEngine;
        this.x = 360;
        this.y = 140;
        this.speed = 150;
        this.scale = 1
        this.punchCount = 1;
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
        console.log("X position:", this.x);
        console.log("Canvas width:", canvasWidth);
        if(this.x < 0) {
            this.x = 520;
            this.game.ctx.canvas.style.backgroundImage = "url(background.png)"
        } else if(this.x > 540) {
            this.x = 0; 
            this.game.ctx.canvas.style.backgroundImage = "url(background2.png)"
        }

        /*
        if(this.game.keys['ArrowDown'] || this.game.keys['KeyS']) {
            this.y += this.speed * this.game.clockTick;
        }

        if(this.game.keys['ArrowUp'] || this.game.keys['KeyW']) {
            this.y -= this.speed * this.game.clockTick;
        }
            */
        

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
            console.log(this.x);
            console.log(this.y);
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
        
        //ctx.restore();
    };



}