import requests
from bs4 import BeautifulSoup
from utils.llm_helper import GeminiHelper
import logging

logger = logging.getLogger(__name__)

class WebScraperAgent:
    def __init__(self, llm_helper: GeminiHelper):
        self.llm = llm_helper
    
    async def scrape_and_summarize(self, url: str) -> dict:
        """Scrape web content and summarize"""
        try:
            # Fetch the webpage
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            # Parse HTML
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.decompose()
            
            # Get text
            text = soup.get_text(separator='\n', strip=True)
            
            # Limit text length
            text = text[:10000]  # First 10k chars
            
            # Summarize
            summary = await self.llm.summarize(text)
            
            logger.info(f"Successfully scraped and summarized {url}")
            return {
                "success": True,
                "url": url,
                "content": text[:1000],  # First 1k chars for preview
                "summary": summary
            }
            
        except Exception as e:
            logger.error(f"Web scraper error: {str(e)}")
            return {
                "success": False,
                "message": str(e),
                "url": url
            }
