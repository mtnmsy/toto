#!/bin/bash -
#===============================================================================
#
#          FILE: test.sh
# 
#         USAGE: ./test.sh 
# 
#   DESCRIPTION: 
# 
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (), 
#  ORGANIZATION: 
#       CREATED: 2020/03/09 22時56分13秒
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error

function create_ul_li(){
  local dirs="$1"

  for dir in $(find ${dirs} -maxdepth 1 -mindepth 1 -type d | sort -s); do
    echo "<ul>"
    echo "<li>${dir}</li>"
    create_ul_li ${dir}
    echo "</ul>"
  done

  echo "<ul>"
  for file in $(find ${dirs} -maxdepth 1 -mindepth 1 -type f | sort -s); do
     echo "<li>${file}</li>"
  done
  echo "</ul>"
}

create_ul_li /Users/matsuno/work

