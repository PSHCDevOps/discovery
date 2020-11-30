SCRIPT_DIR="$(cd "$(dirname "$([ `readlink "$0"` ] && echo "`readlink "$0"`" || echo "$0")")"; pwd -P)"
cd $SCRIPT_DIR
UUPS=$(cf env discovery-web | python -c "import sys,json; print(json.loads(sys.stdin.read()[133:2006])['VCAP_SERVICES']['user-provided'][0]['credentials'])")
JSONIFY=$(echo $UUPS | sed "s/'/\"/g")
echo $JSONIFY > uups.json
echo $JSONIFY
