#!/usr/bin/env bash
# Prepare a Django database for application hosting.

set -e

SCRIPT_DIR="$(cd "$(dirname "$([ `readlink "$0"` ] && echo "`readlink "$0"`" || echo "$0")")"; pwd -P)"
cd "$SCRIPT_DIR/../app"

LOG_FILE="${1:-$SCRIPT_DIR/../logs/discovery-init.log}"
if [ "$LOG_FILE" != "/dev/stdout" -a "$LOG_FILE" != "/dev/stderr" ]
then
  rm -f "$LOG_FILE"
fi

DB_HOST="${2:-none}"
DB_PORT="${3:-5432}"

if [ "$DB_HOST" != "none" ]
then
  "$SCRIPT_DIR/wait-for-it.sh" --host="$DB_HOST" --port="$DB_PORT"
fi

#run application setup commands

echo "> Migrating Django database structure" | tee -a "$LOG_FILE"
#python3 manage.py migrate --fake categories  --noinput >>"$LOG_FILE" 2>&1
#python3 manage.py migrate --fake vendors  --noinput >>"$LOG_FILE" 2>&1
python3 manage.py migrate --noinput >>"$LOG_FILE" 2>&1

echo "> Ensuring Django cache table" | tee -a "$LOG_FILE"
python3 manage.py createcachetable >>"$LOG_FILE" 2>&1

echo "> Loading basic category information" | tee -a "$LOG_FILE"
python3 manage.py parse_categories >>"$LOG_FILE" 2>&1

#echo "> Loading basic category information - Pools" | tee -a "$LOG_FILE"
# python3 manage.py load_categories  >>"$LOG_FILE" 2>&1

echo "> Clearing cache" | tee -a "$LOG_FILE"
python3 manage.py clear_cache >>"$LOG_FILE" 2>&1

echo "> Clearing outdated locks" | tee -a "$LOG_FILE"
python3 manage.py clear_locks >>"$LOG_FILE" 2>&1
