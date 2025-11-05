from django.shortcuts import render
from fields.models import Field

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

    for get_param, model_field in filter_mapping.items():
        query_value = request.GET.get(get_param)
        
        if query_value:
            filter_args = {model_field: query_value}
            applied_filters[get_param] = query_value
            fields = fields.filter(**filter_args)

    return render(request, "fields/index.html", {
            'fields': fields,
            'applied_filters': applied_filters
        })

def about(request):
    return render(request, "fields/about.html")

def airsoft(request):
    return render(request, "fields/airsoft.html")