from pymongo import MongoClient

def associate_ceo_to_business(db):
    ceo = db["ceo"]
    business = db["business"]
    ceo_a = list(ceo.find())
    ceo_list = ceo.find()
    print( len(ceo_a) )
    # Create a new field with the ceo_list and update the business collection
    # Take a random sample between 1 and 10 from the ceo collection
    for bus in business.find():
        k = [ i["_id"] for i in random.sample(list(ceo_a),random.randint(1,10))]
        bus.update({"ceo_list": k})
        print(bus)
        business.replace_one(filter={"_id":bus["_id"]},replacement=bus)

    # Create a new field with the business_id and update the ceo collection
    for y in ceo.find():
        b = business.find({"ceo_list": y["_id"]})
        k = [ i["_id"] for i in b ]
        y.update({"business_list":k})
        ceo.replace_one(filter={"_id":y["_id"]},replacement=y)


def main():
    c =    MongoClient()
    db = c.test_database
    db = c.yelpdb
    try:
        print(db.command("serverStatus"))
        ceo_size = random.randint(1000, 1500)
        associate_ceo_to_business(db)
    except Exception as e:
        print(e)
    else:
        "Connected"
        c.close()

main()
