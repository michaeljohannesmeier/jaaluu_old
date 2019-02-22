from django.http import HttpResponse
import json
import pymongo
from pymongo import MongoClient
from googletrans import Translator
import time
import requests
import os
import subprocess
from google.cloud import texttospeech
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
from django.conf import settings

translator = Translator()


client = MongoClient('mongodb://localhost:27017/')
# client = MongoClient('mongodb://46.101.137.166:27017/')



def texts(request, category='all'):
    lan = request.GET.get('lan')
    db = client['learnguage_ger_' + lan ]
    collection = db.texts
    allTexts = [];
    if category == 'all':
        qs = collection.find().sort([('_id', 1)])
    else:
        qs = collection.find({'category': category}).sort([('_id', 1)])
    for text in qs:
        oTextHeadline0 = []
        transHeadline0 = []
        oTextParagraph0 = []
        transParagraph0 = []
        for i in range(0,len(text['oTextHeadline0'])):
            if text['oTextHeadline0'][i] != '>ss<':
                oTextHeadline0.append(text['oTextHeadline0'][i])
                transHeadline0.append(text['transHeadline0'][i])
        for i in range(0, 30):
            if text['oTextParagraph0'][i] != '>ss<':
                oTextParagraph0.append(text['oTextParagraph0'][i])
                transParagraph0.append(text['transParagraph0'][i])
        allTexts.append({
            'id': text['_id'],
            'oTextHeadline0': oTextHeadline0,
            'transHeadline0': transHeadline0,
            'oTextParagraph0': oTextParagraph0,
            'transParagraph0': transParagraph0
        })
    return HttpResponse(json.dumps(allTexts), content_type='application/json')


def text(request):
    id = int(request.GET.get('id'))
    lan = request.GET.get('lan')
    db = client['learnguage_ger_' + lan ]
    collection = db.texts
    text =  list(collection.find({'_id': id}))[0]
    return HttpResponse(json.dumps(text), content_type='application/json')

def translate(request):
    word = request.GET.get('word')
    mytrans = translator.translate(word, dest='en', src='de')
    translation = mytrans.extra_data['translation'][0][0]
    return HttpResponse(json.dumps(translation), content_type='application/json')

def saveword(request):

    db = client.jaaluu_words
    collection = db.words
    body_unicode = request.body.decode('utf-8')
    content = json.loads(body_unicode)

    db_content = {}
    db_content['article_single_original'] = content['articleSingle'].strip()
    db_content['word_single_original'] = content['wordSingle'].strip()
    db_content['article_plural_original'] = content['articlePlural'].strip()
    db_content['word_plural_original'] = content['wordPlural'].strip()
    db_content['example_original'] = content['example'].strip()
    db_content['url_single'] = content['urlSingle'].strip()
    db_content['url_plural'] = content['urlPlural'].strip()
    db_content['url_example'] = content['urlExample'].strip()
    db_content['categories'] = content['categories']

    for part in ['article_single', 'article_plural', 'word_single', 'word_plural', 'example']:
        word = db_content[part + '_original']
        mytrans = translator.translate(word, dest='en', src='de')
        db_content[part + '_translated'] = mytrans.extra_data['translation'][0][0].strip()
        time.sleep(10)
    for part in ['single', 'plural']:
        word = db_content['article_' + part + '_original'] + db_content['word_' + part + '_original']
        mytrans = translator.translate(word, dest='en', src='de')
        db_content['complete_' + part + '_translated'] = mytrans.extra_data['translation'][0][0]
        time.sleep(10)
    collection.insert_one(db_content)


    word_path = os.path.join(settings.BASE_DIR,'../learnguageAng/src/static/assets/words', db_content['word_single_translated'])


    if os.path.isdir(word_path):
        return HttpResponse('Word already exists', status=200)
    os.mkdir(word_path)


    for part in ['single', 'plural', 'example']:
        pic = requests.get(db_content['url_' + part])
        with open(word_path + '/word_' + part + '.jpg',
                  "wb") as fh:
            fh.write(pic.content)
        time.sleep(3)

    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.join(settings.BASE_DIR, '..','databasequeries/Learnguage-893c045d3652.json')

    clientTTS = texttospeech.TextToSpeechClient()
    for part in ['single', 'plural', 'example']:
        if part == 'example':
            text_to_speech = db_content['example_original']
        else:
            text_to_speech = db_content['article_' + part + '_original'] + ' ' + db_content['word_' + part + '_original']

        synthesis_input = texttospeech.types.SynthesisInput(text=text_to_speech)
        voice = texttospeech.types.VoiceSelectionParams(
            language_code='de-DE',
            ssml_gender=texttospeech.enums.SsmlVoiceGender.MALE)
        audio_config = texttospeech.types.AudioConfig(
            audio_encoding=texttospeech.enums.AudioEncoding.MP3)
        response = clientTTS.synthesize_speech(synthesis_input, voice, audio_config)
        with open('../learnguageAng/src/static/assets/words/' + db_content['word_single_translated'] + '/word_' + part + '.mp3', 'wb') as out:
            out.write(response.audio_content)


    os.chdir("../learnguageAng/src/static/assets/words/" + db_content['word_single_translated'])
    silence_path = os.path.join(settings.BASE_DIR,'../learnguageAng/src/static/assets/words/')

    for i in ['single', 'plural', 'example']:
        exec_string = 'convert word_' + i + '.jpg -resize 800x600\! word_' + i + '.jpg'
        subprocess.call(exec_string, shell=True)

    for part in ['single', 'plural', 'example']:
        img = Image.open('word_' + part + '.jpg')
        draw = ImageDraw.Draw(img)
        if part == 'example':
            font = ImageFont.truetype('Roboto-Bold.ttf', size=35)
            draw.rectangle((0, 0, 800, 50), outline='black', fill='black')
            text_original = db_content['example_original']
            text_translated = db_content['example_translated']
        else:
            font = ImageFont.truetype('Roboto-Bold.ttf', size=35)
            draw.rectangle((0, 0, 800, 50), outline='black', fill='black')
            text_original = db_content['article_' + part + '_original'] + ' ' + db_content['word_' + part + '_original']
            text_translated = db_content['complete_' + part + '_translated']
        draw.text((10, 3), text_original + ' = ' + text_translated, (255, 255, 255), font=font)
        img.save('word_' + part + '.jpg')

    for i in ['single', 'plural', 'example']:
        subprocess.call('ffmpeg -i word_' + i + '.mp3 -i ' + silence_path + 'silence.mp3 -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" word_' + i + '_normalized.mp3', shell=True)
        subprocess.call('ffmpeg -i word_' + i + '_normalized.mp3 -ss 00:00:00.000 -t 00:00:04.000  word_' + i + '_normalized_short.mp3', shell=True)
        subprocess.call('ffmpeg -framerate 1/4 -i word_' + i + '.jpg -i word_' + i + '_normalized_short.mp3 -c:v libx264 -pix_fmt yuv420p -y output_' + i + '.mp4', shell=True)

    subprocess.call('ffmpeg -i output_single.mp4 -i output_plural.mp4 -i output_example.mp4 -filter_complex "[0:v] [0:a] [1:v] [1:a] [2:v] [2:a] concat=n=3:v=1:a=1 [v] [a]" -map "[v]" -map "[a]" output.mp4', shell=True)

    return HttpResponse(status=200)




def adminwords(request):
    db = client['jaaluu_words']
    collection = db.words
    qs = collection.find().sort([('word_single_translated', 1)])
    allWords = []
    for word in qs:
        allWords.append(word['word_single_translated'])
    return HttpResponse(json.dumps(allWords), content_type='application/json')


