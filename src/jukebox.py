from flask import render_template, Flask
app = Flask(__name__)

@app.route('/dj')
def djPage():
    return render_template('dj.html')

@app.route('/')
def index():
    return render_template('jukebox.html')

# @app.route('/static/<path:path>')
# def callback(path):
#     response.set_header('Cache-Control', 'no-cache')
#     return static_file(path, root='static')


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
