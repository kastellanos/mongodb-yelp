conn = new Mongo();
db = conn.getDB("yelp_academic")

db.review.createIndex({"stars":1,"useful":1,"user_id":1,"text":1})
db.user.createIndex({"user_id":1})
db.business.createIndex({"business_id":1,"stars":1})
db.review.createIndex({"business_id":1})
db.tip.createIndex({"business_id":1,"date":1})
