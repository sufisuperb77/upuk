"""
Django Admin for Business registrations: view, search, filter, approve/reject.
"""
from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html
from .models import Business, BusinessProductImage
from .constants import REGISTRATION_STATUS_CHOICES


@admin.register(BusinessProductImage)
class BusinessProductImageAdmin(admin.ModelAdmin):
    list_display = ['business', 'image', 'uploaded_at']
    raw_id_fields = ['business']


class BusinessProductImageInline(admin.TabularInline):
    model = BusinessProductImage
    extra = 0
    readonly_fields = ['product_image_preview', 'uploaded_at']
    fields = ['image', 'product_image_preview', 'uploaded_at']

    def product_image_preview(self, obj):
        if obj.pk and obj.image:
            return format_html('<img src="{}" style="max-height:80px;" />', obj.image.url)
        return '-'
    product_image_preview.short_description = 'Preview'


@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = [
        'company_name',
        'negeri',
        'daerah',
        'business_category',
        'monthly_revenue_range',
        'status_badge',
        'created_at',
    ]
    list_filter = ['business_category', 'monthly_revenue_range', 'status', 'negeri']
    search_fields = ['company_name', 'negeri', 'daerah', 'company_email']
    inlines = [BusinessProductImageInline]
    readonly_fields = [
        'created_at',
        'updated_at',
        'status_updated_at',
        'ssm_certificate_link',
        'company_logo_preview',
    ]
    fieldsets = (
        ('Company Information', {
            'fields': ('company_name', 'company_email', 'company_phone', 'year_started',
                       'nama_pewakil', 'ic_number_pewakil', 'no_pendaftaran_ssm'),
        }),
        ('Location', {
            'fields': ('address_line_1', 'address_line_2', 'daerah', 'postcode', 'negeri'),
        }),
        ('Documents & Media', {
            'fields': ('ssm_certificate_link', 'ssm_certificate', 'company_logo_preview', 'company_logo'),
        }),
        ('Online Presence', {
            'fields': ('social_media_link', 'website'),
        }),
        ('Business Details', {
            'fields': (
                'business_category',
                'business_channel',
                'monthly_revenue_range',
                'number_of_employees',
            ),
        }),
        ('Consent', {
            'fields': ('consent_given',),
        }),
        ('Admin / Status', {
            'fields': ('status', 'status_notes', 'status_updated_at', 'created_at', 'updated_at'),
        }),
    )

    def status_badge(self, obj):
        colors = {'pending': '#f0ad4e', 'approved': '#5cb85c', 'rejected': '#d9534f'}
        color = colors.get(obj.status, '#777')
        return format_html(
            '<span style="background:{}; color:white; padding:3px 8px; border-radius:4px;">{}</span>',
            color,
            obj.get_status_display(),
        )
    status_badge.short_description = 'Status'

    def ssm_certificate_link(self, obj):
        if not obj.pk or not obj.ssm_certificate:
            return '-'
        url = obj.ssm_certificate.url
        # Cloudinary stores PDFs/images uploaded before RawMediaCloudinaryStorage
        # was configured under /image/upload/. Rewrite to /raw/upload/ so the
        # browser receives the actual file instead of an error page.
        url = url.replace('/image/upload/', '/raw/upload/', 1)
        return format_html('<a href="{}" target="_blank">View / Download SSM</a>', url)
    ssm_certificate_link.short_description = 'SSM certificate'

    def company_logo_preview(self, obj):
        if not obj.pk or not obj.company_logo:
            return '-'
        return format_html(
            '<img src="{}" alt="Logo" style="max-height:120px; max-width:200px;" />',
            obj.company_logo.url,
        )
    company_logo_preview.short_description = 'Logo preview'

    def save_model(self, request, obj, form, change):
        if change and 'status' in form.changed_data:
            obj.status_updated_at = timezone.now()
        super().save_model(request, obj, form, change)

    actions = ['approve_selected', 'reject_selected']

    @admin.action(description='Approve selected')
    def approve_selected(self, request, queryset):
        updated = queryset.update(status='approved', status_updated_at=timezone.now())
        self.message_user(request, f'{updated} registration(s) approved.')

    @admin.action(description='Reject selected')
    def reject_selected(self, request, queryset):
        updated = queryset.update(status='rejected', status_updated_at=timezone.now())
        self.message_user(request, f'{updated} registration(s) rejected.')
