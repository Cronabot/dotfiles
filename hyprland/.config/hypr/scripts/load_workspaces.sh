#!/bin/sh

workspaceCmds=""

for ((i = 0; i < $(hyprctl monitors -j | jq length); i++)); do
    for ((j = 1; j < 7; j++)); do
        workspaceCmds+="dispatch workspace $i$j ; "
    done
done

hyprctl --batch $workspaceCmds
