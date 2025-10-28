from django.db import models
from django.conf import settings
from django.core.validators import MinLengthValidator, MaxLengthValidator

# Create your models here.

'''
-- Table for Airsoft Fields
CREATE TABLE Fields (
    field_id INTEGER PRIMARY KEY AUTOINCREMENT,
    field_name TEXT NOT NULL,
    address TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    phone TEXT,
    description TEXT,
    operating_hours TEXT,
    visible INTEGER DEFAULT 1, -- 0: inactive, 1: active
    organizer_id INTEGER NOT NULL,
    FOREIGN KEY (organizer_id) REFERENCES Organizers(organizer_id)
);

-- Table for Field Photos
CREATE TABLE FieldPhotos (
    photo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    field_id INTEGER NOT NULL,
    photo_url TEXT NOT NULL,
    photo_description TEXT,
    order_in_gallery INTEGER,
    FOREIGN KEY (field_id) REFERENCES Fields(field_id) ON DELETE CASCADE -- If the field is deleted, photos are also
);
'''

class Field(models.Model):

    FIELD_TYPE_CHOICES = [
        ('CQB', 'CQB'),
        ('MATA', 'Mata'),
        ('MISTO', 'Misto'),
        ('SPEED', 'Speed'),
    ]

    field_name = models.CharField(max_length=200, verbose_name="Nome do campo")
    field_type = models.CharField(max_length=10, choices=FIELD_TYPE_CHOICES, verbose_name="Tipo de Campo")
    address = models.TextField(verbose_name="Endereço")
    state = models.CharField(max_length=100, verbose_name="Estado")
    city = models.CharField(max_length=100, verbose_name="Cidade")
    phone = models.CharField(validators=[
        MinLengthValidator(15),
        MaxLengthValidator(15)],
        verbose_name="Telefone")
    description = models.TextField(validators=[MinLengthValidator(60)], verbose_name="Descrição")
    operating_hours = models.TextField(verbose_name="Horário de funcionamento")
    visible = models.BooleanField(default=True, verbose_name="Visível")
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Organizador")
    
    def __str__(self):
        return self.field_name
    
    class Meta:
        verbose_name = "Campo"
        verbose_name_plural = "Campos"

class FieldPhoto(models.Model):
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name='photos', verbose_name="Campo")
    photo = models.ImageField(upload_to='field_photos/', verbose_name="Foto")
    
    def __str__(self):
        return f"Foto de {self.field.field_name}"
    
    class Meta:
        verbose_name = "Foto do campo"
        verbose_name_plural = "Fotos dos campos"
