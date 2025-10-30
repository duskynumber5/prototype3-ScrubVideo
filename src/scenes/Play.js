class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        this.VEL = 400 
    }

    create() {
        // add background image
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0)
        this.bg.setScale(3)

        // set up camera
        // this.cameras.main.setBounds(0, 0, this.bg.width, this.bg.height)
        // this.cameras.main.startFollow(this.player, false, 0.5, 0.5)
        // this.physics.world.setBounds(0, 0, this.bg.width, this.bg.height)
        
        this.player = this.physics.add.sprite(20, 850, 'player').setOrigin(0)
        this.player.setScale(0.4)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setGravityY(3500)

        const makePlatform = (x, y, w=100, h=20, baseVX=100, baseVY=0) => {
        const r = this.add.rectangle(x, y, w, h, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(r)
        r.body.setImmovable(true);           
        r.body.setCollideWorldBounds(true); 
        r.body.setBounce(1, 1);
        r.baseVX = baseVX 
        r.baseVY = baseVY
        r.body.setVelocity(baseVX, baseVY)
        return r;
        };

        this.platforms = [
            makePlatform(100,800,100,20,100,0),
            makePlatform(200,600,100,20,-150,0),
            makePlatform(300,200,100,20,0,120),
            makePlatform(400,500,100,20,200,0),
            makePlatform(500,900,100,20,-100,0),
            makePlatform(600,0,  100,20,0,150),
            makePlatform(700,300,100,20,150,0),
            makePlatform(800,700,100,20,-200,0),
            makePlatform(900,100,100,20,0,200),
            makePlatform(1000,400,100,20,100,0),
        ];

        this.platforms.forEach(p => this.physics.add.collider(this.player, p));

        this.cursors = this.input.keyboard.createCursorKeys()

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    update() {
        this.direction = new Phaser.Math.Vector2(0)
        if(keyA.isDown) {
            this.direction.x = -1
        } else if(keyD.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.space.isDown) {
            this.direction.y = -100
        }

        if (this.cursors.left.isDown) {

        } else if (this.cursors.right.isDown) {

        }

        this.direction.normalize()
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}