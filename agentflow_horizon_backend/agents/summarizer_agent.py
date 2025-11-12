from utils.llm_helper import GeminiHelper
import logging

logger = logging.getLogger(__name__)

class SummarizerAgent:
    def __init__(self, llm_helper: GeminiHelper):
        self.llm = llm_helper
    
    async def summarize(self, text: str) -> dict:
        """Summarize the given text"""
        try:
            summary = await self.llm.summarize(text)
            logger.info("Text summarized successfully")
            return {
                "success": True,
                "summary": summary
            }
        except Exception as e:
            logger.error(f"Summarizer error: {str(e)}")
            return {
                "success": False,
                "message": str(e),
                "summary": ""
            }
