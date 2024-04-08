#!/bin/bash
set -e
cmd="$@"

# This entrypoint is used to play nicely with the current cookiecutter configuration.
# Since docker-compose relies heavily on environment variables itself for configuration, we'd have to define multiple
# environment variables just to support cookiecutter out of the box. That makes no sense, so this little entrypoint
# does all this for us.

# N.B. If only .env files supported variable expansion...
export CELERY_BROKER_URL="${REDIS_URL}"
echo ${CELERY_BROKER_URL}
echo ${DATABASE_URL}
postgres_ready() {
python << END
import sys

import psycopg2

try:
    psycopg2.connect("${DATABASE_URL}")

except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)

END
}
until postgres_ready; do
  >&2 echo 'Waiting for PostgreSQL to become available...'
  >&2 echo ${DATABASE_URL}

  sleep 1
done
>&2 echo 'PostgreSQL is available'

exec $cmd
