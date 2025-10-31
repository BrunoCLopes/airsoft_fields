from django.shortcuts import render
from fields.models import Field

# Create your views here.

def index(request):
    filter_mapping = {
        'field-name': 'field_name__icontains',
        'field-state': 'state',
        'field-city': 'city',
        'field-type': 'field_type',
    }
    
    fields = Field.objects.all().filter(visible=True)
    
    for get_param, model_field in filter_mapping.items():
        query_value = request.GET.get(get_param)
        
        if query_value:
            filter_args = {model_field: query_value}
            
            fields = fields.filter(**filter_args)

    return render(request, "fields/index.html", {'fields': fields})

def about(request):
    return render(request, "fields/about.html")

def airsoft(request):
    return render(request, "fields/airsoft.html")