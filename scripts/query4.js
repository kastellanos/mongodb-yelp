conn = new Mongo();
db = conn.getDB("yelp_academic")

db.user.aggregate([
   {
      $lookup:
         {
           from: "review",
           let: { user_id_user: "$user_id", average_stars_user: "$average_stars" },
           pipeline: [
              { $match:
                 { $expr:
                    { $and:
                       [
                         { $eq: [ "$user_id", "$$user_id_user" ] },
                         { $gte: [ "$$average_stars_user","$stars"  ] }
                       ]
                    }
                 }
              },
              { $project: { user_id:1, stars:1, text:1} }
           ],
           as: "req_data"
         }
    }
])
