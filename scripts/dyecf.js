var DYECF = {
    context: null,
    bgImage: null,
    bgReady: false,
    then: null,
    init: function(container){
        var canvas = document.createElement("canvas");
        DYECF.context = canvas.getContext("2d");
        canvas.width = 512;
        canvas.height = 480;
        container.appendChild(canvas);
        
        DYECF.initBackgroundImage();
    },
    initBackgroundImage: function() {
        DYECF.bgImage = new Image();
        DYECF.bgImage.onload = function(){
            DYECF.bgReady = true;
        };
        
        DYECF.bgImage.src = "images/background.png";
    },
    render: function(){
        if(DYECF.bgReady){
            DYECF.context.drawImage(DYECF.bgImage, 0, 0);
        }
    },
    main: function(){
        var now = Date.now();
        var delta = now - DYECF.then;

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
    