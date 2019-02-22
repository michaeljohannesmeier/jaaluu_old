from googletrans import Translator
from logger import write_line
from pymongo import MongoClient
import re
import time
from nltk import tokenize
import generateImages
from datetime import datetime
import math
import imp
import random

translator = Translator()


client = MongoClient('mongodb://localhost:27017/')
db = client.learnguage_ger_fr
collection = db.texts
debugOn = False
wordCount = 0

def translate(word):
    global wordCount
    global debugOn
    write_line(word)
    # print(word)
    mytrans = translator.translate(word, dest='fr', src='de')
    time.sleep(15)
    translation = []
    translation.append(word)
    translation.append(mytrans.text)
    try:
        translation.append("(" + mytrans.extra_data['all-translations'][0][0] + ")")
    except:
        translation.append('')
    if debugOn:
        write_line('%s ---- OK' % word)
        # print('%s ---- OK' % word)
    wordCount += 1
    return translation

def generate(text):
    oText = []
    translation = []
    sentences = tokenize.sent_tokenize(text)
    for sentence in sentences:
        for word in sentence.split():
            wordToTrans = re.sub(r'\W+', '', word)
            translation.append(translate(wordToTrans))
            oText.append(word + " ")
        if sentence != word:
            translation.append(translate(sentence))
            oText.append('>ss<')
    return oText, translation


def generateDbImport(text, id, allHsAndPs, categories):
    global wordCount
    start_time = datetime.now()
    write_line('Started fetching text %s at: %s' % (id, start_time))
    # print('Started fetching text %s at: %s' % (id, start_time))
    textObject = {}
    textObject['_id'] = id
    textObject['category'] = categories
    counterH = 0
    counterP = 0
    for hOrP in allHsAndPs:
        if 'headline' in hOrP:
            exec ('''textObject['oTextHeadline%s'], textObject['transHeadline%s'] = generate(text.headline%s)''' % (counterH, counterH, counterH))
            write_line("headline%s ok" % counterH)
            # print("headline%s ok" % counterH)
            counterH += 1
        elif 'paragraph' in hOrP:
            exec ('''textObject['oTextParagraph%s'], textObject['transParagraph%s'] = generate(text.paragraph%s)''' % (counterP, counterP, counterP))
            write_line("paragraph%s ok" % counterP)
            # print("paragraph%s ok" % counterP)
            counterP += 1

    collection.insert_one(textObject)
    write_line('Saved text with id %s to Database OK \nExecution time: %s minutes \nWord count: %s'
        %(id, math.floor((datetime.now() - start_time).total_seconds()/60), wordCount))
    # print('Saved text with id %s to Database OK \nExecution time: %s minutes \nWord count: %s'
    #     %(id, math.floor((datetime.now() - start_time).total_seconds()/60), wordCount))


