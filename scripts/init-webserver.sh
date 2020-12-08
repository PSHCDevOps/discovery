#!/usr/bin/env bash
# Prepare a python enabled webserver for application hosting.

set -e

#-------------------------------------------------------------------------------
# Variables
#-------------------------------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "$([ `readlink "$0"` ] && echo "`readlink "$0"`" || echo "$0")")"; pwd -P)"

#-------------------------------------------------------------------------------
# Web server initialization
#-------------------------------------------------------------------------------

cd "$SCRIPT_DIR/../app"

LOG_FILE="${1:-$SCRIPT_DIR/../logs/discovery-init.log}"
if [ "$LOG_FILE" != "/dev/stdout" -a "$LOG_FILE" != "/dev/stderr" ]
then
  rm -f "$LOG_FILE"
fi

echo "> Collecting Django static files" | tee -a "$LOG_FILE"
python3 manage.py collectstatic --noinput >>"$LOG_FILE" 2>&1
