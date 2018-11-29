conn = new Mongo();
db = conn.getDB("yelp_academic")

db.tip.aggregate(
   [
     {
       $group:
         {
           _id: { dayOfYear_Number: { $dayOfYear: "$date"}, year: { $year: "$date" } },
           totalLikes: { $sum: "$like" },
           nbre_participants: { $sum: 1 }
         }
     }
   ]
)
