import pymongo

def conectar_banco():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["BioKinectCare"]
    collection = db["pacientes2.0"]
    return collection
