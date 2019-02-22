
from djongo import models



class Word(models.Model):
    word = models.CharField(max_length=255)
    def __unicode__(self):
        return self.word

#class Text(models.Model):
#    oTextHeadline0  = models.ArrayModelField(model_container=Word)


class Text0(models.Model):
    oTextHeadline0  = models.ManyToManyField(Word, related_name = "oTextHeadline0")
    transHeadline0  = models.ManyToManyField(Word, related_name = "transHeadline0")




