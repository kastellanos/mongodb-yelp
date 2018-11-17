# mongodb-yelp

## Mongodb setup

### Requirements
- Ubuntu 18.04

### Steps to install mongodb
- Import the public key
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```
- Add the repository to the sources
```
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```
- Reload local package database
```
sudo apt-get update
```
- Install mongodb
```
sudo apt-get install -y mongodb-org
```

### Configure mongodb after the installation
- Launch a linux console and create a local folder to save the databases
```
mkdir dbmongo
```
- Lauch MongoDB server
```
mongod --shardsvr --dbpath dbmongo --port 27021 &
```
- **Open another linux console**
- Launch MongoDB instance
```
mongo --host localhost:27021
```
- If you want to stop the server then execute
```
mongod --shutdown --dbpath dbmongo
```

### To load a database
```
mongoimport --db <databasename> --collection <collectionName> --drop --file <datafile> --port 27021
# The option --drop erase and create the collection with the same name if exist yet if not only create one.
```
