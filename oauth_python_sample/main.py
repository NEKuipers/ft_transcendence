import os
import secrets
import requests
import urllib.parse
from dotenv import load_dotenv
from flask import (
    Flask,
    Response,
    redirect,
    request,
    abort,
    make_response,
    url_for
)

TOKEN_FILE_NAME = '.token'

app             = Flask(__name__)
port            = 5020
redirect_uri    = 'http://localhost:{}/callback'.format(port)

auth_state = secrets.token_urlsafe()
load_dotenv('.env')


def save_access_token(token: str) -> None:
    with open(TOKEN_FILE_NAME, mode='w') as f:
        f.write(token)


def get_access_token() -> str:
    with open(TOKEN_FILE_NAME, mode='r') as f:
        return f.read()


def refresh_access_token() -> str:
    """ Assuming refresh_token is stored in a database, use it to generate a new access_token. For response format, see callback(). """
    base_token_url  = 'https://api.intra.42.fr/oauth/token'
    query_params    = {
        'grant_type': 'refresh_token',
        'client_id': os.environ['CLIENT_ID'],
        'client_secret': os.environ['CLIENT_SECRET'],
        'refresh_token': get_access_token(),
        'redirect_uri': redirect_uri
    }
    resp = requests.post(url=base_token_url, params=query_params)
    return resp.json().get('access_token')


@app.errorhandler(401)
def custom_401(error):
    return Response("Auth callback failed", error)


@app.route("/")
def index():
    # TODO Retrieve username from intra using access_token from cookies
    # if access_token expired, use refresh_token to get a new one
    base_api_url = 'https://api.intra.42.fr/v2/me'

    bearer_token = request.cookies.get('intra_access_token')
    if not bearer_token:
        return redirect(url_for('auth'))
    
    api_response = requests.get(url=base_api_url, headers={'Authorization': f'Bearer {bearer_token}'})

    route_response = make_response()
    if not api_response.ok:
        bearer_token = refresh_access_token()
        route_response.set_cookie(bearer_token)
        api_response = requests.get(url=base_api_url, headers={'Authorization': f'Bearer {bearer_token}'})
    
    response_json = api_response.json()
    route_response.set_data(f"<h1>Hello, {response_json.get('login')}!</h1>")
    return route_response


@app.route('/auth_42')
def auth():
    base_auth_url   = 'https://api.intra.42.fr/oauth/authorize?'
    query_params    = {
        'client_id': os.environ['CLIENT_ID'],
        'redirect_uri': redirect_uri,
        'scope': 'public',
        'state': auth_state,
        'response_type': 'code'
    }
    return redirect('{}{}'.format(base_auth_url, urllib.parse.urlencode(query_params)))


@app.route('/callback')
def auth_callback():
    """
    Callback url for the OAuth service. Client will be redirect to this url and URL params
    will contain both {state} and {code} used to get an initial refresh_token.

    Response data from {base_token_url} will look like this:
    {
        "access_token":     "",
        "token_type":       "bearer",
        "expires_in":       7200,
        "refresh_token":    "",
        "scope":            "public",
        "created_at":       1653753924
    }
    """
    args = request.args.to_dict()
    if args.get('state') != auth_state or not args.get('code'):
        abort(401)
    base_token_url  = 'https://api.intra.42.fr/oauth/token'
    query_params    = {
        'grant_type': 'authorization_code',
        'client_id': os.environ['CLIENT_ID'],
        'client_secret': os.environ['CLIENT_SECRET'],
        'code': args['code'],
        'redirect_uri': redirect_uri,
        'state': auth_state
    }
    api_response = requests.post(url=base_token_url, params=query_params)
    response_json = api_response.json()

    save_access_token(response_json.get('refresh_token'))

    route_response = redirect(url_for('index'))
    route_response.set_cookie('intra_access_token', response_json.get('access_token'))
    return route_response


if __name__ == '__main__':
    port = int(os.environ.get('FLASK_PORT', port))
    app.run(host='0.0.0.0', port=port)
