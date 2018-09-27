from django.conf.urls import url


from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'districts/', views.districts, name='districts'),
    url(r'places/', views.places, name='places'),
    url(r'register/', views.register, name='register'),
    url(r'login/', views.login, name='login'),
    url(r'journey/',views.journey, name='journey'),
    url(r'report/',views.report, name='report'),
    url(r'aesthetic/',views.aesthetic, name='aesthetic'),
    url(r'placerating/',views.placerating, name='placerating'),
    url(r'rating/',views.rating, name='rating'),
    url(r'vote/',views.vote, name='vote'),
    url(r'likes/',views.likes, name='likes'),
    url(r'institute/',views.institute, name='institute'),
    url(r'advertisement/', views.advertisement, name='advertisement'),
    url(r'riskpoints/', views.riskpoints, name='riskpoints'),
]
