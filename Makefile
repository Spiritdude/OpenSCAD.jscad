VERSION = 0.005
NAME = openscad.jscad

PREFIX ?= /usr/local/
LIB    ?= $(PREFIX)/lib/openjscad/
BIN    ?= $(PREFIX)/bin/

JSCONF   = config.js
EXEC_PRE = openjscad.proto
EXEC_FIN = openjscad

all::
	@echo "make install clean tests" 

tests::
	cd examples; make 

clean::
	cd examples; make clean
	rm openjscad config.js

config.js::
		# Gen config | STRIP whitespace > config.js
		printf "                      \
			var prefix  = '${PREFIX}';  \n\
			var lib     = '${LIB}';     \n\
			var bin     = '${BIN}';     \n\
			var name    = '${NAME}';    \n\
			var version = '${VERSION}'; \n\
			var jsconf  = '${JSCONF}'   \n\
		" | sed 's/^\s*//; s/\s*$$//' > "${JSCONF}"
		# Insert into executable
		sed '2r ${JSCONF}' "${EXEC_PRE}" > "${EXEC_FIN}"

install:: config.js
	chmod a+x openjscad
	cp openjscad ${BIN}
	#test -d ${LIB} || mkdir ${LIB}
	mkdir -p ${LIB}
	cp *.js ${LIB}
	
deinstall::
	rm -f ${LIB}/csg.js ${LIB}/openscad.js

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

