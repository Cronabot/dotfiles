
FILE=~/Pictures/$(date +'%s_grim.png')
grim -g "$(slurp)" $FILE
wl-copy < $FILE
