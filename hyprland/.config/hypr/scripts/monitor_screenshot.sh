
FILE=~/Pictures/$(date +'%s_grim.png')
MONITOR=$(hyprctl monitors -j | jq -r '.[] | select(.focused == true) | .name';)
grim -o $MONITOR $FILE
wl-copy < $FILE
