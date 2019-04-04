from django.db import models

# Create your models here.


class User_detail(models.Model):
    user_name = models.CharField(max_length=30)
    number = models.IntegerField()
    email_id = models.EmailField(max_length=30)
    address = models.TextField(max_length=50)

    def __str__(self):
        return self.user_name
