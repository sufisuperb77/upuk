"""
Business registration model. Files stored in media; only paths stored in DB.
"""
import uuid
from django.db import models
from .constants import (
    NEGERI_CHOICES,
    DAERAH_CHOICES,
    BUSINESS_CATEGORY_CHOICES,
    BUSINESS_CHANNEL_CHOICES,
    MONTHLY_REVENUE_RANGE_CHOICES,
    REGISTRATION_STATUS_CHOICES,
)


def _upload_dir(instance, subdir, filename, default_ext='pdf'):
    """Build path business_docs/<id_or_uuid>/<subdir>_<unique>.<ext>."""
    uid = instance.pk if instance.pk else uuid.uuid4().hex
    ext = filename.split('.')[-1].lower() if '.' in filename else default_ext
    if ext not in ('pdf', 'png', 'jpg', 'jpeg'):
        ext = default_ext
    return f'business_docs/{uid}/{subdir}_{uuid.uuid4().hex[:8]}.{ext}'


def ssm_certificate_upload_path(instance, filename):
    return _upload_dir(instance, 'ssm', filename, 'pdf')


def company_logo_upload_path(instance, filename):
    return _upload_dir(instance, 'logo', filename, 'png')


def shop_product_image_upload_path(instance, filename):
    uid = instance.business_id if instance.business_id else uuid.uuid4().hex
    ext = filename.split('.')[-1].lower() if '.' in filename else 'jpg'
    if ext not in ('png', 'jpg', 'jpeg'):
        ext = 'jpg'
    return f'business_docs/{uid}/product_{uuid.uuid4().hex[:8]}.{ext}'


class Business(models.Model):
    """
    Young entrepreneur business registration. All file content is on storage;
    only file paths/URLs are stored in PostgreSQL.
    """
    # Company information
    company_name = models.CharField(max_length=255)
    company_email = models.EmailField()
    company_phone = models.CharField(max_length=32)
    year_started = models.PositiveIntegerField()

    # Representative (Pewakil)
    nama_pewakil = models.CharField(max_length=255)
    ic_number_pewakil = models.CharField(max_length=20)

    # SSM registration number
    no_pendaftaran_ssm = models.CharField(max_length=100)

    # Location
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True)
    daerah = models.CharField(max_length=64, choices=DAERAH_CHOICES)
    postcode = models.CharField(max_length=16)
    negeri = models.CharField(max_length=64, choices=NEGERI_CHOICES)

    # Documents & media (paths only in DB; files on storage)
    ssm_certificate = models.FileField(
        upload_to=ssm_certificate_upload_path,
        max_length=500,
        help_text='PDF upload',
    )
    company_logo = models.ImageField(
        upload_to=company_logo_upload_path,
        max_length=500,
        help_text='JPG/PNG image',
    )

    # Online presence
    social_media_link = models.URLField(max_length=512, blank=True)
    website = models.URLField(max_length=512, blank=True)

    # Business details
    business_category = models.CharField(
        max_length=32,
        choices=BUSINESS_CATEGORY_CHOICES,
    )
    business_channel = models.JSONField(
        default=list,
        help_text='Multi-select: ecommerce, social_media, physical_store',
    )
    monthly_revenue_range = models.CharField(
        max_length=32,
        choices=MONTHLY_REVENUE_RANGE_CHOICES,
    )
    number_of_employees = models.PositiveIntegerField()

    # Consent
    consent_given = models.BooleanField(default=False)

    # Admin: approval workflow
    status = models.CharField(
        max_length=16,
        choices=REGISTRATION_STATUS_CHOICES,
        default='pending',
        db_index=True,
    )
    status_updated_at = models.DateTimeField(null=True, blank=True)
    status_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Business Registration'
        verbose_name_plural = 'Business Registrations'
        ordering = ['-created_at']

    def __str__(self):
        return self.company_name


class BusinessProductImage(models.Model):
    """Shop / product images (up to 5) linked to a business registration."""
    business = models.ForeignKey(
        Business,
        on_delete=models.CASCADE,
        related_name='product_images',
    )
    image = models.ImageField(
        upload_to=shop_product_image_upload_path,
        max_length=500,
        help_text='JPG/PNG shop or product image',
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['uploaded_at']

    def __str__(self):
        return f'Product image for {self.business_id}'
