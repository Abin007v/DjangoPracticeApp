from django.urls import path
from notes import views


urlpatterns=[
    # path('note/',views.NotesViewset.as_view({'get':'list'})),
    path('note/',views.NotesViewset),
    path('note/<int:id>',views.SingleNote)
]