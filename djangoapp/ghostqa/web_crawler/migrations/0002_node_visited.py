# Generated by Django 5.0.6 on 2024-06-06 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("web_crawler", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="node",
            name="visited",
            field=models.BooleanField(default=False),
        ),
    ]