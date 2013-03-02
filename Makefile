VERSION = 0.004
NAME = openscad.jscad
LIB = /usr/local/lib/openjscad/  # -- if you change it, change also entry in openjscad:'var lib = '/....';

all::
	@echo "make install clean tests" 

tests::
	cd examples; make 

clean::
	cd examples; make clean

install::
	sudo scp openjscad /usr/local/bin/
	#sudo test -d ${LIB} || mkdir ${LIB}
	mkdir -p ${LIB};
	sudo scp *.js ${LIB}
	
deinstall::
	sudo rm -f ${LIB}/csg.js ${LIB}/openscad.js
	sudo 

# --- developers only below

github::	clean
	git remote set-url origin git@github.com:Spiritdude/OpenSCAD.jscad.git
	git push -u origin master

dist::	clean
	cd ..; tar cfz Backup/${NAME}-${VERSION}.tar.gz "--exclude=*.git/*" OpenSCAD.jscad/

backup::	clean
	scp ../Backup/${NAME}-${VERSION}.tar.gz the-labs.com:Backup/

edit::
	dee4 openjscad openscad.js openscad.jscad Makefile README.md examples/*

