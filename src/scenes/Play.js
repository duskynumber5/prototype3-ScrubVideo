class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background image
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0)
        this.bg.setScale(3)
        this.add.rectangle(100, 100, 500, 500, 0xFFFFFF).setOrigin(0,0)

        this.player = this.add.image(0, 0, 'player').setOrigin(0)
        this.player.setScale(0.05)
        
        // set up camera
        // this.cameras.main.setBounds(0, 0, this.map.width, this.map.height)
        // this.cameras.main.startFollow(this.hero, false, 0.5, 0.5)
        // this.physics.world.setBounds(0, 0, this.map.width, this.map.height)
    }

    update() {

    }
}