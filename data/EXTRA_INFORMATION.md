### Relation between collections
```
business:checkin -> 1:N
business:review -> 1:N
business:tip -> 1:N
review:user -> N:1
tip:user -> N:1
```

```

We created X registers that contain duplicates and redundant information.

### Index creation
// At least 2 indexes

The first index it's donne over the business collection using the stars field like index. That field is important because will be often used to query the stars given cecrtain condition like the business with a stars count greatter than 3 and belong to the category travel
db.business.createIndex({"stars":1})
db.business.getIndexes()
db.business.explain(true).find({"stars":{$gt: 2}} ,{_id:1})


db.business.aggregate([
   {
     $lookup:
       {
         from: "review",
         localField: "business_id",
         foreignField: "business_id",
         as: "xreviewparbusiness"
       }
  }
])

As we want all the business differents from the Restaurants, we need to remove the items associated with restaurants before remove it from business. Also because the size of some collections will take a lot of time if we don't index the right field. So the field business_id from the collections review,tip,checkin and businnes will be used like index to speed  up the find and remove operations.
```
db.business.createIndex({"business_id":1})
db.review.createIndex({"business_id":1})
db.tip.createIndex({"business_id":1})
db.checkin.createIndex({"business_id":1})
```




### Complex queries

1. We want to know the
```
db.chef.aggregate([
{$lookup:{from:"business", localField:"_id",foreignField:"chef_id",as:"list_entreprises"}},
{$unwind:"$list_entreprises"},
{$group:{
"_id":"$_id",
avg:{$avg: "$list_entreprises.stars"}
}}])
```


2.
3.
```
db.tip.aggregate([
   {
     $lookup:
       {
         from: "review",
         localField: "user_id",
         foreignField: "user_id",
         as: "tip_review"
       }
  }
])

db.tip[1]["tipreview"].distinct("user_id").count()
```
4.
5. We want to delete some fields from all the docuemtns inside the user collection. These fields won't be used and take at least the half of size for each document and we want to reduce the size of the db
```
db.user.update({},{$unset:{"compliment_hot":1,"compliment_more":1,"compliment_profile":1,"compliment_cute":1,"compliment_list":1,"compliment_note":1,"compliment_plain":1,"compliment_cool":1,"compliment_funny":1,"compliment_writer":1,"compliment_photos":1}},{multi:true});
```



mongoexport --db yelpdb -c business --out business.json

mongoexport --db yelpdb -c checkin --out checkin.json

db.user.update({},{$unset:{"compliment_hot":1,"compliment_more":1,"compliment_profile":1,"compliment_cute":1,"compliment_list":1,"compliment_note":1,"compliment_plain":1,"compliment_cool":1,"compliment_funny":1,"compliment_writer":1,"compliment_photos":1}},{multi:true});





db.user.aggregate({
  {$lookup: {

    }}
  })

```
  db.ceo.aggregate([
  {$lookup:{from:"business", localField:"_id",foreignField:"ceo_list",as:"list_entreprises"}},
  {$unwind:"$list_entreprises"},
  {$group:{
  "_id":"$_id",
  avg:{$avg: "$list_entreprises.stars"}
  }}])

```

db.business.find({}).forEach( function(d) {if(db.checkin.count({"business_id":d.business_id}) > 1) print("pilas")})
