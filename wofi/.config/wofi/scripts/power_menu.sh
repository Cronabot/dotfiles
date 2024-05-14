#!/bin/sh

entries="Lock\nShutdown\nReboot\nLogout"

selected=$(echo -e $entries|wofi --prompt="Power Options" -i --show=dmenu --cache-file /dev/null)

case $selected in
    Lock)
        hyprctl dispatch exec hyprlock;;
    Shutdown)
        exec shutdown 0;;
    Reboot)
        exec reboot;;
    Logout)
        hyprctl dispatch exit
esac
