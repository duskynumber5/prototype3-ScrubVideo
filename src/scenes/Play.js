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

        const makePlatform = (x, y, w=100, h=20, m, b, shift, exp) => {
        const r = this.add.rectangle(x, y, w, h, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(r)
        r.body.setImmovable(true);           
        r.body.setCollideWorldBounds(true); 
        r.m = m;
        r.b = b;
        r.shift = shift;
        r.exp = exp;
        return r;
        };

        this.platforms = [
            makePlatform(100,600,100,20,1,1,0,1),
            makePlatform(100,600,100,20,2,10,0,1),
            makePlatform(100,600,100,20,-0.05,600,400,2),
        ];

        this.platforms.forEach(p => this.physics.add.collider(this.player, p));

        this.cursors = this.input.keyboard.createCursorKeys()

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        this.direction = new Phaser.Math.Vector2(0)
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
            platform.setX(this.T)
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