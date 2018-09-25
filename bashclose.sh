#!/bin/bash

# Creates a comma-separated String of open applications and assign it to the APPS variable.
APPS=$(osascript -e 'tell application "System Events" to get name of (processes where background only is false)')

# Convert the comma-separated String of open applications to an Array using IFS.
# http://stackoverflow.com/questions/10586153/split-string-into-an-array-in-bash
IFS=',' read -r -a myAppsArray <<< "$APPS"

# Loop through each item in the 'myAppsArray' Array.
for myApp in "${myAppsArray[@]}"
do
#  echo "$myApp"
  # Remove space character from the start of the Array item
  appName=$(echo "$myApp" | sed 's/^ *//g')
  # Avoid closing the "Finder" and your CLI tool.
  # Note: you may need to change "iTerm" to "Terminal"
  # "Sketch"
  array=("Google Chrome" "Finder" "iTerm2" "phpstorm" "Skype")
  #if [[ ! "$appName" == "Sketch" && ! "$appName" == "Google Chrome" && ! "$appName" == "Finder" && ! "$appName" == "iTerm2" ]] && ! "$appName" == "phpstorm" && ! "$appName" == "Skype" ]]; then
  if [[ ! " ${array[@]} " =~ " ${appName} " ]]; then
    # quit the application
    echo "QUIT ${appName}"
    osascript -e 'quit app "'"$appName"'"'
  fi
done
