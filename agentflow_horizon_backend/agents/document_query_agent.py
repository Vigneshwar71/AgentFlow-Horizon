"""Document Query Agent using Google ADK and ChromaDB (ChatPDF-like)"""
from google.adk.agents import LlmAgent
import os
import logging
from typing import List, Dict
from database.chroma_client import ChromaDBClient

logger = logging.getLogger(__name__)

class DocumentQueryAgent:
    def __init__(self, api_key: str, chroma_client: ChromaDBClient):
        self.api_key = api_key
        self.chroma = chroma_client
        os.environ['GOOGLE_API_KEY'] = api_key
        os.environ['GOOGLE_GENAI_USE_VERTEXAI'] = 'FALSE'
        
        # Create specialized document query agent
        self.agent = self._create_query_agent()
    
    def _create_query_agent(self) -> LlmAgent:
        """Create document query agent using Google ADK"""
        return LlmAgent(
            name="document_query_agent",
            model="gemini-2.0-flash",
            instruction="""You are a document analysis assistant.
            Your task is to:
            1. Analyze the provided document context
            2. Answer user questions based ONLY on the context provided
            3. If the answer is not in the context, say so clearly
            4. Provide specific quotes or references when possible
            5. Be precise and informative
            
            Always ground your answers in the provided context.""",
            description="Answers questions about uploaded documents using RAG"
        )
    
    async def query_document(self, query: str, n_results: int = 5) -> dict:
        """Query uploaded documents using RAG approach"""
        try:
            logger.info(f"Querying documents for: {query}")
            
            # Step 1: Retrieve relevant chunks from ChromaDB
            retrieval_results = self.chroma.query(query, n_results=n_results)
            
            if not retrieval_results['documents'] or not retrieval_results['documents'][0]:
                return {
                    "success": False,
                    "message": "No documents found. Please upload documents first.",
                    "query": query,
                    "context_used": "",
                    "answer": "No documents available to answer this question.",
                    "confidence_score": 0.0
                }
            
            # Step 2: Combine retrieved chunks into context
            context_chunks = retrieval_results['documents'][0]
            context = "\n\n---\n\n".join(context_chunks)
            
            # Step 3: Use Gemini through ADK to answer based on context
            from google.genai import Client
            client = Client(api_key=self.api_key)
            
            prompt = f"""Context from uploaded documents:
            
            {context}
            
            ---
            
            User Question: {query}
            
            Instructions:
            - Answer the question based ONLY on the context above
            - If the context doesn't contain the answer, say "The uploaded documents don't contain information about this."
            - Cite specific parts of the context when possible
            - Be precise and helpful
            
            Answer:"""
            
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt
            )
            
            answer = response.text
            
            # Calculate confidence score based on relevance
            avg_distance = sum(retrieval_results['distances'][0]) / len(retrieval_results['distances'][0]) if retrieval_results['distances'] else 1.0
            confidence_score = max(0.0, min(1.0, 1.0 - avg_distance))
            
            return {
                "success": True,
                "query": query,
                "context_used": context[:500] + "...",
                "answer": answer,
                "confidence_score": round(confidence_score, 2),
                "chunks_retrieved": len(context_chunks),
                "agent_system": "Google ADK + ChromaDB RAG"
            }
            
        except Exception as e:
            logger.error(f"Document query error: {str(e)}")
            return {
                "success": False,
                "message": f"Query failed: {str(e)}",
                "query": query,
                "context_used": "",
                "answer": "",
                "confidence_score": 0.0
            }
