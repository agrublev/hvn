#!/usr/bin/env bash
# Bash Spotify - A command line Spotify mini-player for macOS

# 2017 Henry Franks
# Visit me on GitHub @henryefranks

stty -echo

# Some values to change text styling
# TODO: Could NONE and REGULAR be combined?
GREEN='\033[1;32m'
NONE='\033[0m'
BOLD=$(tput bold)
ULINE=$(tput smul)
REGULAR=$(tput sgr0)

function clean_exit {
	# General cleanup (fixing cursor style and output colour)
	# This function is run instead of just exiting in most cases to keep the output from inheriting styles from echo statements, as a precaution
	stty echo
	exit
}

function interrupt {
	clear
	tput cnorm # Only needs to be run in player mode
	clean_exit
}

# Checking if running on a mac (stopping if not)
if [ $(uname) != "Darwin" ]; then
	echo "Sorry, this only works on macOS"
	clean_exit
fi

if [ "$1" == "quit" ]; then
	echo "Quitting Spotify"
	osascript -e 'quit app "Spotify"'
	clean_exit
fi

version="0.1.4"
year="2017"

# Opening Spotify if it isn't open
if ! pgrep -xq -- "Spotify"; then
	# Checking if Spotify is installed and opening it if it is
	err=$(open -a Spotify -jg 2>&1 > /dev/null)
	if [ "$err" != "" ]; then
		echo "You must have Spotify installed to use this"
		clean_exit
	fi
	# Adequate time for it to open in background
	sleep 1
fi

if [ "$#" -eq 0 ]; then
	clean_exit
fi

# getopts only works with $1, so I copy the command to a variable and shift
command="$1"
shift

album='return name of current track & " | " & artist of current track'
player=false
progress=false
resize=false

playerOptions="-p"

while getopts 'anprc' flag; do
  case "${flag}" in
    a)
			# Adding album to player echo if flag is active
			album='return name of current track & " | " & artist of current track  & " | " & album of current track'
			playerOptions="${playerOptions}a"
			;;
    n)
			# Showing the player with next and previous commands
			player=true
			;;
    p)
			# Showing the progress bar with now playing
			progress=true
			;;
    r)
			# Resizing the window in player mode
			resize=true
			;;
    c)
			GREEN=$NONE
			playerOptions="${playerOptions}c"
			;;
    *)
			echo "illegal option -- ${flag}"
			;;
  esac
done

# Checking for non-player cases first will save time
if [ "$command" == "help" ] || [ "$#" -gt 1 ]; then  # Most important case
	echo "usage: $0 [options] [-anprc]"
	echo "commands: info   - more info"
	echo "          help   - help (this screen)"
	echo "          quit   - quit Spotify"
	echo "          track  - info about the currently playing track"
	echo "          next   - next song"
	echo "          prev   - previous song"
	echo "          resume - resume playback"
	echo "          pause  - pause playback"
	echo "          toggle - toggle play/pause"
	echo "          player - live player"
	echo ""
	echo "options:  a      - show album"
	echo "          n      - show now playing"
	echo "          p      - show progress bar with now playing"
	echo "          r      - resize the window for the player"
	echo "          c      - display without colour"
	clean_exit
elif [ "$command" == "info" ]; then
	echo -e "${GREEN}Spotify for Bash v$version${NONE}"
	echo -e "${BOLD}© $year Henry Franks${REGULAR}"
	echo -e "Visit me on GitHub: ${ULINE}https://github.com/henryefranks${NONE}"
	echo "use 'help' for a list of commands"
	clean_exit
fi

# Player mode
if [ $command = "player" ]; then
	# Adding trap for clean exit (ctrl-c)
	trap interrupt INT

	if [ "$resize" == true ]; then
		printf '\e[8;6;70t'
		# Alternatively (requires X11): resize -s 6 70 2>&1 > /dev/null
	fi
	tput civis
	clear

	oldLen=0
	oldOut=""
	len=0

	command="$0 track $playerOptions" # Calling itself because I'm lazy
	# TODO: run separately to reduce battery consumption
	# This is also important for scrolling text in the player
	while :
	do
		oldLen=$len
		tput cup -0
		oldOut=$output
		output=$(eval $command)
		willEcho=false
		if [ "$output" != "$oldOut" ]; then
			willEcho=true
		fi
		len=$(echo $output | wc -m)
		if [ "$oldLen" != "$len" ]; then
			# Clearing output if not properly overwritten to avoid graphical glitches
			clear
			willEcho=true
		fi
		if [ willEcho ]; then
			echo "$output"
		fi
		sleep 0.1 # Using a 10Hz refresh rate to keep the second intervals regular
	done
fi

echo ${BOLD}
URI=""

function search {
	# $1 = name
	# Doesn't work because needs OAuth token.
	URI=$(curl -s -G https://api.spotify.com/v1/search --data-urlencode "q=$1" -d "type=song&limit=1&offset=0" -H "Accept: application/json" | grep -E -o "spotify:song:[a-zA-Z0-9]+" -m 1)
}

function show_bar {
	# Printing the times and the progress bar
	echo "time: $currentMin:$currentSec - $endMin:$endSec"
}


function show_barz {
	# Printing the times and the progress bar
	echo "${NONE}"
	echo "$currentMin:"
	if (($currentSec < 10)); then
		echo "0"
	fi
	if [ "$currentSec" == "-0" ]; then # Fixing a bug where it would display, for example 1:0-0 (currentSec was set to -0)
		currentSec="0"
	fi
	echo "$currentSec"
	for i in {0..20}; do
		if ((i > lineLength)); then
			echo "${NONE}${BOLD}-${REGULAR}"
		else
			echo "${GREEN}${BOLD}=${REGULAR}"
		fi
	done
	echo "${NONE}] "
	echo "$endMin:"
	if (($endSec < 10)); then
		echo "0"
	fi
	echo "$endSec"
}

function now_playing {
	# Current time and duration of track
	currentPos=$(osascript -e 'tell application "Spotify"' -e "return player position" -e "end tell")
	duration=$(osascript -e 'tell application "Spotify"' -e "return duration of current track" -e "end tell")


	# Some maths to work out the values to show on the progress bar
	truncPos=$(printf "%.*f" 0 $currentPos)
	truncDur=$(printf "%.*f" 0 $(($duration / 1000)))
	ratio=$(echo "$truncPos / $truncDur" | bc -l)
	tempLength=$(echo "20 * $ratio" | bc -l)
	lineLength=$(printf "%.*f" 0 $tempLength)

	currentMin=$((truncPos / 60))
	currentSec=$(printf "%.*f" 0 $( echo "$currentPos - $(( currentMin * 60 ))" | bc -l))

	endMin=$((truncDur / 60))
	endSec=$(printf "%.*f" 0 $( echo "$truncDur - $(( endMin * 60 ))" | bc -l))
	track=$(osascript -e 'tell application "Spotify"' -e "$album" -e "end tell")
	# FIXME: Sometimes these don't resize properly
	current_scroll=0
	scroll_start=$current_scroll
	scroll_end=$(($(tput cols) + $current_scroll))
	echo ${track:$scroll_start:$scroll_end}
	current_scroll=$(($current_scroll + 1))
	if [ "$progress" = true ]; then
		state=$(osascript -e 'tell application "Spotify"' -e 'return player state' -e 'end tell')
		# Note: I've reversed the play and pause icons so they are the way they appear in most players (pause icon = playing, play icon = paused)
		if [ "$state" == "playing" ]; then
			echo "isPlaying"
		else
			echo "isNotPlaying"
		fi
		show_bar
	fi
}

# Parsing the command
# TODO: Convert to switch statement
if [ $command == "track" ]; then
	now_playing
	clean_exit
elif [ $command == "resume" ] || [ $command == "play" ]; then
  state=$(osascript -e 'tell application "Spotify"' -e 'return player state' -e 'end tell')
	if [ "$state" != "playing" ]; then
		command="playpause"
		echo "Playing"
  else
		echo "Already playing"
		clean_exit
  fi
	echo ${BOLD}
elif [ $command == "next" ]; then
	command="next track"
elif [ $command == "prev" ]; then
	command="previous track"
elif [ $command == "toggle" ]; then
	command="playpause"
elif [ $command == "shuffle" ]; then
	command="set shuffling to not shuffling"
  	shuffle=$(osascript -e 'tell application "Spotify"' -e 'return shuffling' -e 'end tell')
	echo ${REGULAR}
	if [ "$shuffle" == "true" ]; then
		echo "Turning off shuffle"
  	else
		echo "Turning on shuffle"
  	fi
	echo ${BOLD}
elif [ $command == "pause" ]; then
	state=$(osascript -e 'tell application "Spotify"' -e 'return player state' -e 'end tell')
	echo ${REGULAR}
	if [ "$state" == "playing" ]; then
		echo "Pausing"
  	else
		echo "Already paused"
		clean_exit
  	fi
	echo ${BOLD}
elif [ $command == "play" ]; then
	search $2
	osascript -e 'tell application "Spotify"' -e 'play track "$URI"' -e 'end tell'
fi

# Redirecting stderr into a variable to check if command was valid
err=$(osascript -e 'tell application "Spotify"' -e "$command" -e "end tell" 2>&1 > /dev/null)

# $err will be empty if there was no error
if [ "$err" != "" ]; then
	echo -e "${REGULAR}Invalid command - use 'help' for a list of commands"
	clean_exit
fi

if [ "$player" == true ]; then
	now_playing
fi

clean_exit
