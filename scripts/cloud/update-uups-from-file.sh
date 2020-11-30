SCRIPT_DIR="$(cd "$(dirname "$([ `readlink "$0"` ] && echo "`readlink "$0"`" || echo "$0")")"; pwd -P)"
cd $SCRIPT_DIR
cf uups discovery-config -p ./uups.json