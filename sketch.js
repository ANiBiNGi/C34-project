//Create variables here
var dog, happyDog, database, foodStock;
var foodS = 0
function preload(){
  //load images here
  HappydogIMG = loadImage("images/dogImg1.png")
  dogIMG = loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,10,10);
  dog.addImage(dogIMG)
  dog.scale = 0.2

  foodStock = database.ref("food");
  foodStock.on("value",readStock);

}


function draw() {  
background(46, 139, 87);

if(keyIsDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(HappydogIMG)
}else{
  dog.addImage(dogIMG)
}
  drawSprites();
  //add styles here
  fill("black")
  scale(1.1)
  text("Food Remaining: " + foodS, 170,150);

}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0
  }else{
    x = x-1
  }
database.ref("/").update({food:x})
}

