from agents.retriever_agent import RetrieverAgent
from agents.summarizer_agent import SummarizerAgent
from utils.llm_helper import GeminiHelper
import logging

logger = logging.getLogger(__name__)

class ResearchCoordinator:
    def __init__(self, retriever: RetrieverAgent, summarizer: SummarizerAgent, llm_helper: GeminiHelper):
        self.retriever = retriever
        self.summarizer = summarizer
        self.llm = llm_helper
    
    async def research(self, query: str) -> dict:
        """Coordinate multi-agent research pipeline"""
        try:
            logger.info(f"Starting research for query: {query}")
            
            # Step 1: Retrieve relevant documents
            retrieval_result = await self.retriever.retrieve(query, n_results=5)
            
            if not retrieval_result['success'] or not retrieval_result['documents']:
                # If no documents in DB, generate direct answer
                logger.info("No documents found, generating direct answer")
                answer = await self.llm.call_model(
                    f"Provide a comprehensive answer to: {query}",
                    "You are a research assistant. Provide detailed, accurate information."
                )
                return {
                    "success": True,
                    "query": query,
                    "retrieved_documents": [],
                    "summary": answer,
                    "entities": await self.llm.extract_entities(answer),
                    "sentiment": await self.llm.analyze_sentiment(answer),
                    "final_answer": answer,
                    "source": "direct_generation"
                }
            
            # Step 2: Combine retrieved documents
            combined_text = "\n\n".join([doc['text'] for doc in retrieval_result['documents']])
            
            # Step 3: Summarize
            summary_result = await self.summarizer.summarize(combined_text)
            summary = summary_result.get('summary', '')
            
            # Step 4: Extract entities
            entities = await self.llm.extract_entities(summary)
            
            # Step 5: Analyze sentiment
            sentiment = await self.llm.analyze_sentiment(summary)
            
            # Step 6: Generate final synthesis
            final_answer = await self.llm.call_model(
                f"Based on this information:\n{summary}\n\nProvide a comprehensive answer to: {query}",
                "You are a research synthesis assistant. Provide clear, structured answers."
            )
            
            return {
                "success": True,
                "query": query,
                "retrieved_documents": retrieval_result['documents'],
                "summary": summary,
                "entities": entities,
                "sentiment": sentiment,
                "final_answer": final_answer,
                "source": "rag_pipeline"
            }
            
        except Exception as e:
            logger.error(f"Research coordinator error: {str(e)}")
            return {
                "success": False,
                "message": str(e),
                "query": query
            }
