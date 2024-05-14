#!/bin/sh

hyprctl dispatch exec "[workspace special:music silent\;float\;move 8% 8%\;size 50% 60%] spotify-launcher"
hyprctl dispatch exec "[workspace special:music silent\;float\;move 50% 45%\;size 40% 40%] kitty -e cava"
