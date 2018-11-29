conn = new Mongo();
db = conn.getDB("yelp_academic")

db.ceo.aggregate([
{$lookup:{from:"business", localField:"_id",foreignField:"ceo_list",as:"list_entreprises"}},
{$unwind:"$list_entreprises"},
{$group:{
"_id":"$_id",
avg:{$avg: "$list_entreprises.stars"}
}}]).forEach(function(doc){print(doc._id,doc.avg)})
