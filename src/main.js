const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,     // for tinting
    width: 1500,
    height: 850,
    autoCenter: true,
    pixelArt: true,
    backgroundColor: 'rgba(68, 68, 68, 1)',
    //zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [ Load , Play ]
}   

const game = new Phaser.Game(config)