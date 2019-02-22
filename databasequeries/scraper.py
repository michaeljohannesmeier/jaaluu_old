
# coding=utf-8

import urllib3
http = urllib3.PoolManager()
import requests
import pickle
import requests
from bs4 import BeautifulSoup
import csv
urllib3.disable_warnings()

def getCategoryEnglish(category):
    categoriesGerman = [
        'Bekannte Leute',
        'Berufe und Wirtschaft',
        'Erdkunde',
        'Essen und Trinken',
        'Geschichte',
        'Glaube und Denken',
        'Körper und Gesundheit',
        'Politik und Gesellschaft',
        'Sport und Spaß',
        'Sprache und Kultur',
        'Tiere und Natur',
        'Wissenschaft und Technik'
    ]
    categoriesEnglish = [
        'known_people',
        'jobs_and_economy',
        'geography',
        'food_and_drinks',
        'history',
        'believe_and_think',
        'body_and_health',
        'politic_and_society',
        'sport_and_fun',
        'language_and_culture',
        'animals_and_nature',
        'science_and_technic'
    ]
    for i, categoryGerman in enumerate(categoriesGerman):
        if categoryGerman == category:
            return categoriesEnglish[i]

def extractLinks():
    url = 'https://klexikon.zum.de/index.php?title=Kategorie:Klexikon-Artikel&pageuntil=Kafka%2C+Franz%0AFranz+Kafka#mw-pages'
    response = http.request('GET', url)
    soup = BeautifulSoup(response.data, 'html.parser')
    table_div = soup.find('div', attrs={'id': 'mw-pages'})
    allLinks = table_div.findAll('li')
    allLinkTitles = []
    for link in allLinks:
        link_stripped = link.get_text()
        link_stripped = link_stripped.strip()
        link_stripped = link_stripped.replace(' ', '_')
        allLinkTitles.append(link_stripped)
    file = open('klexicionLinks', 'wb', encoding='utf-8')
    pickle.dump(allLinkTitles, file)
    file.close()

def getLinks():
    file = open('klexicionLinks', 'rb')
    links = pickle.load(file)
    return links

def generateText(id, name, name_dirty):
    url = 'https://klexikon.zum.de/wiki/' + name_dirty
    response = requests.request('GET', url)
    soup = BeautifulSoup(response.content, 'html.parser')
    firstHeading = soup.find('h1', attrs={'class': 'firstHeading'})
    my_content_text = soup.find('div', attrs={'id': 'mw-content-text'})
    allPsAndHs = my_content_text.findChildren(['p', 'h2'], recursive=False)
    categories = []
    category_list_elements = soup.find('div', attrs={'id': 'mw-normal-catlinks'})
    category_li_elements = category_list_elements.findChildren(['li'], recursive=True)
    for category_li_element in category_li_elements[1:]:
        categories.append(getCategoryEnglish(category_li_element.get_text()))
    counterP = 0
    counterH = 1
    pText=''
    hText=''
    print('ÖLAKSFÖLAKSJÖLAKJSDFÖLKAJSFLÖ')
    # with open('./textsGerman/text' + str(id) + '_' + name + '.py', mode='w', encoding='UTF-8', errors='strict', buffering=1) as file:
    #     file.write("headline0='''" + firstHeading.get_text() + "'''\n\n", encoding='utf-8')
    #     for pah in allPsAndHs:
    #         if pah.name == 'p':
    #             if hText != '':
    #                 file.write("headline" + str(counterH) + "='''" + hText + "'''\n\n", encoding='utf-8')
    #                 hText=''
    #                 counterH += 1
    #             pText = pText + pah.get_text()
    #         if pah.name == 'h2':
    #             if pText != '':
    #                 file.write("paragraph" + str(counterP) + "='''" + pText + "'''\n\n", encoding='utf-8')
    #                 pText=''
    #                 counterP += 1
    #             hText = hText + pah.get_text()
    #         if pah == allPsAndHs[-1]:
    #             if pah.name == 'p':
    #                 file.write("paragraph" + str(counterP) + "='''" + pText + "'''\n\n", encoding='utf-8')
    #             if pah.name == 'h2':
    #                 file.write("headline" + str(counterH) + "='''" + hText + "'''\n\n", encoding='utf-8')
    return categories







