conn = new Mongo();
db = conn.getDB("yelp_academic")

db.tip.find().
forEach(function(obj) {
  obj.date = new Date(obj.date);
  db.tip.save(obj);
})
