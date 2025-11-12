from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

class GeminiHelper:
    def __init__(self):
        self.api_key = os.environ.get('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment")
    
    async def call_model(self, prompt: str, system_message: str = "You are a helpful AI assistant.", session_id: str = "default") -> str:
        """Call Gemini model with the given prompt"""
        try:
            chat = LlmChat(
                api_key=self.api_key,
                session_id=session_id,
                system_message=system_message
            ).with_model("gemini", "gemini-2.0-flash")
            
            user_message = UserMessage(text=prompt)
            response = await chat.send_message(user_message)
            return response
        except Exception as e:
            raise Exception(f"Error calling Gemini API: {str(e)}")
    
    async def summarize(self, text: str) -> str:
        """Summarize the given text"""
        prompt = f"Provide a concise summary of the following text:\n\n{text}"
        return await self.call_model(prompt, "You are an expert summarization assistant.")
    
    async def extract_entities(self, text: str) -> str:
        """Extract named entities from text"""
        prompt = f"Extract and categorize all named entities (Person, Organization, Location, Date, etc.) from the following text. Format as a structured list:\n\n{text}"
        return await self.call_model(prompt, "You are an expert entity extraction assistant.")
    
    async def analyze_sentiment(self, text: str) -> str:
        """Analyze sentiment of the text"""
        prompt = f"Analyze the sentiment of the following text and classify it as Positive, Neutral, or Negative. Provide a brief explanation:\n\n{text}"
        return await self.call_model(prompt, "You are an expert sentiment analysis assistant.")
    
    async def answer_question(self, context: str, question: str) -> str:
        """Answer question based on context"""
        prompt = f"Context: {context}\n\nQuestion: {question}\n\nProvide a clear and concise answer based only on the given context."
        return await self.call_model(prompt, "You are an expert question-answering assistant.")
