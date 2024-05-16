# from knox.auth import TokenAuthentication
# from django.shortcuts import get_object_or_404
# from .models import CustomAuthToken


# def validate_agent(token_value):
#     auth_token = TokenAuthentication().authenticate_credentials(token_value.encode())
    
#     if auth_token is None:
#         return False
#     else:
#         agent_auth_token = get_object_or_404(CustomAuthToken, digest=auth_token[1])
#         if agent_auth_token.is_expired():
#             # Token is expired, handle accordingly
#             return False
#         else:
#             return agent_auth_token.agent