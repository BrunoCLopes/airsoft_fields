from django.db import models
from django.db.models import Q
from django.contrib.auth.models import AbstractUser
from django.core.validators import validate_email
from django.core.validators import MinLengthValidator, MaxLengthValidator

'''
-- Table for Organizers of Fields
CREATE TABLE Organizers (
    organizer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    approved INTEGER DEFAULT 0, -- 0: not approved, 1: approved
    registration_date TEXT DEFAULT CURRENT_TIMESTAMP
);
'''

# Create your models here.
class Organizer(AbstractUser):
    username = models.CharField(max_length=150, blank=False, null=False)
    email = models.EmailField(max_length=100, validators=[validate_email], unique=True)
    phone = models.CharField(validators=[
        MinLengthValidator(15),
        MaxLengthValidator(15)],
        verbose_name="Telefone",
        null=True,
        blank=True)
    profile_photo = models.ImageField(
        upload_to='profile_photos/',
        verbose_name="Foto",
        null=True,
        blank=True)

    def __str__(self):
        return self.get_username()
    
    class Meta:
        verbose_name = "Organizador"
        verbose_name_plural = "Organizadores"
        constraints = [
            models.CheckConstraint(check=~Q(username=''), name='organizer_username_not_empty'),
            models.CheckConstraint(check=~Q(email=''), name='organizer_email_not_empty'),
        ]