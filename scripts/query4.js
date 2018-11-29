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
              { $project: { user_id:1, stars:1, text:1, business_id:1} }
           ],
           as: "req_data"
         }
    }
]).forEach(function(doc){if(doc.req_data.length>0) {
  print("***\nuser_id=",doc.user_id);
  doc.req_data.forEach(function(d){print("\nbusiness_id=",d.business_id,"\nstarts=",d.stars,"\ntext=",d.text)})}})
