conn = new Mongo();
db = conn.getDB("yelp_academic")

//two manners:
db.review.aggregate(
  [
    {
      $match: {
        useful: {
          $gt: 4
        }
      }
    },
    { $sort: { stars: -1,useful:-1 }},
    {$limit:5}
  ]
).forEach(function(doc)
{print("\n"+"the business's id"+ doc.business_id+"\n"+"text is"+"\n"+ doc.text+"\n"+"stars_number: "+doc.stars+"\n"+"useful_degree: "+doc.useful)}
)


//db.review.find( {useful: { $gt: 200 }}).limit(5).sort({"stars":-1,"useful":-1}).forEach(function(doc) {print("\n"+"the business's id"+ doc.business_id+"\n"+"text is"+"\n"+ doc.text+"\n"+"stars_number: "+doc.stars+"\n"+"useful_degree: "+doc.useful)})
