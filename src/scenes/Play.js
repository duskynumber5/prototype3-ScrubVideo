class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        this.T = 0;
    }

    init() {
        this.VEL = 400
    }

    create() {
        // add background image
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0)
        this.bg.setScale(3)
        
        this.player = new Player(this, 20, 850, 'player').setOrigin(0)
        this.player.setScale(0.4)

        const makePlatform = (x, y, w=100, h=20, m, b, shift, exp,offset) => {
        const r = this.add.rectangle(x, y, w, h, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(r)
        r.body.setImmovable(true);           
        r.body.setCollideWorldBounds(true); 
        r.m = m;
        r.b = b;
        r.shift = shift;
        r.exp = exp;
        r.frozen = false;
        r.offset = offset;
        return r;
        };

        this.platforms = [
            makePlatform(100,600,100,20,1,1,0,1,0),
            makePlatform(100,600,100,20,2.2,8,0,1,400),
            makePlatform(100,600,100,20,1.3,3,0,1,800),
            makePlatform(100,600,100,20,2,10,0,1,200),
            makePlatform(100,600,100,20,-0.005,600,700,2,100),
            makePlatform(100,600,100,20,-0.0001,400,700,3,100),
        ];

        this.physics.add.collider(this.player, this.platforms, (player, platform) => {
            if (player.body.touching.down && platform.body.touching.up) {
                console.log("Player landed on top of a platform!")
                platform.frozen = true;
                platform.setFillStyle(0xff0000);
            }
        });

        this.cursors = this.input.keyboard.createCursorKeys()

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


        this.txt = this.add.text(1200, 650, this.T, { fontFamily: 'Arial', fontSize: 32, color: '#1c1c1cff' });
    }

    update() {
        this.direction = new Phaser.Math.Vector2(0)
        this.txt.setText(this.T)
        if(keyA.isDown) {
            this.direction.x = -1
        } else if(keyD.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.space.isDown) {
            this.player.update()
        }

        if (this.cursors.left.isDown) {
            this.T--
            if(this.T <= 0){
                this.T = 0;
            }

        } else if (this.cursors.right.isDown) {
            this.T++;
            if(this.T >= 1200){
                this.T = 1200;
            }
        }

        this.player.body.velocity.x = this.VEL * this.direction.x

        this.direction.normalize()
        this.updatePlatforms();
    }
    updatePlatforms(){
        for(let platform of this.platforms){
            if(!this.player.body.blocked.down){
                platform.frozen = false;
                platform.setFillStyle(0xffffff)
            }
            if(!platform.frozen){
                platform.setX(this.T + platform.offset)
                let newY = ((platform.m * ((this.T - platform.shift)**platform.exp)) + platform.b)
                if(newY >= 700){
                    newY = 680;
                }
                else if (newY <= 0){
                    newY = 0;
                }
                platform.setY(newY)
            }

        }
    }

}