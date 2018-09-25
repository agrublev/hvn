#!/usr/bin/env bash

for app in "App Store"\
	"Safari"\
	"Mail"\
	"Contacts"\
	"Calendar"\
	"Messages"\
	"Reminders"\
	"Maps"\
	"Photos"\
	"FaceTime"\
	"iTunes"\
	"iBooks"\
	"Siri"\
	"Launchpad"; do
	echo $app
        dloc="defaults read com.apple.dock persistent-apps | grep file-label | awk '/$app/  {printf NR}'"
        dloc=$(eval $dloc)
    echo $dloc
    sudo -u $USER /usr/libexec/PlistBuddy -c "Delete persistent-apps:$dloc" ~/Library/Preferences/com.apple.dock.plist
done

osascript -e 'delay 3' -e 'tell Application "Dock"' -e 'quit' -e 'end tell'

##delete item from com.apple.dock.plist
#dloc=$(defaults read com.apple.dock persistent-apps | grep file-label | awk '/Calendar/  {printf NR}')
#dloc=$[$dloc-1]
#echo $dloc
#sudo -u $USER /usr/libexec/PlistBuddy -c "Delete persistent-apps:$dloc" ~/Library/Preferences/com.apple.dock.plist
#
##must delete item from com.apple.dock.plist agian,or won't change
##dloc=$(defaults read com.apple.dock persistent-apps | grep file-label | awk '/Photo Booth/  {printf NR}')
##dloc=$(defaults read com.apple.dock persistent-apps | grep _CFURLString "PageManager%209.31.app")
##dloc=$[$dloc-1]
##echo $dloc
##sudo -u $USER /usr/libexec/PlistBuddy -c "Delete persistent-apps:$dloc" ~/Library/Preferences/com.apple.dock.plist
##sleep 3
## Restart Dock to persist changes
#
