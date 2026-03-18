import businesses.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('businesses', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='business',
            name='nama_pewakil',
            field=models.CharField(max_length=255, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='business',
            name='ic_number_pewakil',
            field=models.CharField(max_length=20, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='business',
            name='no_pendaftaran_ssm',
            field=models.CharField(max_length=100, default=''),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='BusinessProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(help_text='JPG/PNG shop or product image', max_length=500, upload_to=businesses.models.shop_product_image_upload_path)),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('business', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_images', to='businesses.business')),
            ],
            options={
                'ordering': ['uploaded_at'],
            },
        ),
    ]
