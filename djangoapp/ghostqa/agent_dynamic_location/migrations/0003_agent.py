# Generated by Django 5.0.4 on 2024-05-06 11:16

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agent_dynamic_location", "0002_privatelocation"),
    ]

    operations = [
        migrations.CreateModel(
            name="Agent",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "ref",
                    models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
                ),
                (
                    "name",
                    models.CharField(
                        blank=True, max_length=100, null=True, unique=True
                    ),
                ),
                (
                    "agent_address",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[("active", "Active"), ("inactive", "Inactive")],
                        default="inactive",
                        max_length=20,
                    ),
                ),
                (
                    "agent_status",
                    models.CharField(
                        choices=[("available", "Available"), ("Occupied", "Occupied")],
                        default="available",
                        max_length=20,
                    ),
                ),
                (
                    "description",
                    models.TextField(blank=True, max_length=250, null=True),
                ),
                (
                    "last_heartbeat",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]