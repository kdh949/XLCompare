from flask import Flask, render_template, request, jsonify
import os
import subprocess
import shutil

app = Flask(__name__)

# Set the upload folder
app.config['UPLOAD_FOLDER'] = 'uploads'

@app.route('/')
def index():
    return render_template('index.ejs')

@app.route('/upload', methods=['POST'])
def upload():
    try:
        file_data = request.files['file']

        if file_data:
            # Process the file data as needed
            file_name = file_data.filename
            print("Selected file name:", file_name)

            # Save the file to the uploads folder
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
            file_data.save(file_path)

            return "File name received successfully and saved at: {}".format(file_path)
        else:
            return "No file data received."
    except Exception as e:
        print("Error processing file:", str(e))
        return "Error processing file."
    
@app.route('/executePythonScript', methods=['GET'])
def execute_python_script():
    try:
        # Execute the compare.py script
        result = subprocess.run(['python3', 'compare.py'], capture_output=True, text=True)
        return f"Compare script executed successfully. Output:\n{result.stdout}\nErrors (if any):\n{result.stderr}"
    except Exception as e:
        return f"Error executing compare.py: {str(e)}"

# Route to reset the 'uploads' folder
@app.route('/reset', methods=['GET'])
def reset_uploads_folder():
    try:
        uploads_folder = os.path.join(os.path.dirname(__file__), 'uploads')

        # Delete all files in the 'uploads' folder
        for file_name in os.listdir(uploads_folder):
            file_path = os.path.join(uploads_folder, file_name)
            if os.path.isfile(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)

        return jsonify(message='Uploads folder reset successfully'), 200
    except Exception as e:
        print(f'Error resetting uploads folder: {str(e)}')
        return jsonify(message='Failed to reset uploads folder. Please try again.'), 500


if __name__ == '__main__':
    app.run(debug=True)
