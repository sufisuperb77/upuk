"""
Session auth API for React: login, logout, current user.
Django built-in auth is the single source of truth; these endpoints set/clear session.
"""
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated


class LoginView(APIView):
    """POST: username + password → session created (cookie). AllowAny."""
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response(
                {'error': 'username and password required'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        login(request, user)
        return Response({
            'user': {
                'id': user.pk,
                'username': user.get_username(),
                'is_staff': user.is_staff,
            },
        })


class LogoutView(APIView):
    """POST: clear session. Authenticated."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'detail': 'Logged out'})


class CurrentUserView(APIView):
    """GET: current authenticated user. For dashboard auth check."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'user': {
                'id': user.pk,
                'username': user.get_username(),
                'is_staff': user.is_staff,
            },
        })
