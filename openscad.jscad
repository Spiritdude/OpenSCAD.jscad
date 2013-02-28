// openscad.jscad, a few functions to simplify coding OpenSCAD-like
//    written by Rene K. Mueller <spiritdude@gmail.com>, License: GPLv2
//
// Version: 0.002
//
// Description:
// Helping to convert OpenSCAD .scad files to OpenJSCad .jscad files with 
// little editing; e.g. drop this file at 
//     http://joostn.github.com/OpenJsCad/processfile.html
//
// History:
// 2013/02/28: 0.002: center:false default
// 2013/02/27: 0.001: first version, center: true|false support

// original .scad file:
// union() {
//       //cube(size=[30,30,0.1],center=true);
//       translate([3,0,0]) cube();
//       difference() {
//          rotate([0,-45,0]) cube(size=[8,7,3],center=true);
//          sphere(r=3,$fn=20,center=true);
//       }
//       translate([10,5,5]) scale([0.5,1,2]) sphere(r=5,$fn=50);
//       translate([-15,0,0]) cylinder(r1=2,r2=0,h=10,$fn=20);
//      
//    for(i=[0:19]) {
//       rotate([0,i/20*360,0]) translate([i,0,0]) rotate([0,i/20*90,i/20*90,0]) cube(size=[1,1.2,.5],center=true);
//    }
// }

function main() {  // -- the same in .jscad :-)
   var cubes = new Array();
   for(i=0; i<20; i++) {
      cubes[i] = rotate([0,i/20*360,0], translate([i,0,0], rotate([0,i/20*90,i/20*90,0], cube({size:[1,1.2,.5],center:true}))));
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


// wrapper functions for OpenJsCAD:

function union() { 
   var o,i,a=arguments; 
   if(a[0].length) a = a[0]; 
   for(o=a[0],i=1; i<a.length; i++) { 
      o = o.union(a[i]); 
   } 
   return o; 
}

function difference() { 
   var o,i,a=arguments; 
   if(a[0].length) a = a[0]; 
   for(o=a[0],i=1; i<a.length; i++) { 
      o = o.subtract(a[i]); 
   } 
   return o; 
}

function intersect() { 
   var o,i,a=arguments; 
   if(a[0].length) a = a[0]; 
   for(o=a[0],i=1; i<a.length; i++) { 
      o = o.intersect(a[i]); 
   } 
   return o; 
}

function cube(p) { 
   var s = 1, v, off = 0;
   if(p&&p.length) v = p;		
   if(p&&p.size&&p.size.length) v = p.size;
   if(p&&p.size&&!p.size.length) s = p.size;
   if(p&&!p.size&&!p.length&&p.center===undefined) s = p;
   off = s/2;
   if(p&&p.center==true) off = 0;
   var o = CSG.cube({radius:s/2});
   if(off) o = o.translate([off,off,off]);
   if(v&&v.length) o = o.scale(v);
   return o;
}

function sphere(p) {
   var r = 1;
   var fn = 32;
   //var zoff = 0; // sphere() in openscad has no center:true|false
   if(p&&p.r) r = p.r;
   if(p&&p.fn) fn = p.fn;
   if(p&&!p.r&&!p.fn) r = p;
   //zoff = r;
   //if(p&&p.center==true) zoff = 0;
   var o = CSG.sphere({radius:r,resolution:fn});
   //if(zoff) o = o.translate([0,0,zoff]);
   return o;
}

function cylinder(p) {
   var r1 = 1, r2 = 1, h = 1, fn = 32; var a = arguments;
   var zoff = 0;
   if(p&&p.r) {
      r1 = p.r; r2 = p.r; if(p.h) h = p.h;
   }
   if(p&&(p.r1||p.r2)) {
      r1 = p.r1; r2 = p.r2; if(p.h) h = p.h;
   } 
   if(a&&a[0].length) {
      a = a[0]; r1 = a[0]; r2 = a[1]; h = a[2]; if(a.length==4) fn = a[3];
   }
   if(p&&p.fn) fn = p.fn;
   if(p&&p.center==true) zoff = -h/2;
   var o = CSG.cylinder({start:[0,0,0],end:[0,0,h],radiusStart:r1,radiusEnd:r2,resolution:fn});
   if(zoff) o = o.translate([0,0,zoff]);
   return o;
}

function polyhedron() { 
   OpenJsCad.log("polyhedron() not yet implemented"); 
}
   

function translate(v,o) { 
   return o.translate(v); 
}

function scale(v,o) { 
   return o.scale(v); 
}

function rotate(v,o) { 
   return o.rotateX(v[0]).rotateY(v[1]).rotateZ(v[2]); 
}

function linear_extrude(p) {
   OpenJsCad.log("linear_extrude() not yet implemented");
}
function rotate_extrude(p) {
   OpenJsCad.log("rotate_extrude() not yet implemented");
}

function square(p) {
}
function circle(p) {
}
function polygon(p) {
}

