
from google.cloud import texttospeech
from scraper import getLinks
import time

links = getLinks()
for j in range(280, 310, 10):
    time.sleep(60)
    name = links[j]
    name_dirty = name
    if '/' in name:
        name = name.replace('/', '')
    print('Audio-Download of %s started' % name)
    exec("import textsGerman.text%s_%s as text" % (j, name))
    complete_text = ''
    for index in range(0, int(len(dir(text)[8:])/2)):
        exec ("from textsGerman.text%s_%s import headline%s as textpart" % (j, name, index))
        complete_text = complete_text + '\n\n' + textpart
        exec ("from textsGerman.text%s_%s import paragraph%s as textpart" % (j, name, index))
        complete_text = complete_text + '\n\n' + textpart
    client = texttospeech.TextToSpeechClient()
    synthesis_input = texttospeech.types.SynthesisInput(text=complete_text)
    voice = texttospeech.types.VoiceSelectionParams(
        language_code='de-DE',
        ssml_gender=texttospeech.enums.SsmlVoiceGender.MALE)
    audio_config = texttospeech.types.AudioConfig(
        audio_encoding=texttospeech.enums.AudioEncoding.MP3)
    response = client.synthesize_speech(synthesis_input, voice, audio_config)
    with open('../learnguageAng/src/static/assets/audio/text' + str(j) + '.mp3', 'wb') as out:
        # Write the response to the output file.
        out.write(response.audio_content)
        print('Audio content written for article %s %s' % (j, name))




