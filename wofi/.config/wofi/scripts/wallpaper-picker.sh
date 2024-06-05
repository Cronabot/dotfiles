#!/bin/sh

options=$(ls ~/wallpapers | grep -E '\.png|\.jpeg|\.jpg|\.gif|\.tif')

selected=$(echo -e "$options"|wofi --prompt="Wallpaper Selector" -i --show=dmenu --cache-file /dev/null)
swww img ~/wallpapers/"$selected"
