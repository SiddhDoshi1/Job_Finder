import os
import re
import json
import http.client
import urllib.parse
import requests
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import ollama
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)
RAPID_API_KEY = os.getenv('RAPID_API_KEY')

# Function to extract text from a PDF resume
def extract_text_from_resume(file_path):
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text() or ""
            text += page_text
        
        return text.strip()
    except Exception as e:
        print(f"Error reading resume: {e}")
        return None

# Function to extract skills using Ollama model
def extract_skills_with_ollama(text):
    try:
        response = ollama.chat(
            model="llama2",  
            messages=[{"role": "user", "content": f"""
Extract only the skills from the given text and return them strictly in this exact format:  
[skill1, skill2, skill3, ...]  

Rules:  
- Include all the skills you can find from the text.
- Include all the skills which you can find from project section and skill section.
- Do not include any extra words, explanations, or formatting.  
- Do not add any introductory text.
- Do not include phrases to show the level of skills  
- The response must only contain the list of skills in valid Python list format.  

Text:  
{text}  
"""}]


        )
        skills = response.get("message", {}).get("content", "").split("\n")  # Extract skills from response
        skills = [s.strip() for s in skills if s.strip()]  # Clean up list
        
        return skills
    except Exception as e:
        print(f"Error extracting skills with Ollama: {e}")
        return []

# Function to fetch job openings
def extract_job(skills):
    query = urllib.parse.quote(",".join(skills))
    conn = http.client.HTTPSConnection("indeed12.p.rapidapi.com")
    headers = {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': "indeed12.p.rapidapi.com"
    }
    conn.request("GET", f"/jobs/search?query={query}&locality=in&sort=date", headers=headers)
    res = conn.getresponse()
    data = res.read()
    data=data.decode("utf-8")
    try:
        return json.loads(data) 
    except json.JSONDecodeError:
        print("Error decoding job data")
        return {"error": "Failed to fetch job data"}
    
# Main function
@app.route('/upload', methods=['POST'])
def main():
    if 'resume' not in request.files:
        return jsonify({'error': 'No resume uploaded'}), 400
    # Path to the resume file

    file = request.files['resume']
    # Step 1: Extract text from resume
    resume_text = extract_text_from_resume(file)
    if not resume_text:
        print("Failed to extract text from resume.")
        return jsonify({'error': 'Failed to extract text from resume.'}), 500

    # Step 2: Extract skills using Ollama
    skills = extract_skills_with_ollama(resume_text)
    # print("Extracted Skills:", skills)
    # skills=["CPP"]

    if not skills:
        print("No skills extracted. Exiting.")
        return jsonify({'error': 'Unable to extract skills'}), 500
    
    if len(skills) > 1:
        skills=skills[1]

    if isinstance(skills, list):
        skills = "[" + ",".join(skills) + "]"
    
    skills_list = re.findall(r'[\w#+]+(?:\s[\w#+]+)*', skills)
    
    job_list=extract_job(skills_list)

    # job_list
    # with open("job_results.json", "r", encoding="utf-8") as file:
    #     job_list = json.load(file)
    
    # print(type(job_list))
    return jsonify({'skills': skills_list,'job_list': job_list}), 200
    # print(skills_dict)
    # Step 3: Fetch job openings using Apify
    # jobs = fetch_jobs_with_apify(skills)
    # if jobs:
    #     print("Job Listings:", jobs)
    # else:
    #     print("Failed to fetch job listings.")

    

if __name__ == "__main__":
    app.run(debug=True)
