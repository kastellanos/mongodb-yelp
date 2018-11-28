#!/bin/bash
PORT=27021
# Check if the directory is not created yet in that case create the directory
if [ ! -d dbmongo ]; then
    mkdir dbmongo
fi
mongod --shardsvr --dbpath dbmongo --port $PORT & # Start the mongo server at port 27021
sleep 3 # It's necessary to wait some time until the server start listening at the given port
mongo --host localhost:$PORT # Connect to the mongo server instance
