from django.db import models
from django.contrib.auth.models import AbstractUser

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
    approved = models.BooleanField(default=False, verbose_name="Aprovado")
    registration_date = models.DateTimeField(auto_now_add=True, verbose_name="Data de registro")
    
    def __str__(self):
        return self.get_username()
    
    class Meta:
        verbose_name = "Organizador"
        verbose_name_plural = "Organizadores"