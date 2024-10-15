#!/bin/bash
docker run -d -p 58095:8090 -v `pwd`/data:/opt/fluree-server/data fluree/server:latest
