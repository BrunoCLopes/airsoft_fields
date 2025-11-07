from django.db import models
from django.db.models import Q
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

    field_name = models.CharField(max_length=200, verbose_name="Nome do campo", blank=False, null=False)
    field_type = models.CharField(max_length=10, choices=FIELD_TYPE_CHOICES, verbose_name="Tipo de Campo", blank=False, null=False)
    address = models.TextField(verbose_name="Endereço", blank=False, null=False)
    state = models.CharField(max_length=100, verbose_name="Estado", blank=False, null=False)
    state_abbreviation = models.CharField(max_length=2, verbose_name="Abreviação do Estado", blank=False, null=False)
    city = models.CharField(max_length=100, verbose_name="Cidade", blank=False, null=False)
    phone = models.CharField(validators=[
        MinLengthValidator(15),
        MaxLengthValidator(15)],
        verbose_name="Telefone", blank=False, null=False)
    description = models.TextField(validators=[MinLengthValidator(60)], verbose_name="Descrição", blank=False, null=False)
    operating_hours = models.TextField(verbose_name="Horário de funcionamento", blank=False, null=False)
    visible = models.BooleanField(default=True, verbose_name="Visível", blank=False, null=False)
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Organizador", blank=False, null=False)
    
    def __str__(self):
        return self.field_name
    
    class Meta:
        verbose_name = "Campo"
        verbose_name_plural = "Campos"
        constraints = [
            models.CheckConstraint(check=~Q(field_name=''), name='field_field_name_not_empty'),
            models.CheckConstraint(check=~Q(address=''), name='field_address_not_empty'),
            models.CheckConstraint(check=~Q(state=''), name='field_state_not_empty'),
            models.CheckConstraint(check=~Q(state_abbreviation=''), name='field_state_abbrev_not_empty'),
            models.CheckConstraint(check=~Q(city=''), name='field_city_not_empty'),
            models.CheckConstraint(check=~Q(phone=''), name='field_phone_not_empty'),
            models.CheckConstraint(check=~Q(description=''), name='field_description_not_empty'),
            models.CheckConstraint(check=~Q(operating_hours=''), name='field_operating_hours_not_empty'),
        ]

class FieldPhoto(models.Model):
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name='photos', verbose_name="Campo", blank=False, null=False)
    photo = models.ImageField(upload_to='field_photos/', verbose_name="Foto", blank=False, null=False)
    
    def __str__(self):
        return f"Foto de {self.field.field_name}"
    
    class Meta:
        verbose_name = "Foto do campo"
        verbose_name_plural = "Fotos dos campos"
