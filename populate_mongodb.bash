#!/bin/bash
PORT=27021
DATABASE=yelp_academic
wget https://raw.githubusercontent.com/pavanjadhaw/gdown.pl/master/gdown.pl && chmod u+x gdown.pl
./gdown.pl "https://drive.google.com/file/d/17Ebm_tIA6h_L80dXEr4LKB09LOKp4T4k" yelp-dataset.zip
unzip yelp-dataset.zip
YEPL_DIRECTORY=yelp-dataset
mongoimport --db $DATABASE --collection  business --drop --file $YEPL_DIRECTORY/yelp_academic_dataset_business.json --port $PORT
mongoimport --db $DATABASE --collection  checkin  --drop --file $YEPL_DIRECTORY/yelp_academic_dataset_checkin.json --port $PORT
mongoimport --db $DATABASE --collection  review   --drop --file $YEPL_DIRECTORY/yelp_academic_dataset_review.json --port $PORT
mongoimport --db $DATABASE --collection  tip      --drop --file $YEPL_DIRECTORY/yelp_academic_dataset_tip.json --port $PORT
mongoimport --db $DATABASE --collection  user     --drop --file $YEPL_DIRECTORY/yelp_academic_dataset_user.json --port $PORT


# here we take the data that we already generated with a python script and that was exported as JSON
mongoimport --db $DATABASE --collection  ceo      --drop --file extra_data/ceo.json --port $PORT
mongoimport --db $DATABASE --collection  bank_account --drop --file extra_data/bank_account.json --port $PORT


# Here we call a pytohn script to associate the ceo collection with the business collection assuring a many-many relationship
python associate_collections.py


# Execute a update query that convert a string type in a date type
mongo date_conversion.js
