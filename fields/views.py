from django.shortcuts import render
from fields.models import Field
from django.core.paginator import Paginator
from urllib.parse import urlencode
# Create your views here.

def index(request):
    filter_mapping = {
        'field_name': 'field_name__icontains',
        'field_state': 'state',
        'field_city': 'city',
        'field_type': 'field_type',
    }
    
    fields = Field.objects.all().filter(visible=True)

    applied_filters = {}
    params = {}

    for get_param, model_field in filter_mapping.items():
        query_value = request.GET.get(get_param)
        value = query_value.strip() if query_value else None

        if value:
            filter_args = {model_field: value}
            applied_filters[get_param] = value
            fields = fields.filter(**filter_args)
            params[get_param] = value

    paginator = Paginator(fields, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    base_qs = urlencode(params)
    base_qs = f"{base_qs}&" if base_qs else ""

    return render(request, "fields/index.html", {
            'fields': page_obj,
            'applied_filters': applied_filters,
            'base_qs': base_qs
        })

def about(request):
    return render(request, "fields/about.html")

def airsoft(request):
    return render(request, "fields/airsoft.html")