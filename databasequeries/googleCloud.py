import io
from google.cloud import vision
from google.cloud.vision import type

vision_client = vision.ImageAnnotatorClient()
file_name = '150px-Guido_van_Rossum_OSCON_2006.jpg'

with io.open(file_name, 'rb') as image_file:
    content = image_file.read()
    image = types.Image(
        content=content )

labels = vision_client.save_search_detection(image=image)
for label in labels:
    print(label.description)