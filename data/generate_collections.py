from pymongo import MongoClient
import random
from faker import Faker
def generate_ceo( number_of_chefs, db ):
    ar  = []
    fake = Faker()
    for i in range(number_of_chefs):
        k = {}
        k["nom"] = fake.last_name()
        k["prenom"] = fake.first_name()
        k["id_number"] = fake.itin()
        ar.append(k)
    ceo = db["ceo"]
    for i in ar:
        ceo.insert_one(i)

def generate_bank_accounts(db):
    ceo = db["ceo"]
    account = db["bank_account"]
    fake = Faker()
    for y in ceo.find():
        account.insert_one({"ceo_id":y["_id"], "bank_account_id": fake.itin()})
    for y in account.find():
        ceo.update_one({"_id":y["ceo_id"]}, {"$set":{"bank_account_id":y["_id"]}})


def main():
    c =    MongoClient()
    db = c.test_database
    db = c.yelp_academic
    try:
        print(db.command("serverStatus"))
        ceo_size = random.randint(1000, 1500)
        #generate_ceo(ceo_size, db)
        #generate_bank_accounts(db)
        associate_ceo_to_business(db)

    except Exception as e:
        print(e)
    else:
        "Connected"
        c.close()

main()
