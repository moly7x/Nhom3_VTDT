import os
from flask import Flask, render_template
from flask import request, redirect
import time, json

app=Flask(__name__, static_url_path='', static_folder='static', template_folder='templates')

app.config["UPLOADS"] = "./static/savefile/"

books = '''{
	"connection status":false,
	"ip":[
		"192.168.1.16",
		"192.168.1.12",
		"192.168.1.17",
		"192.168.1.13",
        "192.168.1.16",
		"192.168.1.12",
		"192.168.1.17",
		"192.168.1.13"
	],
	"status":[
		"SUCCESS",
		"UNREACHABLE",
		"SUCCESS",
		"UNREACHABLE",
        "SUCCESS",
		"UNREACHABLE",
		"SUCCESS",
		"UNREACHABLE"
	]
}'''

@app.route('/')
def home():
    app.route('/')
    return render_template("home.html")

@app.route("/upload", methods=["GET", "POST"])
def upload():
    if request.method == "POST":
        if request.files:
            file = request.files["file"]
            file.save(os.path.join(app.config["UPLOADS"], file.filename))
            print("File saved")
            # time.sleep(5)
            return json.loads(books)
    else:         
        return render_template("upload.html")

@app.route("/about")
def about():
    return render_template("about.html")

if __name__=="__main__":
    app.run(debug=True)
