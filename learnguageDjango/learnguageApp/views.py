from django.shortcuts import render
import os


def index(request, path=''):
    context = {}
    static_dirs = os.listdir('learnguageApp/static/')
    for static_dir in static_dirs:
        if 'runtime' in static_dir:
            context['runtime'] = static_dir
        elif 'polyfills' in static_dir:
            context['polyfills'] = static_dir
        elif 'styles' in static_dir:
            context['styles'] = static_dir
        elif 'main' in static_dir:
            context['main'] = static_dir
        elif 'scripts' in static_dir:
            context['scripts'] = static_dir
    return render(request, 'index.html', context)


