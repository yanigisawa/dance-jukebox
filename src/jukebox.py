from flask import render_template, Flask
from flask_socketio import SocketIO, emit
import json
import uuid

app = Flask(__name__)
socketio = SocketIO(app)

_requests = [
    { 'dance': 'Tango',      'songName': 'Love Gun'},
    { 'dance': "Hustle",     'songName': None },
    { 'dance': "Rumba",      'songName': None },
    { 'dance': "Two Step",   'songName': "Ten Rounds" },
    { 'dance': "W.C. Swing", 'songName': None },
    { 'dance': "Bolero",     'songName': None },
    { 'dance': "Swing",      'songName': None },
    { 'dance': "Samba",      'songName': None }]


@app.route('/requests')
def getRequests():
    requests = []
    for i, val in enumerate(_requests):
        req = val
        req["id"] = i + 1
        req["uuid"] = str(uuid.uuid4())
        requests.append(req)

    return json.dumps(requests)

@app.route('/dj')
def djPage():
    return render_template('dj.html')

@app.route('/')
def index():
    return render_template('jukebox.html')

@socketio.on('removedDance')
def handle_removed_dance(request):
    removedRequest = None
    for r in _requests:
        if r['dance'] == request["dance"]:
            print('removing ' + str(r))
            removedRequest = r
            _requests.remove(r)
            break

    if removedRequest != None:
        emit('requestRemoved', removedRequest, broadcast=True)

@socketio.on('request')
def handle_new_request(request):
    request["uuid"] = str(uuid.uuid4())
    _requests.append(request)
    emit('newRequest', request, broadcast=True)


if __name__ == "__main__":
    # app.run(host="127.0.0.1", port=5000, debug=True)
    socketio.run(app, debug=True)
