var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var ftd;
var foodObj;
var feed, foodStock;
var feed, lastFed;
var foodStockV;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
  ftd=createButton("Feed the Dog");
  ftd.position(900,95);
  ftd.mousePressed(feedDog);


}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref('FeedTime');
  fedTime.on('value', function(data){
    lastFed = data.val();
  });
 
  //write code to display text lastFed time here
  if(lastFed > 12){
    textSize(12);
    fill(0);
    text("Last Feed" + lastFed + "pm", 380, 30 );
  }
  else{
    textSize(12);
    fill(0);
    text("Last Feed" + lastFed + "am", 380, 30 );
  }
  drawSprites();
}



//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

 foodStockV = foodObj.getFoodStock();
 if(foodStockV <= 0 ){
  foodObj.updateFoodStock(foodStockV*0);
 
}
else{
  foodObj.updateFoodStock(foodStockV - 1);
  
}
//write code here to update food stock and last fed time
database.ref('/').update({

  Food : foodObj.getFoodStock(),
  FeedTime : hour()

});

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
