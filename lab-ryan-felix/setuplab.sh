#!/bin/bash
bold=$(tput bold)
normal=$(tput sgr0)

printf "\n%bCode 401 Lab Project Setup\n%b" "$bold" "$normal"
destination=$1
if [ ! -d $destination ] ; then
  printf "Creating project folder...\n"
  if ! mkdir $destination ; then
    printf "Failed to create project folder. Terminating.\n\n"
    exit 1
  fi
fi
printf "Copying config files to project folder...\n"
cp ./{.eslintignore,.eslintrc,.gitignore,configtest.sh} $destination
printf "Initializing git...\n"
cd $destination && git init
printf "Initializing npm...\n"
npm init -y && printf "Installing mocha and expect as dev dependencies...\n" && npm i -D mocha expect
printf "Creating test folder...\n"
mkdir test
printf "Creating index.js...\n"
touch index.js
printf "Creatind README.md...\n"
touch README.md
printf "Testing configuration (one failure is expected)...\n"
./configtest.sh
printf "%bCode 401 Lab Project Setup Complete!%b\n\n\n" "$bold" "$normal"
