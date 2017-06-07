"""Quant URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from securities import views
from securities import services as svr

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'mainpage/', views.mainPage),    
    url(r'postdata/', svr.postData),   
    url(r'data_code_view/', views.renderFun),
    url(r'data_detail/', views.renderFun),
    url(r'data_new/', views.renderFun),
    url(r'data_self_list/', views.renderFun),
    url(r'data_standard_list/', views.renderFun),
    url(r'data_order_list/', views.renderFun),
    url(r'data_self_list/', views.renderFun),
    url(r'first/', views.renderFun),
    url(r'stratyge_backtest_code/', views.renderFun),
    url(r'stratyge_backtest_result/', views.renderFun),
    url(r'stratyge_detail/', views.renderFun),
    url(r'stratyge_list/', views.renderFun),
    url(r'stratyge_model_list/', views.renderFun),
    url(r'stratyge_model_list/', views.renderFun),  
    url(r'stratyge_new/', views.renderFun),
    url(r'stratyge_train/', views.renderFun),
]