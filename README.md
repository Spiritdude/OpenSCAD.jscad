
<h1>Description</h1>
Some wrapper functions to ease the translation from OpenSCAD (.scad) to OpenJsCad (.jscad).

<img src="sshot.png">

<h2>Purpose</h2>
OpenJsCad is object oriented, and usually this imposes more verbosity of the source-code, whereas OpenSCAD has a simple syntax many developers are familiar with already, but unfortunately OpenJsCad introduced non-intuitive equivalents (essentially one has to memorize a new set of arguments), therefore a few brief wrapping functions (openscad.jscad) provide a much easier translation of existing .scad to .jscad files:

<h2>Example</h2>
<table><tr><td valign=top>
<b>.scad</b>

<pre>
union() {
      //cube(size=[30,30,0.1],center=true);
      translate([3,0,0]) cube();
      difference() {
         rotate([0,-45,0]) cube(size=[8,7,3],center=true);
         sphere(r=3,$fn=20,center=true);
      }
      translate([10,5,5]) scale([0.5,1,2]) sphere(r=5,$fn=50);
      translate([-15,0,0]) cylinder(r1=2,r2=0,h=10,$fn=20);
     
   for(i=[0:19]) {
      rotate([0,i/20*360,0]) 
      translate([i,0,0]) 
      rotate([0,i/20*90,i/20*90,0]) 
      cube(size=[1,1.2,.5],center=true);
   }
}
</pre>
</td><td valign=top width=50%>
<pre>
function main() {  
   var cubes = new Array();
   for(i=0; i&lt;20; i++) {
      cubes[i] = rotate([0,i/20*360,0], 
         translate([i,0,0], 
         rotate([0,i/20*90,i/20*90,0], 
         cube({size:[1,1.2,.5],center:true}))));
   }
   return union(
      //cube({size:[30,30,0.1],center:true}),
      translate([3,0,0],cube()),
      difference(
         rotate([0,-45,0], cube({size:[8,7,3],center:true})),
         sphere({r:3,fn:20,center:true})
      ),
      translate([10,5,5], scale([0.5,1,2], sphere({r:5,fn:50}))),
      translate([-15,0,0], cylinder({r1:2,r2:0,h:10,fn:20})),
      cubes
   );
}
</pre>
</td></tr></table>

<h2>Example</h2>
Go to http://joostn.github.com/OpenJsCad/processfile.html and paste <tt>openscad.jscad</tt> in there.


