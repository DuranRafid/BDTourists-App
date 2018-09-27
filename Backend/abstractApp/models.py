from django.db import models

class Division(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class District(models.Model):
    name = models.CharField(max_length=20)
    division = models.ForeignKey(Division,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class User(models.Model):
    email = models.EmailField(unique=True)
    firstname = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    phoneno = models.CharField(max_length=10)
    password = models.CharField(max_length=10)
    sex = models.CharField(max_length=1)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    def __str__(self):
        return self.surname

class Area(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()
    image_url = models.CharField(max_length=50)
    route_from_town = models.TextField()
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    rating = models.CharField(max_length=5)
    tag = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Ratings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    rate = models.IntegerField()
    time = models.DateField()

class Story(models.Model):
    description = models.TextField()
    time = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)

    def __str__(self):
        return self.description

  #  class Meta:
   #     abstract = True

class Report(Story):
    reason = models.CharField(max_length=20)
    accident_type = models.CharField(max_length=20)
    longitude = models.FloatField()
    latitude = models.FloatField()


class Aesthetic(Story):
    image_url = models.TextField()

class Journey_Details(Story):
    cost = models.FloatField()
    numOfdays = models.IntegerField()

class Advertisement(Story):
    cost = models.FloatField()
    agency = models.CharField(max_length=20)
    schedule = models.CharField(max_length=40)
    transport = models.CharField(max_length=30)
    discount = models.FloatField()
    contactno = models.CharField(max_length=20)
    fb_link = models.CharField(max_length=100)



class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    type = models.CharField(max_length=10)


class Institutes(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    type = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=30)
    contactno = models.CharField(max_length=20)
    web_link = models.CharField(max_length=100)






