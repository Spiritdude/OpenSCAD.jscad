VERSION=0.002
NAME=openscad.jscad

all::
	@echo "nothing to do" 

# --- developers only below

github::
	git remote set-url origin git@github.com:Spiritdude/OpenSCAD.jscad.git
	git push -u origin master

dist::	clean
	cd ..; tar cfz Backup/${NAME}-${VERSION}.tar.gz "--exclude=*.git/*" OpenSCAD.jscad/

backup::	clean
	scp ../Backup/${NAME}-${VERSION}.tar.gz the-labs.com:Backup/

edit::
	dee4 openscad.jscad example.scad Makefile README.md 

