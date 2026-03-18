"""
API URL configuration for businesses app.
"""
from django.urls import path
from . import views
from . import auth_views

urlpatterns = [
    # CSRF Token
    path('csrf-token/', views.get_csrf_token, name='csrf-token'),
    # Choices (public)
    path('choices/', views.get_choices, name='choices'),
    # Daerah filtering by Negeri
    path('daerah-by-negeri/', views.get_daerah_by_negeri, name='daerah-by-negeri'),
    # Auth (session: login shared with Admin & Dashboard)
    path('auth/login/', auth_views.LoginView.as_view(), name='auth-login'),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='auth-logout'),
    path('auth/me/', auth_views.CurrentUserView.as_view(), name='auth-me'),
    # Public
    path('register/', views.RegisterBusinessView.as_view(), name='register'),
    # Admin / dashboard (authenticated)
    path('businesses/', views.BusinessListView.as_view(), name='business-list'),
    path('businesses/<int:pk>/', views.BusinessDetailView.as_view(), name='business-detail'),
    # Analytics (Phase 2)
    path('analytics/overview/', views.AnalyticsOverviewView.as_view(), name='analytics-overview'),
    path('analytics/by-negeri/', views.AnalyticsByNegeriView.as_view(), name='analytics-by-negeri'),
    path('analytics/by-category/', views.AnalyticsByCategoryView.as_view(), name='analytics-by-category'),
    path('analytics/revenue-distribution/', views.AnalyticsRevenueDistributionView.as_view(), name='analytics-revenue'),
]
