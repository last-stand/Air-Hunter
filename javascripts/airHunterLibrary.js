var init = function(){
  var imageObj = document.getElementById("plane");
  imageObj.style.left = "0%";
  generateEnemyAirForce();
};


var leftArrowPressed = function() {
    var warField = document.getElementById("war_field");
    var leftPosition = warField.getBoundingClientRect().left;
    var airCraft = document.getElementById("plane");
    if(leftPosition <= airCraft.getBoundingClientRect().left-9){
      airCraft.style.left = parseInt(airCraft.style.left) - 10 + 'px';
    }
};

var rightArrowPressed = function() {
    event.preventDefault();
    var warField = document.getElementById("war_field");
    var rightPosition = warField.getBoundingClientRect().right;
    var airCraft = document.getElementById("plane");
    if(rightPosition >= airCraft.getBoundingClientRect().right+9){
      airCraft.style.left = parseInt(airCraft.style.left) + 10 + 'px';
    }
};

var upArrowPressed = function(){
    event.preventDefault();
    var missile = document.getElementById("missile");
    if(missile == undefined || missile.style.display == "none"){
      var airCraft = document.getElementById("plane");
      var top = airCraft.getBoundingClientRect().top + 15;
      var left = airCraft.getBoundingClientRect().left+Math.floor(airCraft.width/2)-10;
      generateSound("./sounds/MissileFire.mp3");
      generateMissile(top,left);
     } 
};

var generateSound = function(source){
  soundEfx = document.getElementById("soundEfx");
  soundEfx.src = source;
   soundEfx.play();
};

var generateMissile = function(top,left){
    var mDiv = document.getElementById("mDiv");
    mDiv.innerHTML = "<img id='missile' src='./images/m1.png' "+
    "style='position:absolute;' height='6%' width='1.2%'>"
    var missile = document.getElementById("missile");
    missile.style.top = top + "px";
    missile.style.left = left - Math.floor(missile.width/2) + "px";
    fireMissile();
};

var fireMissile = function(){
    var warField = document.getElementById("war_field");
    var war_fieldTop = warField.getBoundingClientRect().top;
    var missile = document.getElementById("missile");
    var missileTop = parseInt(missile.style.top);
    missileTop = missileTop - 10;
    missile.style.top = missileTop+"px";
    var timer = setTimeout("fireMissile()",20);
    if (missileTop <= war_fieldTop){
      missile.style.display = "none"; 
      clearTimeout(timer);
    }
};

var moveSelection = function(event) {               
  switch (event.keyCode) {
      case 37:
          leftArrowPressed(event);
      break;

      case 39:
          rightArrowPressed(event);
      break;

      case 38:
          upArrowPressed();
      break;
  }
};

/* Global Objects*/
var graphics = new Array(2);
var Image0 = new Image();
Image0.src = graphics[0] = "./images/enemy_f15.png";
var Image1 = new Image();
Image1.src = graphics[1] = "./images/saabEnemy.png";
var Image2 = new Image();
Image2.src = graphics[2] = "./images/enemyM1.png";
var Image3 = new Image();
Image3.src = graphics[3] = "./images/enemyM1.png";
var Amount = 4;
var Ypos = new Array();
var Xpos = new Array();
var speed = new Array();
var step = new Array();
var STOP = false;

var generateEnemyAirForce = function(){
  for(i=0;i<Amount;i++) {
    var planeNumber = getRandomInt(0,graphics.length-1);
    var rndPic = graphics[planeNumber];
    document.write('<img id="enemyPlane'+i+'" src="'+rndPic+'"class="enemy">');
    setEnemyPlanePosition(i);
    step[i] = Math.random()*0.1+0.05;
  }
  fly();
};

var fly = function(){
  if(STOP){
    clear();
    return;
  }
  var winHeight = document.body.clientHeight-144;
  var winWidth = document.body.clientWidth-50;
  for(i=0;i<Amount;i++) {
      sy = speed[i]*Math.sin(90*Math.PI/180);
      Ypos[i] += sy;
      if(Ypos[i]>winHeight) {
          setEnemyPlanePosition(i);
      }
      else
      {
        document.getElementById("enemyPlane"+i).style.left = Math.min(winWidth,Xpos[i])-100;
        document.getElementById("enemyPlane"+i).style.top = Ypos[i];
      }
  }
  setTimeout('fly()',60);
}

setTimeout("STOP=true",300000);

var clear = function() {
    for(i=0;i<Amount;i++)
    document.getElementById("enemyPlane"+i).style.display='none';
}     

var setEnemyPlanePosition = function(planeNumber){
  Ypos[planeNumber] = 88;
  Xpos[planeNumber] = generateXposition();
  speed[planeNumber] = Math.random()*5+3;
};

var generateXposition = function(){
  var warField = document.getElementById("war_field");
  var war_fieldLeft = warField.getBoundingClientRect().left+92;
  var war_fieldRight = warField.getBoundingClientRect().right+92;
  return getRandomInt(war_fieldLeft,war_fieldRight);
};

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};