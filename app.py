from flask import Flask, request, jsonify, render_template
import moviepy.editor as mp
import speech_recognition as sr
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/developers')
def developers():
    return render_template('developers.html')

@app.route('/process', methods=['POST'])
def process():
    try:
        if 'video' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['video']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file:
            file_path = os.path.join('static', 'uploads', file.filename)
            file.save(file_path)

            # Process the video file
            video = mp.VideoFileClip(file_path)
            audio_file = video.audio
            audio_path = 'static/uploads/audio.wav'
            audio_file.write_audiofile(audio_path)

            r = sr.Recognizer()
            with sr.AudioFile(audio_path) as source:
                data = r.record(source)
            text = r.recognize_google(data)

            return jsonify({'text': text})
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'An internal server error occurred'}), 500


if __name__ == '__main__':
    app.run(debug=True)
