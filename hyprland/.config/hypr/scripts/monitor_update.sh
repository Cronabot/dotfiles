#!/bin/sh

handle() {
    if [[ ${1:0:12} == "monitoradded" || ${1:0:14} == "monitorremoved" ]]; then
        sleep 1
        hyprctl dispatch exec "ags -q"
        hyprctl dispatch exec "ags &> >( tee -a ~/.local/logs/ags.log)"
    fi
}


socat -U - UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock | while read -r line; do handle "$line"; done
