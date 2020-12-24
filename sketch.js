var d,sadd,happyd, database,food1,feed,addFood,fedTime,lastFed,foodS,foodStock;

function preload(){
sadd=loadImage("images/dogImg.png");
happyd=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(900,600);
  food1 = new food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  d=createSprite(800,200,150,150);
  d.addImage(sadd);
  d.scale=0.15;
  button=createButton("Feed the Dog");
  button.position(700,95);
  button.mousePressed(fed);
  moreFood=createButton("Add Food");
  moreFood.position(800,95);
  moreFood.mousePressed(addFoods);
}

function draw() {
  background(66, 108, 245);
  food1.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill("yellow");
  textSize(20);
  
  if(lastFed>=12){
    text("last fed : "+ lastFed%12 + " PM", 330,38);
   }else if(lastFed==0){
     text("last fed : 12 AM",350,30);
   }else{
     text("last fed : "+ lastFed + " AM", 330,38);
   }
 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  food1.updateStock(foodS);
}

function fed(){
  d.addImage(happyd);

  food1.updateStock(food1.getFoodStock()-1);
  database.ref('/').update({
    Food:food1.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}