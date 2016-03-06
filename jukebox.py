from bottle import route, run, template, static_file, response
import paste

@route('/dj')
def djPage():
    return template('dj')

@route('/')
def index():
    return template('jukebox')

@route('/static/<path:path>')
def callback(path):
    response.set_header('Cache-Control', 'no-cache')
    return static_file(path, root='static')

run(host='localhost', port=5000, reloader=True, server='paste', debug=True)
