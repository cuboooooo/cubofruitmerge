
function preload() {
  grape = loadImage('images/grape.jpeg')
  cherry = loadImage('images/cherry.jpeg')
  lime = loadImage('images/lime.jpeg')
  lemon = loadImage('images/lemon.jpeg')
  kiwi = loadImage('images/kiwi.jpeg')
  peach = loadImage('images/peach.jpeg')
  apple = loadImage('images/apple.jpeg')
  dragonfruit = loadImage('images/dragonfruit.jpeg')
  coconut = loadImage('images/coconut.jpeg')
  pineapple = loadImage('images/pineapple.jpeg')
  watermelon = loadImage('images/watermelon.png')
  
}

function setup() {
  console.log('hey if you see this tell me if you see anything that looks like "invisible fruits" in the game. I tried to fix it, but I dont know if it worked.')
  createCanvas(166*2, 215*2+50) // 16:9
  engine = Engine.create()
  world = engine.world
  
  // default 6 and 4 respectively
  engine.positionIterations = 12 // this fixes circles elastically
  engine.velocityIterations = 12 // phasing through each other
  
  let wallThickness = 10000
  let options = { isStatic: true, friction : 0, frictionStatic: 0, density: 100}
  groundL = Bodies.rectangle(-wallThickness/2,height/2,wallThickness,wallThickness, options)
  groundR = Bodies.rectangle(width+wallThickness/2,height/2,wallThickness,wallThickness, options)
  groundT = Bodies.rectangle(width/2,-wallThickness/2,wallThickness,wallThickness, options)
  groundB = Bodies.rectangle(width/2,height+wallThickness/2,wallThickness,wallThickness, options)
  
  Composite.add(world, groundT)
  Composite.add(world, groundR)
  Composite.add(world, groundB)
  Composite.add(world, groundL)


  Runner.run(engine)
  
  
  let w = max(grape.width, grape.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2-1, w/2, w, w-1);
  grape.mask(mask)
  
  w = max(cherry.width, cherry.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2-1, w/2, w, w-1);
  cherry.mask(mask)
  
  w = max(lime.width, lime.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2, w/2, w+1, w+1);
  lime.mask(mask)
  
  w = max(lemon.width, lemon.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2-1, w/2, w, w);
  lemon.mask(mask)
  
  w = max(kiwi.width, kiwi.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2, w/2, w, w);
  kiwi.mask(mask)
  
  w = max(peach.width, peach.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2, w/2, w, w);
  peach.mask(mask)
  
  w = max(apple.width, apple.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2, w/2, w+1, w);
  apple.mask(mask)
  
  w = max(dragonfruit.width, dragonfruit.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2, w/2, w, w);
  dragonfruit.mask(mask)
  
  w = max(coconut.width, coconut.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2, w/2, w, w);
  coconut.mask(mask)
  
  w = max(pineapple.width, pineapple.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2-1, w/2, w, w-1);
  pineapple.mask(mask)
  
  w = max(watermelon.width, watermelon.height)
  mask = createGraphics(w, w);
  mask.push()
  mask.fill(0,0,0,0)
  mask.noStroke()
  mask.rect(-10, -10, w+20, w+20)
  mask.pop()
  mask.noStroke()
  mask.ellipse(w/2, w/2, w, w);
  watermelon.mask(mask)
}