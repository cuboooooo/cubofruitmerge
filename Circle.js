
function Circle(x, y, r) {
  this.body = Bodies.circle(x, y, r, {friction:0.4, 
                            restitution: 0.4, density: 0.02 })
  // mess with friction, density, and restitution(elasticity) until it feels right.
  // rolling too much   -- inc fric
  // sliding too much   -- inc fric
  // not rolling enough -- dec fric inc dens
  
  this.r = r
  
  Composite.add(world, this.body)
  
  this.showVerts = function() {
    var verts = this.body.vertices;
    push()
    beginShape()
    for (let v of verts){
      vertex(v.x,v.y)
    }
    vertex(verts[0].x, verts[0].y)
    endShape()
    pop()
  }
  this.show = function() {
    var pos = this.body.position;
    var r = this.body.circleRadius
    push()
    translate(pos.x,pos.y)
    switch(r) {
      case sizes[0]:
        //fill('#8a3b73')
        push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(grape, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[1]:
        //fill('#f82237')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(cherry, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[2]:
        // fill('#8ab602')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(lime, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[3]:
        // fill('#ffc225')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(lemon, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[4]:
        // fill('#d5e03f')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(kiwi, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[5]:
        // fill('#d5e03f')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(peach, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[6]:
        // fill('#fdc87a')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(apple, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[7]:
        // fill('#fff9e5')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(dragonfruit, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[8]:
        // fill('#e7eaf3')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(pineapple, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[9]:
        // fill('#f6d008')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(coconut, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[10]:
        // fill('##e9e7ea')
      push()
        rotate(this.body.angle)
        imageMode(CENTER)
        image(watermelon, 0, 0, r*2, r*2)
        pop()
        break
      case sizes[11]:
        fill('#f00')
        circle(0,0,this.r*2-1)
        break
    }
    rotate(this.body.angle)
    if (r == sizes[11]){
    circle(0, 0, this.r*2-1) // -1 makes it look better
    line(0,0, 0, this.r-1)}

    pop()
  }
}