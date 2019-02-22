    oTextHeadline1  = models.ManyToManyField(Word)
    transHeadline1  = models.ManyToManyField(Word)
    oTextHeadline2  = models.ManyToManyField(Word)
    transHeadline2  = models.ManyToManyField(Word)
    oTextParagraph0 = models.ManyToManyField(Word)
    transParagraph0 = models.ManyToManyField(Word)
    oTextParagraph1 = models.ManyToManyField(Word)
    transParagraph1 = models.ManyToManyField(Word)
    oTextParagraph2 = models.ManyToManyField(Word)
    transParagraph2 = models.ManyToManyField(Word)





        #if word[0:4] == "xxx_":
        #    outputString = outputString + ' <span class="hoverText" popoverTitle="{{ translation' + id + '[' + str(counter) + '][0] }}" ngbPopover="{{ translation' + id + '[' + str(counter) + '][1] }} {{ translation' + id + '[' + str(counter) + '][2] }}" triggers="mouseenter:mouseleave">' + word[4:] + '</span>'
        #    translation.append(translate(wordToTrans[4:]))
        #    counter += 1
        #else:
        #    outputString = outputString + ' ' + word


        text_file = open("OutputTranslation" + id + ".txt", "w")
        text_file.write(str(translation))
        text_file.close()



        arrayText0.otext.heading0 = "Headline Cero"
        arrayText0.otext.heading1 = "Headline One"
        arrayText0.otext.heading2 = "Headline Two"
        arrayText0.otext.paragraph0 = "Para Cero"
        arrayText0.otext.paragraph1 = "Para One"
        arrayText0.otext.paragraph2 = "Para Two"

        arrayText0.translation.heading0 = "_ Heading Cero"
        arrayText0.translation.heading1 = "_ Heading Cero"
        arrayText0.translation.heading2 = "_ Heading Cero"
        arrayText0.translation.paragraph0 = "_ Para Cero"
        arrayText0.translation.paragraph0 = "_ Para One"
        arrayText0.translation.paragraph0 = "_ Para Two"

        import json
        jsonO =  json.dumps(arrayText0.__init__)



            oTextHeadline1, transHeadline1 = generate(text0.headline1)
            oTextHeadline2, transHeadline2 = generate(text0.headline2)
            oTextParagraph0, transParagraph0 = generate(text0.paragraph0)
            oTextParagraph1, transParagraph1 = generate(text0.paragraph1)
            oTextParagraph2, transParagraph2 = generate(text0.paragraph2)

            print(oTextParagraph0)
            print(transParagraph0)

            text_file = open("./tresmundosAng/src/app/article-detail/outputText0.ts", encoding = "utf-8", mode = "w")
            text_file.write("export class Text {\n")
            text_file.write("  oTextHeadline0  = " + str(oTextHeadline0)  + "\n")
            text_file.write("  transHeadline0  = " + str(transHeadline0)  + "\n")
            text_file.write("  oTextHeadline1  = " + str(oTextHeadline1)  + "\n")
            text_file.write("  transHeadline1  = " + str(transHeadline1)  + "\n")
            text_file.write("  oTextHeadline2  = " + str(oTextHeadline2)  + "\n")
            text_file.write("  transHeadline2  = " + str(transHeadline2)  + "\n")

            text_file.write("  oTextParagraph0 = " + str(oTextParagraph0) + "\n")
            text_file.write("  transParagraph0 = " + str(transParagraph0) + "\n")
            text_file.write("  oTextParagraph1 = " + str(oTextParagraph1) + "\n")
            text_file.write("  transParagraph1 = " + str(transParagraph1) + "\n")
            #text_file.write("  oTextParagraph2 = " + str(oTextParagraph2) + "\n")
            #text_file.write("  transParagraph2 = " + str(transParagraph2) + "\n")
            text_file.write("}")
            text_file.close()



            Ein gemeinsames Land, einen modernen Staat hatten die Deutschen seit 1871. Das Deutsche Reich hatte erst Kaiser und war seit 1919 eine Republik. In den Jahren von 1933 bis 1945 herrschte der Nationalsozialismus, der den Zweiten Weltkrieg auslöste.
            Danach war Deutschland geteilt: Im Westen entstand die Bundesrepublik Deutschland, ein freier, demokratischer Staat. Im Osten gründeten die Kommunisten mit Hilfe der Sowjetunion die Deutsche Demokratische Republik. Doch die Deutschen wollten wieder in einem gemeinsamen Staat leben. Nach 40 Jahren, als die Sowjetunion gerade schwach war, musste die Deutsche Demokratische Republik freie Wahlen zulassen. Im Jahr 1990 hörte dieser Staat auf zu bestehen: Der Osten schloss sich der Bundesrepublik im Westen an.
            '''



text_file = open("./tresmundosAng/src/assets/textsGerman/outputText" + str(id) + ".ts", encoding = "utf-8", mode = "w")

text_file.write("export class Text" + str(id) + " {\n")
text_file.write("  oTextHeadline0  = " + str(oTextHeadline0)  + "\n")
text_file.write("  transHeadline0  = " + str(transHeadline0)  + "\n")
text_file.write("  oTextHeadline1  = " + str(oTextHeadline1)  + "\n")
text_file.write("  transHeadline1  = " + str(transHeadline1)  + "\n")
text_file.write("  oTextHeadline2  = " + str(oTextHeadline2)  + "\n")
text_file.write("  transHeadline2  = " + str(transHeadline2)  + "\n")

text_file.write("  oTextParagraph0 = " + str(oTextParagraph0) + "\n")
text_file.write("  transParagraph0 = " + str(transParagraph0) + "\n")
text_file.write("  oTextParagraph1 = " + str(oTextParagraph1) + "\n")
text_file.write("  transParagraph1 = " + str(transParagraph1) + "\n")
text_file.write("  oTextParagraph2 = " + str(oTextParagraph2) + "\n")
text_file.write("  transParagraph2 = " + str(transParagraph2) + "\n")
text_file.write("}")
text_file.close()