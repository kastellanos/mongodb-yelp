conn = new Mongo();
db = conn.getDB("yelp_academic")
db.tip.find({"date": {$exists: true}}).
forEach(function(obj) {
  obj.date = new Date(obj.date);
  db.tip.save(obj);
})
