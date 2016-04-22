var dyecfGame = {
    context: null,
    bgImage: null,
    bgReady: false,
    then: null,
    initGame: function(container){
        var canvas = document.createElement("canvas");
        dyecfGame.context = canvas.getContext("2d");
        canvas.width = 512;
        canvas.height = 480;
        container.appendChild(canvas);
        
        dyecfGame.initBackgroundImage();
    },
    initBackgroundImage: function() {
        dyecfGame.bgImage = new Image();
        dyecfGame.bgImage.onload = function(){
            dyecfGame.bgReady = true;
        };
        
        dyecfGame.bgImage.src = "images/background.png";
    },
    render: function(){
        if(dyecfGame.bgReady){
            dyecfGame.context.drawImage(dyecfGame.bgImage, 0, 0);
        }
    },
    main: function(){
        var now = Date.now();
        var delta = now - dyecfGame.then;

        dyecfGame.render();
        dyecfGame.then = now;
        //Request to do this again ASAP
        dyecfGame.requestAnimationFrame(dyecfGame.main);
    },
    requestAnimationFrame: function(func1){
        var w = window;
        requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;  
        requestAnimationFrame(func1);
    },
    startGame: function(){
        dyecfGame.then = Date.now();
        dyecfGame.main();
    }
};
    