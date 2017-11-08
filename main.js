// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        // Change the background color of the game to blue
        game.stage.backgroundColor = '#71c5cf';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // 创建一个组 存放管道
        this.pipes = game.add.group(); 
        this.pipes.enableBody = true;
        
        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        
        // call addRowOfPipes every 1.5 seconds
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
        
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#ffffff" }); 
        },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
        if (this.bird.angle < 20)
            this.bird.angle += 1; 
        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
        },
    // Make the bird jump 
    jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
        // Create an animation on the bird
        var animation = game.add.tween(this.bird);

        // Change the angle of the bird to -20° in 100 milliseconds
        animation.to({angle: -20}, 100);

        // And start the animation
        animation.start(); 
    },
    // Add a pipe
    addOnePipe: function(x, y) {
        // Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Add the pipe to our previously created group
        this.pipes.add(pipe);

        // Enable physics on the pipe 
        game.physics.arcade.enable(pipe);

        // Add velocity to the pipe to make it move left 移动速度
        pipe.body.velocity.x = -200; 

        // Automatically kill the pipe when it's no longer visible 
        // 当管道不可见的时候关闭管道
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    addRowOfPipes: function() {
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        // 建立一个 1 ~ 5 的随机数，来随机断开管道，建立缝隙
//        var hole = Math.floor(Math.random() * 5) + 1;
//        console.log('hole', hole);
//        // Add the 6 pipes 
//        // With one big hole at position 'hole' and 'hole + 1'
//        // 在 hole,hole + 1 的位置创建缝隙 确定管道的位置
//        for (var i = 0; i < 8; i++)
//            if (i != hole && i != hole + 1)  this.addOnePipe(400, i * 60 + 10);  
//        this.score += 1;
//        this.labelScore.text = this.score;  
    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
