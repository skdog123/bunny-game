class Link2{
    constructor(bodyA,bodyB,)
    {
      var lastlink2 = bodyA.body.bodies.length-1;
      console.log(lastlink2);
      this.link2 = Constraint.create(
        {
          
          bodyA:bodyA.body.bodies[lastlink2],
          pointA:{x:0,y:0},
          bodyB:bodyB,
          pointB:{x:0,y:0},
          length:-10,
          stiffness:0.01
        });
        World.add(engine.world,this.link2);
    } 

    detach()
    {
      World.remove(engine.world,this.link2);
     
    }
}

