var DYECF = {
    context: null,
    bgImage: null,
    crossfiterImage: null,
    crossfiter: {speed: 256, x: 0, y: 0},
    bgReady: false,
    crossfiterReady: false,
    then: null,
    keysDown: {},
    init: function(container){
        var canvas = document.createElement("canvas");
        DYECF.context = canvas.getContext("2d");
        canvas.width = 512;
        canvas.height = 480;
        container.appendChild(canvas);
        
        DYECF.initBackgroundImage();
        DYECF.initCrossfiterImage();
        DYECF.addEventListeners();
    },
    addEventListeners: function () {
        addEventListener("keydown", function(e){
            DYECF.keysDown[e.keyCode] = true;
        }, false);
        
        addEventListener("keyup", function(e){
            delete DYECF.keysDown[e.keyCode];
        }, false);
    },
    initCrossfiterImage: function(){
      DYECF.crossfiterImage = new Image();
      DYECF.crossfiterImage.onload = function(){
          DYECF.crossfiterReady = true;
      }
      
      DYECF.crossfiterImage.src = "images/crossfiter.png";
    },
    initBackgroundImage: function() {
        DYECF.bgImage = new Image();
        DYECF.bgImage.onload = function(){
            DYECF.bgReady = true;
        };
        
        DYECF.bgImage.src = "images/background.png";
    },
    update: function(modifier){
        if(38 in DYECF.keysDown){ //player holding up
            DYECF.crossfiter.y -= DYECF.crossfiter.speed * modifier;
        }
            
        if(40 in DYECF.keysDown){ //player holding down
            DYECF.crossfiter.y += DYECF.crossfiter.speed * modifier;
        }
            
        if(37 in DYECF.keysDown){ //player holding left
            DYECF.crossfiter.x -= DYECF.crossfiter.speed * modifier;
        }
            
        if(39 in DYECF.keysDown){ //player holding right
            DYECF.crossfiter.x += DYECF.crossfiter.speed * modifier;
        }         
    },
    render: function(){
        if(DYECF.bgReady){
            DYECF.context.drawImage(DYECF.bgImage, 0, 0);
        }
        
        if(DYECF.crossfiterReady){
            DYECF.context.drawImage(DYECF.crossfiterImage, DYECF.crossfiter.x, DYECF.crossfiter.y);
        }
    },
    main: function(){
        var now = Date.now();
        var delta = now - DYECF.then;
        DYECF.update(delta/1000);
        DYECF.render();
        DYECF.then = now;
        //Request to do this again ASAP
        DYECF.requestAnimationFrame(DYECF.main);
    },
    requestAnimationFrame: function(func1){
        var w = window;
        requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;  
        requestAnimationFrame(func1);
    },
    startGame: function(container){
        DYECF.init(container);
        DYECF.then = Date.now();
        DYECF.main();
    }
};
    