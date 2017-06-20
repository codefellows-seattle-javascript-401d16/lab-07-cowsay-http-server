#!/bin/bash
passcolor=$"\e[32m" #green
failcolor=$"\e[31m" #red
normalcolor=$"\e[0m" #default
bold=$(tput bold)
normal=$(tput sgr0)

# script will test that these files exist and are not empty
required_files=(.gitignore .eslintrc .eslintignore README.md package.json)

printf "\n%bCode 401 Lab Configuration Test%b\n" "$bold" "$normal"

printf "The project directory must be named lab-[yourname]: ";
# magic from stackoverflow
if ! [ $(printf '%s\n' "${PWD##*/}" | grep ^lab-) ]; then
  printf "%bfailed" "$failcolor"
else
  printf "%bpassed" "$passcolor"
fi
printf "%b\n" "$normalcolor"

# check that requried files exist and are not empty
for filename in ${required_files[*]}; do
  printf "File $filename must be in the project directory: "
  if [ -f $filename ] ; then
    printf "%bpassed" "$passcolor"
    printf "%b\nFile $filename must not be empty: " "$normalcolor"
    if [ $(stat -c%s $filename) -le 0 ] ; then
      printf "%bfailed" "$failcolor"
    else
      printf "%bpassed" "$passcolor"
    fi
  else
    printf "%bfailed" "$failcolor"
  fi
  printf "%b\n" "$normalcolor"
done

# make sure node_modules is in ignore files
printf ".gitignore should include node_modules: "
if ! less .gitignore | grep -q node_modules ; then
  printf "%bfailed" "$failcolor"
else
  printf "%bpassed" "$passcolor"
fi
printf "%b\n" "$normalcolor"
printf ".eslintignore should include node_modules: "
if ! less .eslintignore | grep -q node_modules ; then
  printf "%bfailed" "$failcolor"
else
  printf "%bpassed" "$passcolor"
fi
printf "%b\n\n" "$normalcolor"
exit 0
