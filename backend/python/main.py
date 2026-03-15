from fastapi import FastAPI, UploadFile, File
import pdfplumber
import io

app = FastAPI()

def mock_langchain_agent(text: str):
    """
    Mock function representing a LangChain agent.
    Analyzes the extracted text for specific skills and returns an evaluation.
    """
    text_lower = text.lower()
    skills = []
    if "react" in text_lower: skills.append("React.js")
    if "fastapi" in text_lower: skills.append("FastAPI")
    if "python" in text_lower: skills.append("Python")
    if "next.js" in text_lower: skills.append("Next.js")
    
    # Mock ATS score logic
    ats_score = min(40 + (len(skills) * 15), 100)
    
    return {
        "evaluation": {
            "contentFeedback": "The resume successfully identifies core technical stacks but could benefit from more quantitative achievement markers.",
            "structureFeedback": "Clean and professional layout detected.",
            "keywordOptimizationFeedback": f"Strong match for roles requiring {', '.join(skills) if skills else 'web technologies'}."
        },
        "identifiedSkills": skills,
        "atsScore": ats_score
    }

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    """
    Endpoint that extracts text from an uploaded PDF and runs AI analysis.
    """
    content = await file.read()
    text = ""
    
    try:
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted
    except Exception as e:
        return {"error": f"Failed to parse PDF: {str(e)}"}

    analysis_result = mock_langchain_agent(text)
    return analysis_result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)