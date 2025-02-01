// based on game 'I want watermelon' from the Apple App Store
// no assets were stolen, they were just recreated pixel by pixel from screenshots 😁😜

// TODO:

//DONE// check for all collisions again after a collision is found.
//DONE// if 2 sets of circles are colliding at the same time, one isnt RENDERED, but created, leading to invisible balls.
//DONE// i think this is whats happening.

// add score,
//// +1 for 2 grapes colliding, +2 for cherries, etc

// add watermelon win system
// add shaker?
// add so that you cant spawn a new fruit until the others settle

// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Body = Matter.Body;

var engine;
var boxes = [];
var circles = [];
var world;
var objSelected = null;
var nextR = 10;
// sizes with game width 166 by 215
//           gr  ch  li  le  ki  pe  ap  dg  pi  co   wa
var sizes = [10, 15, 20, 25, 33, 37, 44, 60, 65, 75, 110, 220];

let grape,
  cherry,
  lime,
  lemon,
  kiwi,
  peach,
  apple,
  dragonfruit,
  coconut,
  pineapple,
  watermelon;
let mask;

let circleOverLine = false;
let waitStart = 0;
let gameOver = false;

let score = 0;
let collCirc; // debugging

let readyForNext = true
let settledTimer = -1
let mustBeSettledTimer = true
// i left in the infrastructure for the next fruit being ready once everything settles, but I just overwrote it with a 1 second timer, about the time it takes for a given fruit to hit the bottom of the map

function mousePressed() {
  if (readyForNext){
  spawnFruit();}
}

function keyReleased() {
  if (key == "d") {
    objSelected = null;
  }
}

function spawnFruit() {
  mustBeSettledTimer = frameCount
  let x = mouseX;
  if (mouseX > width - nextR) {
    x = width - nextR;
  } // stops the velocity glitching causing a gameOver
  if (mouseX < nextR) {
    x = nextR;
  }
  circles.push(new Circle(x, nextR, nextR));
  // in python this would be as easy as [sizes[0]]*3 + [sizes[1]]*2 ... etc
  let randarr = Array(3)
    .fill(sizes[0])
    .concat(
      Array(3).fill(sizes[1]),
      Array(4).fill(sizes[2]),
      Array(2).fill(sizes[3]),
      Array(1).fill(sizes[4])
    );
  nextR = random(randarr);
}

function keyPressed() {
  switch (key) {
    case "q":
      spawnFruit();
      break;
    case "w":
      circles.push(new Circle(mouseX, 10, 10));
      break;
    case "d":
      if (objSelected == null) {
        for (let i of new Array(circles.length).keys()) {
          if (
            dist(
              mouseX,
              mouseY,
              circles[i].body.position.x,
              circles[i].body.position.y
            ) < circles[i].r
          ) {
            objSelected = i;
            break;
          }
        }
      }
      break;
    case "e":
      boxes.push(new Box(mouseX, mouseY, 50, 50));
      break;
    case "z":
      spawnFruit();
      break;
    case "x":
      spawnFruit();
      break;
    case "c":
      spawnFruit();
      break;
    case "v":
      spawnFruit();
      break;
  }
  if (keyCode == 32) {
    circles.push(new Circle(mouseX, 10, nextR));
    nextR = random(sizes.slice(0, 3));
  }
}

function scoreAdd(nscore) {
  score += nscore;
}

function draw() {
  frameRate(60)
  background(color("#fed198"));

    let skipSettleCheck = false
  if (frameCount - mustBeSettledTimer > 60) {
    readyForNext = true
    skipSettleCheck = true
  }
  
  if (keyIsDown(72)) { // h
      for(let circ of circles){
        var cBody = circ.body
        Body.setAngularVelocity(cBody, (cBody.angularVelocity + 0.001)*1.1)
      }
  }
  
  if (keyIsDown(68)) {
    // d 

    if (objSelected != null) {
      var circ = circles[objSelected].body;
      let velocity = {
        x: mouseX - circ.position.x,
        y: mouseY - circ.position.y,
      };
      Body.setVelocity(circ, velocity);
    }
    
    if (keyIsDown(83)){ // s
      if (objSelected != null) {
        var circ = circles[objSelected].body;
        Body.setAngularVelocity(circ, (circ.angularVelocity + 0.001)*1.1)
      }
    }
    
    if (keyIsDown(65)){ // a
      if (objSelected != null) {
        var circ = circles[objSelected].body;
        Body.setAngularVelocity(circ, (circ.angularVelocity - 0.001)/1.1)
      }
    }
  }

  checkCircleCollisions();
  checkGameOverCollisions();
  if (!skipSettleCheck){
  checkForSettling();}

  for (let boxe of boxes) {
    boxe.show();
  }
  for (let circlee of circles) {
    circlee.show();
  }
  rectMode(CENTER);
  // rect(0,200,10, 400)
  // rect(400,200,10, 400)
  // rect(200,0,400, 10)
  // rect(200,400,400, 10)
  //rect(ground.position.x, ground.position.y, 400,10)

  if(readyForNext) {
  push();
  switch (nextR) {
    case sizes[0]:
      push();
      imageMode(CENTER);
      image(grape, mouseX, nextR, nextR * 2, nextR * 2);
      pop();
      break;
    case sizes[1]:
      push();
      imageMode(CENTER);
      image(cherry, mouseX, nextR, nextR * 2, nextR * 2);
      pop();
      break;
    case sizes[2]:
      push();
      imageMode(CENTER);
      image(lime, mouseX, nextR, nextR * 2, nextR * 2);
      pop();
      break;
    case sizes[3]:
      push();
      imageMode(CENTER);
      image(lemon, mouseX, nextR, nextR * 2, nextR * 2);
      pop();
      break;
    case sizes[4]:
      push();
      imageMode(CENTER);
      image(kiwi, mouseX, nextR, nextR * 2, nextR * 2);
      pop();
      break;
  }
  //circle(width-nextR,0+nextR,nextR*2)
  pop();
  }

  // image(grape,0,0) 512
  // image(cherry,0,35) 256
  // image(lime,0, 80) 128
  // image(lemon,0, 130) 64
  // image(kiwi, 0, 200) 32
  // image(apple, 0, 280) 16
  // image(dragonfruit, 0, 380) 8
  // image(coconut, 50, 0) 4
  // image(pineapple, 70, 90) 2
  // image(watermelon, 95, 220) 1

  push();
  
  add = 0;
  if (circleOverLine) {
    strokeWeight(2);
    if (frameCount % 20 < 10) {
      drawingContext.setLineDash([20, 20]);
    } else {
      drawingContext.setLineDash([20, 20]);
      add = 20;
    }
  }
  stroke("#f00");
  line(0 - add, 50, width + add, 50);
  pop();

  if (gameOver) {
    textSize(50);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2);
    noLoop();
  }

  push();
  textSize(20);
  textAlign(LEFT);
  strokeWeight(3);
  stroke("#fedfb7");
  fill("#fff6ea");
  text(score, 10, 20);
  pop();
  // if (collCirc != null){circle(collCirc[0], collCirc[1], collCirc[2])}
}

function checkCircleCollisions() {
  for (let c1 of circles) {
    for (let c2 of circles) {
      if (c1 !== c2) {
        if (c1.r == c2.r) {
          // matchable
          let x1 = c1.body.position.x;
          let y1 = c1.body.position.y;
          let x2 = c2.body.position.x;
          let y2 = c2.body.position.y;
          if (dist(x1, y1, x2, y2) < c1.r + c2.r) {
            // collision!
            let size = sizes.indexOf(c1.r);
            let l = circles.push(
              new Circle((x1 + x2) / 2, (y1 + y2) / 2, sizes[size + 1])
            );
            collCirc = [(x1 + x2) / 2, (y1 + y2) / 2, sizes[size + 1]];
            let newCircle = circles[l - 1].body;

            // preserve velocity

            let vel = Matter.Vector.add(c1.body.velocity, c2.body.velocity);
            Body.setVelocity(newCircle, vel);

            // could preserve momentum like this
            // let m1 = c1.body.mass, m2 = c2.body.mass, v1 = c1.body.velocity, v2 = c2.body.velocity
            // let vel = {x: ((m1*v1.x+m2*v2.x)/(m1+m2)), y: ((m1*v1.y+m2*v2.y)/(m1+m2))}

            // apply little force on the new dot in the diretion perpendicular to the angle they collided at
            let v = {
              x: -(c2.body.position.x - c1.body.position.x),
              y: c2.body.position.y - c1.body.position.y,
            };
            let forceMult = 0.005;
            Body.applyForce(newCircle, newCircle.position, {
              x: cos(v.x) * forceMult * newCircle.mass,
              y: sin(v.y) * forceMult * newCircle.mass,
            });
            c1Idx = circles.indexOf(c1);
            c2Idx = circles.indexOf(c2);

            scoreAdd(sizes.indexOf(c1.r) + 1);

            // move the new circle up a bit
            // newCircle.position.y -= 10

            objSelected = null;

            circles.splice(circles.indexOf(c1), 1);
            Composite.remove(world, c1.body);
            circles.splice(circles.indexOf(c2), 1);
            Composite.remove(world, c2.body);

            // RECURSIVELY LOOK FOR ANOTHER COLLISION
            // TO SOLVE THE RACE CONDITION OF 2 COLLISIONS
            // HAPPENING IN THE SAME FRAME AND ONLY
            // ONE GETTING CALCULATED
            checkCircleCollisions();
          }
        }
      }
    }
  }
}

function checkGameOverCollisions() {
  noCircsOverLine = true;
  for (let c of circles) {
    let x = c.body.position.x;
    let y = c.body.position.y;
    let r = c.r;
    let s = c.body.speed;

    if (s < 0.2 && y < 50 + r) {
      circleOverLine = true;
      noCircsOverLine = false;
      // CIRCLE IS OVER THE LINE. CHECK ALL FOR SETTLING
      settled = true;
      for (let c1 of circles) {
        if (c1.body.speed > 0.2) {
          // if one is moving
          settled = false;
        }
      }
      if (settled) {
        if (waitStart == 0) {
          waitStart = frameCount;
        } else if (frameCount - waitStart > 60) {
          // WAIT A SECOND FOR GAME OVER
          gameOver = true;
        }
      } else {
        waitStart = 0;
        // we good
      }
    }
  }
  if (noCircsOverLine) {
    circleOverLine = false;
  }
}

function checkForSettling() {
  settled = true
      for (let c1 of circles) {
        if (c1.body.speed > 0.2) {
          // if one is moving
          settled = false;
        }
      }
  if (settled == true) {
    if (settledTimer == -1) {
      settledTimer = frameCount
    }
    else if (frameCount - settledTimer > 60) {
      readyForNext = true
    }
  }
  else {
    settledTimer = -1
    readyForNext = false // there are MUCH better ways to format this
  }
}