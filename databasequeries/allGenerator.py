#!/usr/bin/env python
# -*- coding: utf-8 -*-

# export PYTHONIOENCODING=utf8


from scraper import getLinks, generateText, extractLinks
from generateImages import generateImages, generateHoverImages
from generateHover import generateDbImport
from logger import write_line
from send_mail import send_mail
import ssl
ssl._create_default_https_context = ssl._create_unverified_context



try:
    links = getLinks()
    for j in [300]:
        if j == 270:
            continue
        name = links[j]
        name_dirty = name
        if '/' in name:
            name = name.replace('/', '')
        if 'ü' in name:
            name = name.replace('ü', 'ue')
        if 'Ü' in name:
            name = name.replace('Ü', 'Ue')
        if 'ö' in name:
            name = name.replace('ö', 'oe')
        if 'ö' in name:
            name = name.replace('Ö', 'Oe')
        if 'Ä' in name:
            name = name.replace('Ä', 'Ae')
        if 'ä' in name:
            name = name.replace('ä', 'ae')
        if 'ß' in name:
            name = name.replace('ß', 'ss')
        if j == 80:
            name = 'Ampere'
        write_line('Download of %s started' % name)
        categories = generateText(j, name, name_dirty)
        exec ("import textsGerman.text%s_%s as text" % (j, name))
        allHsAndPs = []
        for onedir in dir(text):
            if 'headline' in onedir or 'paragraph' in onedir:
                allHsAndPs.append(onedir)

        generateDbImport(text, j, allHsAndPs, categories)
        # generateImages(j, allHsAndPs, name, name_dirty)
        # generateHoverImages(j, allHsAndPs)
except Exception as e:
    print(e)
    send_mail()
    write_line(e)



