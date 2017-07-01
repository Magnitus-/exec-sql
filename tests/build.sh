#!/bin/bash

docker build -t exec-sql-test:argon -f ../dockerfileArgon ..
docker build -t exec-sql-test:boron -f ../dockerfileBoron ..
