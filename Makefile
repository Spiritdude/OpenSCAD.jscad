VERSION=0.003
NAME=openscad.jscad

all::
	@echo "make tests" 

tests::
	./openjscad example.jscad -oexample.stl

clean::
	rm -f example.stl

# --- developers only below

github::
	git remote set-url origin git@github.com:Spiritdude/OpenSCAD.jscad.git
	git push -u origin master

dist::	clean
	cd ..; tar cfz Backup/${NAME}-${VERSION}.tar.gz "--exclude=*.git/*" OpenSCAD.jscad/

backup::	clean
	scp ../Backup/${NAME}-${VERSION}.tar.gz the-labs.com:Backup/

edit::
	dee4 openjscad openscad.js openscad.jscad example.jscad example.scad Makefile README.md 

