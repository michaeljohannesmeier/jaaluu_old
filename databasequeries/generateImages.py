

from pymongo import MongoClient
import math
import json
import os
import requests
import time
import os.path
from bs4 import BeautifulSoup
import urllib3

http = urllib3.PoolManager()

def generateImages(text_id, allHsAndPs, name, name_dirty):
    client_id = "00d7daff4c4f80d95f26d63a11cadac0d762b2777a746d53c5664d3ee4d70b6a"
    client_secret = "fbcb17664acfe854223b869d9263a5dccd8d50b035498e6c50325d063f50ebee"

    client = MongoClient('mongodb://localhost:27017/')
    db = client.learnguage_ger_eng
    collection = db.texts

    name = name.replace('Ä', 'A')
    name = name.replace('ä', 'a')
    name = name.replace('Ö', 'O')
    name = name.replace('ö', 'o')
    name = name.replace('Ü', 'U')
    name = name.replace('ü', 'u')

    name_dirty = name_dirty.replace('Ä', 'A')
    name_dirty = name_dirty.replace('ä', 'a')
    name_dirty = name_dirty.replace('Ö', 'O')
    name_dirty = name_dirty.replace('ö', 'o')
    name_dirty = name_dirty.replace('Ü', 'U')
    name_dirty = name_dirty.replace('ü', 'u')

    name_english = []
    textObj = collection.find_one({'_id': text_id})
    headlineArray = textObj['transHeadline0']

    name = name.strip()

    if len(headlineArray) > 1:
        headlineArray = headlineArray[:-1]
    for headline in headlineArray:
        name_english.append(headline[1] + ' ')
    name_english = ' '.join(name_english)

    response = requests.get(
        'https://api.unsplash.com/search/photos/?query=' + name_english + '&client_id=' + client_id)
    data = json.loads(response.text)
    counterPicUnsplash = 0


    # url = 'https://klexikon.zum.de/wiki/' + name_dirty
    # response = requests.request('GET', url)
    # soup = BeautifulSoup(response.content, 'html.parser')
    # imagesUrls = soup.find('img')['src']
    # if isinstance(imagesUrls, str):
    #     tmpImagesUrls = []
    #     tmpImagesUrls.append(imagesUrls)
    #     imagesUrls = tmpImagesUrls

    upto_range = math.floor(len(allHsAndPs)/2)
    for i in range(0, upto_range):
        # try:
        #     imageUrl = imagesUrls[i]
        #     image = 'https://klexikon.zum.de/' + imageUrl
        #     img_data = requests.get(image).content
        #     with open('../learnguageAng/src/static/assets/images/text' + str(text_id) + "_" + str(i) + "_" + name + ".jpg", "wb") as fh:
        #         fh.write(img_data)
        # except:
        try:
            result = data['results'][counterPicUnsplash]
            thumburl = result['urls']['thumb']
            pic = requests.get(thumburl)
            with open("../learnguageAng/src/static/assets/images/text" + str(text_id) + "_" + str(i) + "_" + name + ".jpg", "wb") as fh:
                fh.write(pic.content)
            counterPicUnsplash += 1
        except:
            print("Fetching general pic for text: " + name + " with number: " + str(i) + " -- ERROR")

def generateHoverImages(text_id, allHsAndPs):
    client_id = "00d7daff4c4f80d95f26d63a11cadac0d762b2777a746d53c5664d3ee4d70b6a"
    client_secret = "fbcb17664acfe854223b869d9263a5dccd8d50b035498e6c50325d063f50ebee"

    client = MongoClient('mongodb://localhost:27017/')
    db = client.learnguage_ger_eng
    collection = db.texts
    textObj = collection.find_one({'_id': text_id})

    for oneHOrP in allHsAndPs:
        short_name = oneHOrP[0] + oneHOrP[-1]
        dbObjName = 'trans%s' % oneHOrP.capitalize()
        for i, query in enumerate(textObj[dbObjName]):
            querytext = query[1]
            if query[2] == '(noun)':
                if not  os.path.isfile("../learnguageAng/src/static/assets/images/text" + str(text_id) + "/" + short_name + "-" + str(i) + "-0-" + querytext + ".jpg") or not\
                        os.path.isfile("../learnguageAng/src/static/assets/images/text" + str(text_id) + "/" + short_name + "-" + str(i) + "-1-" + querytext + ".jpg") or not \
                        os.path.isfile("../learnguageAng/src/static/assets/images/text" + str(text_id) + "/" + short_name + "-" + str(i) + "-2-" + querytext + ".jpg") or not \
                        os.path.isfile("../learnguageAng/src/static/assets/images/text" + str(text_id) + "/" + short_name + "-" + str(i) + "-3-" + querytext + ".jpg"):
                    try:
                        if not os.path.exists("../learnguageAng/src/static/assets/images/text" + str(text_id)):
                            os.mkdir("../learnguageAng/src/static/assets/images/text" + str(text_id))

                        response = requests.get('https://api.unsplash.com/search/photos/?query=' + querytext +'&client_id=' + client_id)
                        data = json.loads(response.text)
                        for j, result in enumerate(data['results'][0:4]):
                            thumburl = result['urls']['thumb']
                            pic = requests.get(thumburl)
                            with open("../learnguageAng/src/static/assets/images/text" + str(text_id) + "/" + short_name + "-" + str(i) + "-" + str(j) + "-" + querytext + ".jpg", "wb") as fh:
                                fh.write(pic.content)
                            print("Fetching for word: " + querytext + " with number: " + str(j) + " -- OK")

                    except:
                        print("Fetching for word: " + querytext + " -- ERROR")
                    finally:
                        time.sleep(25)


