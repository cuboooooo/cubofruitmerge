



function Box(x, y, w, h) {
  this.body = Bodies.rectangle(x, y, w, h)
  this.w = w
  this.h = h
  
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
    push()
    rectMode(CENTER)
    translate(pos.x,pos.y)
    rotate(this.body.angle)
    rect(0, 0, this.w-1, this.h-1)
    pop()
  }
}