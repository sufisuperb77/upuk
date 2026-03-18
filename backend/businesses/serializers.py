"""
REST serializers for Business registration and analytics.
"""
from rest_framework import serializers
from .models import Business, BusinessProductImage
from .constants import (
    NEGERI_CHOICES,
    DAERAH_CHOICES,
    BUSINESS_CATEGORY_CHOICES,
    BUSINESS_CHANNEL_CHOICES,
    MONTHLY_REVENUE_RANGE_CHOICES,
)


class BusinessRegistrationSerializer(serializers.ModelSerializer):
    """Submit new business registration (public)."""
    # Explicitly define fields to handle FormData properly
    company_name = serializers.CharField(required=True)
    company_email = serializers.EmailField(required=True)
    company_phone = serializers.CharField(required=True)
    year_started = serializers.IntegerField(required=True)
    nama_pewakil = serializers.CharField(required=True)
    ic_number_pewakil = serializers.CharField(required=True)
    no_pendaftaran_ssm = serializers.CharField(required=True)
    address_line_1 = serializers.CharField(required=True)
    address_line_2 = serializers.CharField(required=False, allow_blank=True)
    negeri = serializers.ChoiceField(choices=NEGERI_CHOICES, required=True)
    daerah = serializers.ChoiceField(choices=DAERAH_CHOICES, required=True)
    postcode = serializers.CharField(required=True)
    ssm_certificate = serializers.FileField(required=True)
    company_logo = serializers.ImageField(required=True)
    social_media_link = serializers.URLField(required=False, allow_blank=True)
    website = serializers.URLField(required=False, allow_blank=True)
    business_category = serializers.ChoiceField(choices=BUSINESS_CATEGORY_CHOICES, required=True)
    business_channel = serializers.ListField(
        child=serializers.ChoiceField(choices=[c[0] for c in BUSINESS_CHANNEL_CHOICES]),
        required=True
    )
    monthly_revenue_range = serializers.ChoiceField(choices=MONTHLY_REVENUE_RANGE_CHOICES, required=True)
    number_of_employees = serializers.IntegerField(required=True, min_value=0)
    consent_given = serializers.BooleanField(required=True)

    class Meta:
        model = Business
        fields = [
            'company_name',
            'company_email',
            'company_phone',
            'year_started',
            'nama_pewakil',
            'ic_number_pewakil',
            'no_pendaftaran_ssm',
            'address_line_1',
            'address_line_2',
            'daerah',
            'postcode',
            'negeri',
            'ssm_certificate',
            'company_logo',
            'social_media_link',
            'website',
            'business_category',
            'business_channel',
            'monthly_revenue_range',
            'number_of_employees',
            'consent_given',
        ]

    def to_internal_value(self, data):
        """Handle FormData: extract multi-value business_channel properly."""
        # Handle business_channel which may come as multiple form values
        if hasattr(data, 'getlist'):  # QueryDict from FormData
            if 'business_channel' in data:
                channels = data.getlist('business_channel')
                # Convert to mutable dict
                data = data.dict()
                data['business_channel'] = channels
        
        return super().to_internal_value(data)

    def validate_consent_given(self, value):
        """Accept form-data string representations as boolean."""
        if isinstance(value, bool):
            return value
        if isinstance(value, str):
            if value.lower() in ('true', '1', 'yes'):
                return True
            if value.lower() in ('false', '0', 'no', ''):
                raise serializers.ValidationError('Consent must be given to register.')
        raise serializers.ValidationError('Invalid consent value.')

    def validate_business_channel(self, value):
        """Validate business_channel is a list with at least one selection."""
        if not value or (isinstance(value, list) and len(value) == 0):
            raise serializers.ValidationError('At least one business channel must be selected.')
        return value



class BusinessListSerializer(serializers.ModelSerializer):
    """List/summary for admin/analytics (no file URLs if needed for public)."""

    class Meta:
        model = Business
        fields = [
            'id',
            'company_name',
            'negeri',
            'daerah',
            'business_category',
            'monthly_revenue_range',
            'status',
            'created_at',
        ]


class BusinessProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = BusinessProductImage
        fields = ['id', 'image_url', 'uploaded_at']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class BusinessDetailSerializer(serializers.ModelSerializer):
    """Full detail for admin; includes file URLs."""

    ssm_certificate_url = serializers.SerializerMethodField()
    company_logo_url = serializers.SerializerMethodField()
    product_images = BusinessProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = '__all__'

    def get_ssm_certificate_url(self, obj):
        if obj.ssm_certificate:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.ssm_certificate.url)
            return obj.ssm_certificate.url
        return None

    def get_company_logo_url(self, obj):
        if obj.company_logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.company_logo.url)
            return obj.company_logo.url
        return None


# Choice endpoints for frontend dropdowns
class ChoicesSerializer(serializers.Serializer):
    value = serializers.CharField()
    label = serializers.CharField()
