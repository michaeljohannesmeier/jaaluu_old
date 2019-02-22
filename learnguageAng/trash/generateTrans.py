from googletrans import Translator
from pymongo import MongoClient
from textsGerman import text0, text1, text2, text3, text4, text5, text6, text7, text8, text9
from text import *
import re

translator = Translator()

client = MongoClient('mongodb://localhost:27017/')
db = client.learnguage_ger_eng
collection = db.texts

def generate(text):
    oText = []
    allTranslation = []
    mytrans = translator.translate(text.split(), dest='en', src='de')
    for word in mytrans:
        translation = []
        translation.append(re.sub(r'\W+', '', word))
        translation.append(mytrans.text)
        try:
            translation.append("(" + mytrans.extra_data['all-translations'][0][0] + ")")
        except:
            translation.append('')
        allTranslation.append(translate))
        oText.append(word + " ")
    return oText, allTranslation


def generateTextOutput(text, id):
    oTextHeadline0, transHeadline0 = generate(text.headline0)
    print("headline0 ok")
    oTextHeadline1, transHeadline1 = generate(text.headline1)
    print("headline1 ok")
    oTextHeadline2, transHeadline2 = generate(text.headline2)
    print("headline2 ok")
    oTextParagraph0, transParagraph0 = generate(text.paragraph0)
    print("paragraph0 ok")
    oTextParagraph1, transParagraph1 = generate(text.paragraph1)
    print("paragraph1 ok")
    oTextParagraph2, transParagraph2 = generate(text.paragraph2)
    print("paragraph2 ok")
    textObject = {
      '_id': id,
      'oTextHeadline0': oTextHeadline0,
      'transHeadline0': transHeadline0,
      'oTextHeadline1': oTextHeadline1,
      'transHeadline1': transHeadline1,
      'oTextParagraph0': oTextParagraph0,
      'transParagraph0': transParagraph0,
      'oTextParagraph1': oTextParagraph1,
      'transParagraph1': transParagraph1,
      'oTextParagraph2': oTextParagraph2,
      'transParagraph2': transParagraph2
    }
    collection.insert_one(textObject)
    print('Saved to Database OK')





#generateTextOutput(text0, 0)
#generateTextOutput(text1, 1)
#generateTextOutput(text2, 2)
#generateTextOutput(text3, 3)
#generateTextOutput(text4, 4)
#generateTextOutput(text5, 5)
generateTextOutput(text6, 6)
#generateTextOutput(text7, 7)
#generateTextOutput(text8, 8)



