var DYECFObj = DYECFObj || {};

DYECFObj.crossfiter = function(){
    this.speed = 256;
    this.x = 480;
    this.y = 0;
    this.image = null;
    this.score = 0;
};

DYECFObj.crossfiter.prototype.setImage = function(imagePath){
    this.image = new Image();
    this.image.src = imagePath;  
};

DYECFObj.barbell = function(){
    this.x = 0;
    this.y = 0;
    this.image = null;
};

DYECFObj.barbell.prototype.setImage = function (imagePath) {
    this.image = new Image();
    this.image.src = imagePath;
};

var DYECF = (function () {  
    var context = null;
    var canvas = null;
    var crossfiter = null;
    var barbell = null;
    var bgImage = null;
    var then = null;
    var keysDown = {};
    
    var init = function(container){
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        canvas.width = 512;
        canvas.height = 480;
        container.appendChild(canvas);
        
        initBackgroundImage();
        initCrossfiter();
        initBarbell();
        addEventListeners();
    };
    
    var addEventListeners = function () {
        addEventListener("keydown", function(e){
            keysDown[e.keyCode] = true;
        }, false);
        
        addEventListener("keyup", function(e){
            delete keysDown[e.keyCode];
        }, false);
    };
    
    var initCrossfiter = function(){
        crossfiter = new DYECFObj.crossfiter();
        crossfiter.setImage("images/crossfiter.png");
    };
    
    var initBarbell = function(){
        barbell = new DYECFObj.barbell();
        barbell.setImage("images/barbell.png");
    };
    
    var initBackgroundImage = function() {
        bgImage = new Image();
        bgImage.src = "images/background.png";
    };
    
    var update = function(modifier){
        if(38 in keysDown){ //player holding up
            crossfiter.y -= crossfiter.speed * modifier;
        }
            
        if(40 in keysDown){ //player holding down
            crossfiter.y += crossfiter.speed * modifier;
        }
            
        if(37 in keysDown){ //player holding left
            crossfiter.x -= crossfiter.speed * modifier;
        }
            
        if(39 in keysDown){ //player holding right
            crossfiter.x += crossfiter.speed * modifier;
        } 
        
        //Are they touching?
        if(
            crossfiter.x <= (barbell.x + 32) 
            && barbell.x <= (crossfiter.x + 32) 
            && crossfiter.y <= (barbell.y + 32) 
            && barbell.y <= (crossfiter.y + 32)
        ){
            ++crossfiter.score;
            reset();
        }         
    };
    
    var reset = function(){
        barbell.x = 32 + (Math.random() * (canvas.width - 32));
        barbell.y = 32 + (Math.random() * (canvas.height - 32));
    };
    
    var render = function(){
        context.drawImage(bgImage, 0, 0);    
        context.drawImage(crossfiter.image, crossfiter.x, crossfiter.y);
        context.drawImage(barbell.image, barbell.x, barbell.y);
        
        context.fillStyle = "rgb(250, 250, 250)";
        context.front = "24px Helvetica";
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillText("Barbells lifted: " + crossfiter.score, 10, 10);
    };
    
    var main = function(){
        var now = Date.now();
        var delta = now - then;
        update(delta/1000);
        render();
        then = now;
        //Request to do this again ASAP
        requestAnimationFrame(main);
    };
    
    var requestAnimationFrame = function(func1){
        var w = window;
        requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;  
        requestAnimationFrame(func1);
    };
    
    var DYECF = function(){};
    DYECF.prototype.startGame = function(container){
        init(container);
        then = Date.now();
        reset();
        main();
    };
    
    return DYECF;
})();
