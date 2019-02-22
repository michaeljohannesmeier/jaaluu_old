from pymongo import MongoClient



client = MongoClient('mongodb://46.101.137.166:27017/')
db_eng = client.learnguage_ger_eng
db_es = client.learnguage_ger_es
db_fr = client.learnguage_ger_fr
db_jaaluu = client.jaaluu_ger

collection_eng = db_eng.texts
collection_es = db_es.texts
collection_fr = db_fr.texts
collection_jaaluu = db_jaaluu.texts


qs_eng = collection_eng.find()

for text_eng in qs_eng:
    text_es = collection_es.find({'_id': text_eng['_id']})[0]
    text_fr = collection_fr.find({'_id': text_eng['_id']})[0]
    new_text = {}
    new_text['eng'] = {}
    new_text['es'] = {}
    new_text['fr'] = {}
    new_text['ger'] = {}
    new_text['_id'] = text_eng['_id']
    for i in ['0','1','2']:
        if ('oTextHeadline' + i) in text_eng:
            new_text['ger']['oTextHeadline' + i] = text_eng['oTextHeadline' + i]
            new_text['eng']['transHeadline' + i] = text_eng['transHeadline' + i]
            new_text['es']['transHeadline' + i] = text_es['transHeadline' + i]
            new_text['fr']['transHeadline' + i] = text_fr['transHeadline' + i]
        if ('oTextParagraph' + i) in text_eng:
            new_text['ger']['oTextParagraph' + i] = text_eng['oTextParagraph' + i]
            new_text['eng']['transParagraph' + i] = text_eng['transParagraph' + i]
            new_text['es']['transParagraph' + i] = text_es['transParagraph' + i]
            new_text['fr']['transParagraph' + i] = text_fr['transParagraph' + i]
    collection_jaaluu.insert_one(new_text)

