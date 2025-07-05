#!/bin/sh

workspaceCmds=""

for ((i = 0; i < $(hyprctl monitors -j | jq length); i++)); do
    for ((j = 10; j > 0; j--)); do
        workspaceCmds+="dispatch workspace $i$(printf "%02d" $j); "
        echo "$i$(printf "%02d" $j)"
    done
done

hyprctl --batch $workspaceCmds
