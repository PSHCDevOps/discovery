#!/usr/bin/env bash
# Prepare a python enabled webserver for application hosting.

set -e

#-------------------------------------------------------------------------------
# Variables
#-------------------------------------------------------------------------------

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
# Copy documentation into static folder
#-------------------------------------------------------------------------------

echo "> Navigating to $SCRIPT_DIR/../app/static"
cd "$SCRIPT_DIR/../app/static"

if [ -d "docs/" ] 
then
    echo "> Cleaning /docs/ subdirectory"
    rm -r "docs"/*
else
    echo "> Creating /docs/ subdirectory"
    mkdir "docs"
fi

# Shallow clone to save space
echo "> Cloning generated documentation"
git clone -b $GH_PAGES_BRANCH --depth 1 --single-branch $GH_PAGES_REMOTE

echo "> Copying generated index.html into $SCRIPT_DIR/../docs/templates/doc-index.html"
cp "discovery/docs/html/index.html" "../docs/templates/doc-index.html"
echo "> Moving generated documentation into $SCRIPT_DIR/../app/static/docs"
mv "discovery/docs/html"/* "docs"

echo "cleaning up cloned repo"
rm -rf "discovery"

#-------------------------------------------------------------------------------

echo "> Returning to app root directory"
cd "$SCRIPT_DIR/../app"