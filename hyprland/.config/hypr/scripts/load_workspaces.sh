#!/bin/sh

workspaceCmds=""

for ((i = 0; i < $(hyprctl monitors -j | jq length); i++)); do
    for ((j = 6; j > 0; j--)); do
        workspaceCmds+="dispatch workspace $i$j ; "
        echo "$i$j"
    done
done

hyprctl --batch $workspaceCmds
