# Generated by Django 4.2.5 on 2023-11-23 14:57

from django.db import migrations, models
import plane.db.models.workspace


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0051_fileasset_is_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workspace',
            name='slug',
            field=models.SlugField(max_length=48, unique=True, validators=[plane.db.models.workspace.slug_validator]),
        ),
    ]
