class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)   
        scene.physics.add.existing(this)  
    
        this.body.gravity.y = 3000
        this.body.setCollideWorldBounds(true)
    }

    update() {           
        // movement
    
        // if(keyA.isDown && this.body.velocity.x == 0) {
        //     this.body.velocity.x = -400
        // } else if(keyD.isDown && this.body.velocity.x == 0) {
        //     this.body.velocity.x = 400
        // }

        if (keySpace.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-900)
        }
    }

}