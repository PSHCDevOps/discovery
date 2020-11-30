set -e

SCRIPT_DIR="$(cd "$(dirname "$([ `readlink "$0"` ] && echo "`readlink "$0"`" || echo "$0")")"; pwd -P)"
GH_PAGES_BRANCH="gh-pages"
GH_PAGES_REMOTE="https://github.com/PSHCDevOps/discovery.git"

echo "> Navigating to $SCRIPT_DIR/../app/static"
cd "$SCRIPT_DIR/../app/static"

if [ -d "docs" ] 
then
  echo "> Cleaning /docs/ subdirectory"
  rm -r "docs"
fi

echo "> Creating /docs/ subdirectory"
mkdir "docs"

if [ -d "discovery" ]
then
  echo "> Removing /discovery/ subdirectory"
  rm -r "discovery"
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