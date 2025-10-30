class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load the visual goodz
        this.load.path = './assets/'
        this.load.image('bg', 'greyRect.jpeg')
        this.load.image('player', 'stickman.png')
    }
    
    create() {
        this.scene.start('playScene')
    }
}