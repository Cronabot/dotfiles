#!/bin/sh

entries="Lock\nShutdown\nReboot\nLogout\nSwitch To Windows"

selected=$(echo -e $entries|wofi --prompt="Power Options" -i --show=dmenu --cache-file /dev/null)

case $selected in
    "Lock")
        hyprctl dispatch exec hyprlock;;
    "Shutdown")
        shutdown 0;;
    "Reboot")
        reboot;;
    "Logout")
        hyprctl dispatch exit;;
    "Switch To Windows")
        grub-reboot "Windows"
        reboot
esac
