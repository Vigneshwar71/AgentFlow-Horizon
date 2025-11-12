import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv
from pathlib import Path
import logging

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

class ChromaDBClient:
    def __init__(self):
        self.persist_directory = os.environ.get('CHROMA_PERSIST_DIR', '/app/backend/data/memory')
        Path(self.persist_directory).mkdir(parents=True, exist_ok=True)
        
        self.client = chromadb.PersistentClient(
            path=self.persist_directory,
            settings=Settings(anonymized_telemetry=False)
        )
        
        # Initialize embedding model
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Get or create collection
        self.collection = self.client.get_or_create_collection(
            name="agentflow_documents",
            metadata={"hnsw:space": "cosine"}
        )
        
        logger.info(f"ChromaDB initialized with {self.collection.count()} documents")
    
    def add_document(self, document_id: str, text: str, metadata: dict = None):
        """Add a document to the vector database"""
        try:
            # Generate embedding
            embedding = self.embedding_model.encode(text).tolist()
            
            # Add to collection
            self.collection.add(
                ids=[document_id],
                embeddings=[embedding],
                documents=[text],
                metadatas=[metadata or {}]
            )
            logger.info(f"Added document {document_id} to ChromaDB")
            return True
        except Exception as e:
            logger.error(f"Error adding document: {str(e)}")
            raise
    
    def query(self, query_text: str, n_results: int = 5):
        """Query the vector database"""
        try:
            # Generate query embedding
            query_embedding = self.embedding_model.encode(query_text).tolist()
            
            # Query collection
            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=n_results
            )
            return results
        except Exception as e:
            logger.error(f"Error querying ChromaDB: {str(e)}")
            raise
    
    def get_stats(self):
        """Get database statistics"""
        return {
            "total_documents": self.collection.count(),
            "persist_directory": self.persist_directory
        }
