conn = new Mongo();
db = conn.getDB("yelpdb")
db.tip.find({"date": {$exists: true}}).
forEach(function(obj) {
  obj.date = new Date(obj.date);
  db.test.save(obj);
})
