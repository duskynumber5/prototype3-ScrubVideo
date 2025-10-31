const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,     // for tinting
    width: 1300,
    height: 700,
    autoCenter: true,
    pixelArt: true,
    backgroundColor: 'rgba(68, 68, 68, 1)',
    //zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Load , Play ]
}   

const game = new Phaser.Game(config)

let keyA, keyD, keySpace