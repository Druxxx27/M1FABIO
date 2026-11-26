from django.shortcuts import render
import json

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Serie

@csrf_exempt
def api_series(request):
    if request.method ==  "POST":
        dados = json.loads(request.body)
        serie = Serie.objects.create(
            titulo = dados["titulo"],
            plataforma = dados['plataforma'],
            ano = dados['ano'],          
            avaliacao = dados['avaliação']
        )
        return JsonResponse({"id": serie.id}, status = 201)


    series = list(Serie.objects.values())
    return JsonResponse(series, safe=False)


def resumo(request):
    if request.method == "GET":
        series = Serie.objects.all()

        quant = 0;
        media = 0;

        for serie in series:
            quant += 1
            media += serie.avaliacao

        if quant > 0:
            media = round(media / quant, 1)

        return JsonResponse({
            "quantidade": quant,
            "media": media
        })

