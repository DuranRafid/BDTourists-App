from django.shortcuts import render,HttpResponse
import json
from django.core import serializers
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from datetime import date
from decimal import Decimal
from django.db.models import Avg,Count

from abstractApp.models import Division, District, User, Area, Journey_Details, Ratings, Aesthetic, Report, Vote,Story,Institutes,Advertisement


def myconverter(o):
    if isinstance(o,date):
        return o.strftime("%x")

@csrf_exempt
def index(request):
    return HttpResponse("Wrong url! Nice try!")

@csrf_exempt
def places(request):
    if request.method == 'GET':
        a = Area.objects.all()
        data = list(a.values('name','description','image_url','route_from_town','tag','rating'))
        json_data = json.dumps(data)
        return HttpResponse(json_data)

    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        district = body_data['district']
        tag = body_data['tag']
        print(district+" "+tag)

        if tag=="Any":
            if district=="All":
                a = Area.objects.all()
            else :
                d = District.objects.get(name=district)
                a = Area.objects.filter(district=d)
        else:
            if district=="All":
                a = Area.objects.filter(tag__contains=tag)
            else :
                d = District.objects.get(name=district)
                a = Area.objects.filter(district=d,tag__contains=tag)
        data = list(a.values('name','description','image_url','route_from_town','tag','rating'))
        print(data)
        json_data = json.dumps(data)
        return HttpResponse(json_data)


def districts(request):
    if request.method == 'GET':
        a = District.objects.all()
        data = list(a.values('name'))
        print(data)
        json_data = json.dumps(data)
        return HttpResponse(json_data)

@csrf_exempt
def placerating(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        place = body_data['place']
        email = body_data.get('email')
        area = Area.objects.get(name=place)
        a = Ratings.objects.filter(area=area,user__email=email)
        print(a)
        if not a:
            data = [{'rate':0}]
        else:
            data = list(a.values('rate'))
        print(data)
        json_data = json.dumps(data)
        return HttpResponse(json_data)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        firstname = body_data['firstname']
        surname = body_data['surname']
        email = body_data.get('email')
        password = body_data['password']
        sex = body_data['sex']
        phoneno = body_data['phoneno']
        city = body_data['city']
        newUser = User.objects.filter(email=email)

        if not newUser:
            d = District.objects.get(name=city)

            a = User(firstname=firstname, surname=surname, email=email, password=password, sex=sex, phoneno=phoneno,
                      district=d)
            a.save()
            return HttpResponse("Successful")
        else:
            return HttpResponse("Already Exists")

@csrf_exempt
def login(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        email = body_data.get('email')
        password = body_data['password']

        a = User.objects.filter(email=email,password=password)

        if not a :
            return HttpResponse("Wrong")
        else:
            info = list(a.values('firstname','surname','district__name','phoneno','email','sex'))
            print(info)
            json_data = json.dumps(info)
            return HttpResponse(json_data)


@csrf_exempt
def journey(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        print(body_data)
        story = body_data['story']
        cost = body_data['cost']
        duration = body_data['duration']
        email = body_data.get('email')
        place = body_data['place']
      #  print("Here" + email+ story+duration)

        user = User.objects.get(email=email)
        area = Area.objects.get(name=place)

        a = Journey_Details(user=user,time=datetime.now(), area=area,cost=cost, numOfdays=duration, description=story)
        a.save()
        return HttpResponse("Successful")
    if request.method == 'GET':
        param = request.GET.get('place')


        a = Journey_Details.objects.filter(area__name=param)
        data = list(a.values('id','description','cost','numOfdays','user__firstname','user__surname','time','upvotes','downvotes'))

        print(data)

        json_data = json.dumps(data,default=myconverter)
        return HttpResponse(json_data)

@csrf_exempt
def aesthetic(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        print(body_data)
        story = body_data['story']
        image = body_data['image']
        email = body_data.get('email')
        place = body_data['place']

        user = User.objects.get(email=email)
        area = Area.objects.get(name=place)

        aes = Aesthetic(user=user,image_url=image,area=area,description=story,time=datetime.now())
        aes.save()

        return HttpResponse("Successful")

    if request.method == 'GET':
        param = request.GET.get('place')
        print("Got Param" + param)
        a = Aesthetic.objects.filter(area__name=param)
        data = list(a.values('id','description','image_url', 'user__firstname', 'user__surname', 'time','downvotes','upvotes'))

        json_data = json.dumps(data, default=myconverter)
        return HttpResponse(json_data)



@csrf_exempt
def report(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        print(body_data)
        story = body_data['story']
        reason = body_data['reason']
        accident_type = body_data['accident_type']
        longitude = body_data['longitude']
        latidtude = body_data['latitude']
        email = body_data.get('email')
        place = body_data['place']

        user = User.objects.get(email=email)
        area = Area.objects.get(name=place)

        rep = Report(user=user,area=area,description=story,reason=reason,accident_type=accident_type,longitude=longitude,latitude=latidtude,time=datetime.now())
        rep.save()
        return HttpResponse("Successful")

    if request.method == 'GET':
        param = request.GET.get('place')
        print("Got Param" + param)
        a = Report.objects.filter(area__name=param)
        data = list(a.values('id','description','reason','accident_type' ,'user__firstname', 'user__surname', 'downvotes','upvotes','time'))

        json_data = json.dumps(data, default=myconverter)
        return HttpResponse(json_data)

@csrf_exempt
def rating(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        rate = body_data['rating']
        email = body_data.get('email')
        place = body_data['place']

        user = User.objects.get(email=email)
        area = Area.objects.get(name=place)

        print(user)
        print(area)

        try:
            already = Ratings.objects.get(user=user,area=area)
            already.rate = rate
            already.save()
        except Ratings.DoesNotExist:
            a = Ratings(user=user, time=datetime.now(), area=area, rate=rate)
            a.save()

        a = Ratings.objects.filter(area=area).aggregate(Avg('rate'))

        rating = a['rate__avg']


        area.rating = str(rating)
        area.save()

        print(area.rating)

        return HttpResponse("Successful")

@csrf_exempt
def vote(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        type = body_data['type']
        email = body_data.get('email')
        story_id = body_data['id']

        user = User.objects.get(email=email)
        story = Story.objects.get(pk=story_id)
        try:
            already = Vote.objects.get(story=story, user=user)
            already.type = type
            already.save()
        except Vote.DoesNotExist:
            a = Vote(user=user, type=type, story=story)
            a.save()

        a = Vote.objects.filter(story=story,type="like")

        upvotes = a.count()

        b = Vote.objects.filter(story=story, type="dislike")

        downvotes = b.count()

        story.upvotes = upvotes
        story.downvotes = downvotes
        story.save()


        return HttpResponse("Successful")

@csrf_exempt
def institute(request):
    if request.method == 'GET':
        param = request.GET.get('place')
        print("Got Param" + param)
        a = Institutes.objects.filter(area__name=param)
        data = list(a.values('type','name','address','contactno','web_link'))

        json_data = json.dumps(data)
        return HttpResponse(json_data)

def advertisement(request):
    if request.method == 'GET':
        a = Advertisement.objects.all()
        data = list(a.values('id','agency','area__name','user__firstname','schedule','transport','discount','cost','contactno','downvotes','upvotes','fb_link','description','time'))
        json_data = json.dumps(data, default=myconverter)
        return HttpResponse(json_data)

def riskpoints(request):
    if request.method == 'GET':
        param = request.GET.get('place')
        print("Got Param" + param)
        a = Report.objects.filter(area__name=param)
        if  a:
            data = list(a.values('latitude','longitude'))

        json_data = json.dumps(data)
        return HttpResponse(json_data)

def likes(request):
    if request.method == 'GET':
        param = request.GET.get('place')
        email = request.GET.get('email')
        print("Got email" + email)
        print("Here in like")
        if param == "All":
            a = Vote.objects.filter(user__email=email)
        else :
            a = Vote.objects.filter(story__area__name=param,user__email=email)
        print(a)
        if  a:
            data = list(a.values('story_id','type'))


        print(data)
        json_data = json.dumps(data)
        return HttpResponse(json_data)
