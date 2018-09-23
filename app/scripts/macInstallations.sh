#!/bin/bash
SKIP=$1


unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)         machine=Linux;;
    Darwin*)        machine=Mac;;
    CYGWIN*)        machine=Cygwin;;
    MSYS_NT-10.0*)  machine=Cygwin;;
    MINGW*)         machine=MinGw;;
    *)              machine="UNKNOWN:${unameOut}"
esac
echo ${machine}

# START THE SH SCRIPT FOR SYSTEM!

#if [ $machine = "Mac" ]; then


#sudo chown -R $(whoami) $(brew --prefix)/*
#sudo chown -R $(whoami):admin /usr/local && sudo chmod -R g+rwx /usr/local

# Check for Homebrew, install if we don't have it
if test ! $(which brew); then
    echo "Installing homebrew..."
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

# Update homebrew recipes
brew update

PACKAGES=(
    git
    node
    python
    python3
    wget
)

echo "Installing packages..."
brew install ${PACKAGES[@]}
echo "Cleaning up..."
brew cleanup

echo "Installing cask..."

brew cask install vagrant
vagrant plugin install vagrant-vbguest
brew cask install https://rawgit.com/agrublev/homebrew-cask/master/Casks/virtualbox.rb

echo "Installing global npm packages..."
npm install gulp -g

echo "Installed it all!"
exit 1;
