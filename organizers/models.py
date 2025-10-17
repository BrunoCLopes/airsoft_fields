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
    username = models.CharField(max_length=150)
    email = models.EmailField(max_length=100, unique=True)

    def __str__(self):
        return self.get_username()
    
    class Meta:
        verbose_name = "Organizador"
        verbose_name_plural = "Organizadores"