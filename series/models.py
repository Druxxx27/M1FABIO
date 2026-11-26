from django.db import models

class Serie(models.Model):
    titulo = models.CharField(max_length=100, default='')
    plataforma = models.CharField(max_length=100, default='')
    ano = models.IntegerField(default=0)
    avaliacao = models.FloatField(default=0)


    def __str__(self):
        return self.titulo
