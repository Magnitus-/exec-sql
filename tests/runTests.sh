#!/usr/bin/env bash

echo "***** Beginning of tests setup *****";
docker-compose -f testArgon.yml build;
docker-compose -p execargon -f testArgon.yml up -d server;

docker-compose -f testBoron.yml build;
docker-compose -p execboron -f testBoron.yml up -d server;

sleep 10;
echo "***** End of tests setup *****";

echo "***** Beginning of tests for node argon *****";
docker-compose -p execargon -f testArgon.yml up client;
echo "***** End of tests for node argon *****";

echo "***** Beginning of tests for node boron *****";
docker-compose -p execboron -f testBoron.yml up client;
echo "***** End of tests for node boron *****";

echo "***** Beginning of tests cleanup *****";
docker-compose -p execargon -f testArgon.yml stop && docker-compose -p execargon -f testArgon.yml rm -f;
docker-compose -p execboron -f testBoron.yml stop && docker-compose -p execboron -f testBoron.yml rm -f;

docker volume rm -f execargon_data;
docker volume rm -f execboron_data;

docker network rm execargon_net;
docker network rm execboron_net;
echo "***** End of tests cleanup *****";
