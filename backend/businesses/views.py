"""
REST API: registration (public), list/detail (admin), analytics (authenticated).
"""
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Count
from .models import Business, BusinessProductImage, SiteVisit
from .serializers import (
    BusinessRegistrationSerializer,
    BusinessListSerializer,
    BusinessDetailSerializer,
)
from .constants import (
    NEGERI_CHOICES,
    DAERAH_CHOICES,
    DAERAH_BY_NEGERI,
    BUSINESS_CATEGORY_CHOICES,
    BUSINESS_CHANNEL_CHOICES,
    MONTHLY_REVENUE_RANGE_CHOICES,
)


# ----- CSRF Token: ensure frontend gets the token -----
@ensure_csrf_cookie
def get_csrf_token(request):
    """GET: retrieve CSRF token (sets httponly cookie)."""
    return JsonResponse({'detail': 'CSRF token set'})


# ----- Choices for frontend dropdowns (public read) -----
@ensure_csrf_cookie
def get_choices(request):
    """GET: negeri, daerah, business_category, business_channel, monthly_revenue_range."""
    return JsonResponse({
        'negeri': [{'value': v, 'label': l} for v, l in NEGERI_CHOICES],
        'daerah': [{'value': v, 'label': l} for v, l in DAERAH_CHOICES],
        'business_category': [{'value': v, 'label': l} for v, l in BUSINESS_CATEGORY_CHOICES],
        'business_channel': [{'value': v, 'label': l} for v, l in BUSINESS_CHANNEL_CHOICES],
        'monthly_revenue_range': [{'value': v, 'label': l} for v, l in MONTHLY_REVENUE_RANGE_CHOICES],
    })


# ----- Daerah filtering by Negeri -----
@ensure_csrf_cookie
def get_daerah_by_negeri(request):
    """GET: filter daerah by selected negeri. Query param: ?negeri=selangor"""
    negeri = request.GET.get('negeri', '').lower()
    
    if not negeri:
        return JsonResponse({'error': 'negeri parameter required'}, status=400)
    
    if negeri not in DAERAH_BY_NEGERI:
        return JsonResponse({'error': 'invalid negeri'}, status=400)
    
    daerah_list = DAERAH_BY_NEGERI[negeri]
    return JsonResponse({
        'daerah': [{'value': v, 'label': l} for v, l in daerah_list]
    })


# ----- Public: submit registration (no auth) -----
class RegisterBusinessView(APIView):
    """POST: submit new business registration. AllowAny."""
    permission_classes = [AllowAny]
    serializer_class = BusinessRegistrationSerializer

    def post(self, request):
        images = request.FILES.getlist('shop_product_images')
        if not images:
            return Response(
                {'shop_product_images': ['At least one shop/product image is required.']},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if len(images) > 5:
            return Response(
                {'shop_product_images': ['A maximum of 5 images may be uploaded.']},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = BusinessRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            business = serializer.save()
            for img in images:
                BusinessProductImage.objects.create(business=business, image=img)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ----- Admin / dashboard: list & detail (authenticated) -----
class BusinessListView(generics.ListAPIView):
    """GET: list registrations (authenticated)."""
    queryset = Business.objects.all()
    serializer_class = BusinessListSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['negeri', 'daerah', 'business_category', 'monthly_revenue_range', 'status']


class BusinessDetailView(generics.RetrieveAPIView):
    """GET: single registration detail (authenticated)."""
    queryset = Business.objects.all()
    serializer_class = BusinessDetailSerializer
    permission_classes = [IsAuthenticated]


# ----- Analytics (Phase 2): protected APIs -----
class AnalyticsOverviewView(APIView):
    """GET: total businesses count. Authenticated."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total = Business.objects.count()
        return Response({'total_businesses': total})


class AnalyticsByNegeriView(APIView):
    """GET: businesses by negeri (for pie chart)."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = Business.objects.values('negeri').annotate(count=Count('id')).order_by('-count')
        data = [{'negeri': r['negeri'], 'count': r['count']} for r in qs]
        return Response(data)


class AnalyticsByCategoryView(APIView):
    """GET: businesses by category."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = Business.objects.values('business_category').annotate(count=Count('id')).order_by('-count')
        data = [{'business_category': r['business_category'], 'count': r['count']} for r in qs]
        return Response(data)


class AnalyticsRevenueDistributionView(APIView):
    """GET: revenue range distribution."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = (
            Business.objects.values('monthly_revenue_range')
            .annotate(count=Count('id'))
            .order_by('monthly_revenue_range')
        )
        data = [{'monthly_revenue_range': r['monthly_revenue_range'], 'count': r['count']} for r in qs]
        return Response(data)


# ----- Public: site visit counter -----
@method_decorator(csrf_exempt, name='dispatch')
class VisitorCountView(APIView):
    """GET: total visits. POST: record a visit + return updated total."""
    permission_classes = [AllowAny]

    def get(self, request):
        total = SiteVisit.objects.count()
        return Response({'total': total})

    def post(self, request):
        page = (request.data.get('page') or '')[:100]
        SiteVisit.objects.create(page=page)
        total = SiteVisit.objects.count()
        return Response({'total': total}, status=status.HTTP_201_CREATED)
