var Dog, FoodStock, DB, foodS, Feed, AddFood, Feedtime, LastFeed, foodObj;


function preload()
{
  DogI = loadImage("dogImg.png");
  DogHappyI = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  DB = firebase.database();
  FoodStock = DB.ref('Food');
  FoodStock.on("value", readStock);
  foodObj = new Food()

  Feed = createButton("Feed Bruno");
  Feed.position(700, 95);
  Feed.mousePressed(feedDog);

  AddFood = createButton("Add Food");
  AddFood.position(800, 95);
  AddFood.mousePressed(addFood);
 
  Dog = createSprite(850,230,10,5);
  Dog.scale = 0.24
}

function draw() {  
  background("grey");
  FeedTime = DB.ref("FeedTime");
  FeedTime.on("value", function(data){
    LastFeed = data.val();
  })
  textSize(22);
  fill("white");
    if(LastFeed >= 12){
        text("Last fed at : "+ LastFeed % 12 + " PM", 350, 30);
    }
    else if(LastFeed === 0){
        text("Last fed at : 12 AM", 350, 30);
    }
    else{
        text("Last fed at :"+ LastFeed + "AM", 350, 30);
    }

    if (foodS === 0){
     foodS = 50;
    }
    foodObj.display();
    drawSprites();
    fill("orange");
    textSize(32)
    text("BRUNO", 800, 68);
  }

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  Dog.addImage(DogHappyI)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
   DB.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour ()
   })
}

  function addFood(){
    foodS++
    DB.ref('/').update({
      Food:foodS
    })
  }

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x - 1
  }
  DB.ref('/').update({
    Food:x
  })
}