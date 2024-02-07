#!/bin/bash

if [[ $(brightnessctl g) -gt 10 ]]
then
    brightnessctl s 10-
fi
