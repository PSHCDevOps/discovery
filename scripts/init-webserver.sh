#!/usr/bin/env bash
# Prepare a python enabled webserver for application hosting.

set -e

SCRIPT_DIR="$(cd "$(dirname "$([ `readlink "$0"` ] && echo "`readlink "$0"`" || echo "$0")")"; pwd -P)"
GH_PAGES_BRANCH="gh-pages"
GH_PAGES_REMOTE="https://github.com/PSHCDevOps/discovery.git"

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

#-------------------------------------------------------------------------------
# Copying documentation into static folder
#-------------------------------------------------------------------------------

echo "navigating to $SCRIPT_DIR/../app/static"
cd "$SCRIPT_DIR/../app/static"

if [ -d "docs/" ] 
then
    echo "cleaning /docs/ subdirectory"
    rm -r "docs"/*
else
    echo "creating /docs/ subdirectory"
    mkdir "docs"
fi

echo "cloning generated documentation"
git clone -b $GH_PAGES_BRANCH --depth 1 --single-branch $GH_PAGES_REMOTE

echo "moving generated documentation into $SCRIPT_DIR/../app/static/docs"
mv "discovery/docs/html"/* "docs"

echo "cleaning up cloned repo"
rm -rf "discovery"

#-------------------------------------------------------------------------------

echo "returning to app directory"
cd "$SCRIPT_DIR/../app"