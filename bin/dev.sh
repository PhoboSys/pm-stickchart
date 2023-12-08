#!/bin/bash -e
[ "$DEBUG_BOOTING" == 'true' ] && set -x

SCRIPTS_DIR="`dirname "$(realpath "$0")"`"

START_SCRIPT='
  concurrently                                  \
      -p "[{name}]"                             \
      -n "Pkg:Chart:Lint,Pkg:Chart"             \
      -c "cyan.bold,green.bold"                 \
      "npm run lint"                            \
      "npm run build"
  '

if [ "$WATCH_FILES" = "true" ]; then

  echo -e "\x1b[33mWatching and running start script\x1b[0m"

  chokidar                       \
    src/**                       \
    -c "$START_SCRIPT"           \
    --debounce 100               \
    --initial                    \
    --silent

else

  echo -e "\x1b[33mRunning start script\x1b[0m"

  sh -c "$START_SCRIPT"

fi
