from rest_framework import serializers
from .models import Text0


class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text0
        fields = ('oTextHeadline0', 'transHeadline0')
        # 'oTextHeadline1', 'transHeadline1', 'oTextHeadline2', 'transHeadline2', 'oTextParagraph0', 'transParagraph0', 'oTextParagraph1', 'transParagraph1', 'oTextParagraph2', 'transParagraph2')


