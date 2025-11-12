from database.chroma_client import ChromaDBClient
import logging

logger = logging.getLogger(__name__)

class RetrieverAgent:
    def __init__(self, chroma_client: ChromaDBClient):
        self.chroma = chroma_client
    
    async def retrieve(self, query: str, n_results: int = 5) -> dict:
        """Retrieve relevant documents for a query"""
        try:
            results = self.chroma.query(query, n_results=n_results)
            
            if not results['documents'] or not results['documents'][0]:
                return {
                    "success": False,
                    "message": "No relevant documents found",
                    "documents": []
                }
            
            documents = []
            for i, doc in enumerate(results['documents'][0]):
                documents.append({
                    "text": doc,
                    "metadata": results['metadatas'][0][i] if results['metadatas'] else {},
                    "distance": results['distances'][0][i] if results['distances'] else None
                })
            
            logger.info(f"Retrieved {len(documents)} documents for query")
            return {
                "success": True,
                "documents": documents
            }
        except Exception as e:
            logger.error(f"Retriever error: {str(e)}")
            return {
                "success": False,
                "message": str(e),
                "documents": []
            }
