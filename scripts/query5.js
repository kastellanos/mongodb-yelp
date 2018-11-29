conn = new Mongo();
db = conn.getDB("yelp_academic")

db.business.find({"attributes.RestaurantsDelivery":"True","is_open":1},{"name":1,"stars":1,"_id":0}).sort("stars":-1)
