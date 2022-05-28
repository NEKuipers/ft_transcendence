# OAuth2 Example
Simple python flask application that gets your login name from the intra after
you've authorized the app using OAuth2. You can run `python3 main.py` to run it.

> :warning:  
> Make sure you've installed the required packages (see requirements.txt) and you've
> created the .env file.

## .env
Create a .env file. You need two environment variables:
```bash
CLIENT_ID=
CLIENT_SECRET=
```

Both values you can get after you've registered your own app. To do this, go to link **2** down below. 

## Interesting sources
1. Intra documentation: https://api.intra.42.fr/apidoc/guides/web_application_flow
2. Intra applications: https://profile.intra.42.fr/oauth/applications
3. Some OAuth concepts: https://www.youtube.com/watch?v=t4-416mg6iU
