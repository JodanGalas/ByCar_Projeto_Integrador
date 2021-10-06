import pymongo
import pandas as pd

mongo = pymongo.MongoClient('mongodb://localhost:27017/')

db = ["bycar"] #mudar o nome do banco depois se quiser!!!
db = mongo.bycar 
#func
df = pd.read_csv(r'C:\Users\jodan\Documents\csteste3.csv') #usuario
data = df.to_dict(orient="records")
db.usuarios.insert_many(data)

#df = pd.read_csv(r'C:') 
#data = df.to_dict(orient="records")
#db.anuncios.insert_many(data)