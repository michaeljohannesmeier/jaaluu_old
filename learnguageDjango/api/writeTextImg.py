from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import os

os.chdir("../../learnguageAng/src/static/assets/words" )

# img = Image.open("../../learnguageAng/src/static/assets/words/House_3.jpg")
# draw = ImageDraw.Draw(img)
# font = ImageFont.truetype('Roboto-Bold.ttf', size=15)
# draw.rectangle((0, 0, 400, 22), outline='black', fill='black')
# draw.text((5, 0), "Ein Haus hat eine Tür = a house has a door", (255, 255, 255), font=font)
# img.save('../../learnguageAng/src/static/assets/words/House_3_Text.jpg')

# 'convert House_3.jpg - resize 400 x200\!  House_3.jpg'
# 'ffmpeg -f lavfi - i anullsrc = channel_layout = 5.1:sample_rate = 48000 - t 10 silence.mp3'
# os.system('ffmpeg -i "concat:word_1.mp3|silence.mp3" -c copy word_and_silence_1.mp3')
# os.system('ffmpeg -i word_and_silence_1.mp3 -ss 00:00:00.000 -t 00:00:03.000 word_1_normalized.mp3')
# os.system('ffmpeg -framerate 1/3 -i House_1_Text.jpg -i word_1_normalized.mp3 -c:v libx264 -pix_fmt yuv420p output_1.mp4')
# os.system('ffmpeg -framerate 1/3 -i House_2_Text.jpg -i word_2_normalized.mp3 -c:v libx264 -pix_fmt yuv420p output_2.mp4')
# os.system('ffmpeg -framerate 1/3 -i House_3_Text.jpg -i word_3_normalized.mp3 -c:v libx264 -pix_fmt yuv420p output_3.mp4')
os.system('ffmpeg -i output_1.mp4 -i output_2.mp4 -i output_3.mp4 -filter_complex "[0:v] [0:a] [1:v] [1:a] [2:v] [2:a] concat=n=3:v=1:a=1 [v] [a]" -map "[v]" -map "[a]" output_final.mp4')



