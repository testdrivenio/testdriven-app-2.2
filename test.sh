#!/bin/bash

env=$1
file=""
fails=""

if [[ "${env}" == "stage" ]]; then
  file="docker-compose-stage.yml"
elif [[ "${env}" == "dev" ]]; then
  file="docker-compose-dev.yml"
elif [[ "${env}" == "prod" ]]; then
  file="docker-compose-prod.yml"
else
  echo "USAGE: sh test.sh environment_name"
  echo "* environment_name: must either be 'dev', 'stage', or 'prod'"
  exit 1
fi

inspect() {
  if [ $1 -ne 0 ]; then
    fails="${fails} $2"
  fi
}

/bin/sleep 5

docker-compose -f $file run users python manage.py test
inspect $? users
docker-compose -f $file run users flake8 project
inspect $? users-lint

docker-compose -f $file run exercises python manage.py test
inspect $? exercises
docker-compose -f $file run exercises flake8 project
inspect $? exercises-lint

if [[ "${env}" == "dev" ]]; then
  docker-compose -f $file run client npm test -- --coverage
  inspect $? client
  testcafe chrome e2e
  inspect $? e2e
else
  testcafe chrome e2e/index.test.js
  inspect $? e2e
fi

if [ -n "${fails}" ]; then
  echo "Tests failed: ${fails}"
  exit 1
else
  echo "Tests passed!"
  exit 0
fi
