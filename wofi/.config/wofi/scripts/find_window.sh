#!/bin/sh

entries=$(hyprctl clients -j | jq -r '.[] | "\(.address) \(.class) \(.title)"')
selected=$(printf "%s\n" "$entries" | wofi --prompt="Clients" -i --show=dmenu --cache-file /dev/null)

echo "$selected"

address=$(echo "$selected" | awk '{print $1}')

hyprctl dispatch focuswindow address:"$address"
