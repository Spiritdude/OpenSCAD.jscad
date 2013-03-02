OPENJSCAD = openjscad
SLICER = slic3r

all::	example000.stl example001.stl
	
clean::
	rm -f *.stl Thumbs.db

# ---- automatic stuff below

%.stl:	%.jscad
	$(OPENJSCAD) $< -o $@

# %.gcode: %.stl
# 	$(SLICER) $<
	
