#!/usr/bin/env bash
# Setup Angular environment.

set -e

SCRIPT_DIR="$(cd "$(dirname "$([ `readlink "$0"` ] && echo "`readlink "$0"`" || echo "$0")")"; pwd -P)"
cd "$SCRIPT_DIR/.."

LOG_FILE="${1:-./logs/discovery-angular.log}"
if [ "$LOG_FILE" != "/dev/stdout" -a "$LOG_FILE" != "/dev/stderr" ]
then
  rm -f "$LOG_FILE"
fi

echo "> Installing Node and Angular dependencies" | tee -a "$LOG_FILE"
apt-get update >>"$LOG_FILE" 2>&1
apt-get install -y build-essential curl >>"$LOG_FILE" 2>&1
rm -rf /var/lib/apt/lists/* >>"$LOG_FILE" 2>&1

echo "> Installing Node JS" | tee -a "$LOG_FILE"
curl -sL https://deb.nodesource.com/setup_14.x | bash - >>"$LOG_FILE" 2>&1
apt-get install -y nodejs >>"$LOG_FILE" 2>&1

echo "> Installing Angular JS environment" | tee -a "$LOG_FILE"
npm install -g @angular/cli@10 >>"$LOG_FILE" 2>&1
