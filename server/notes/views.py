from cmath import sin
from django.shortcuts import render
from .models import Note
from rest_framework import viewsets
from .serializers import NoteSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# class NotesViewset(viewsets.ModelViewSet):
#     serializer_class=NoteSerializer
#     queryset=Note.objects.all()

@api_view(['GET','POST'])
def NotesViewset(request):
    if request.method=='GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes,many=True)
        # return JsonResponse({"notes":serializer.data},safe=False)
        return Response(serializer.data)
    
    if request.method=='POST':
        serializer=NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)


@api_view(['GET','PUT','DELETE'])
def SingleNote(request,id):
    try:
        singlenote=Note.objects.get(pk=id)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = NoteSerializer(singlenote)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = NoteSerializer(singlenote,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        singlenote.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

    
    # if request.method == 'DELETE':

