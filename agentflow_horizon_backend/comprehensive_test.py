import requests
import json

API_BASE = "http://localhost:8000/api"

def test_endpoint(name, url, data, method="POST"):
    """Test an API endpoint"""
    print(f"\n{'='*70}")
    print(f"Testing: {name}")
    print(f"Endpoint: {url}")
    print(f"{'='*70}")
    try:
        if method == "POST":
            response = requests.post(url, json=data, timeout=30)
        else:
            response = requests.get(url, timeout=30)
        
        print(f"✅ Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Response received successfully")
            
            # Show key fields
            if isinstance(result, dict):
                for key in ['success', 'status', 'message', 'summary', 'sentiment', 'answer']:
                    if key in result:
                        value = str(result[key])
                        if len(value) > 100:
                            value = value[:100] + "..."
                        print(f"   {key}: {value}")
            return True
        else:
            print(f"❌ Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

# Track results
results = {}

# Test all NLP endpoints
print("\n" + "="*70)
print("TESTING NLP ENDPOINTS")
print("="*70)

results['Summarization'] = test_endpoint(
    "Summarization",
    f"{API_BASE}/nlp/summarize",
    {"text": "Artificial intelligence is transforming many industries. Machine learning algorithms can now detect diseases, predict trends, and enable automation across various sectors including healthcare, finance, and transportation."}
)

results['Entity Extraction'] = test_endpoint(
    "Entity Extraction",
    f"{API_BASE}/nlp/entities",
    {"text": "Google CEO Sundar Pichai announced new AI features at the Google I/O conference in Mountain View, California. Microsoft and OpenAI are also collaborating on advanced language models."}
)

results['Sentiment Analysis'] = test_endpoint(
    "Sentiment Analysis",
    f"{API_BASE}/nlp/sentiment",
    {"text": "The product is absolutely amazing! I love the innovative features and the customer service is outstanding. Highly recommend it to everyone!"}
)

results['Question Answering'] = test_endpoint(
    "Question Answering",
    f"{API_BASE}/nlp/qna",
    {
        "context": "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel. Constructed from 1887 to 1889, it stands 330 meters tall.",
        "question": "How tall is the Eiffel Tower?"
    }
)

# Test AgentFlow endpoints
print("\n" + "="*70)
print("TESTING AGENTFLOW ENDPOINTS")
print("="*70)

results['Multi-Agent Research'] = test_endpoint(
    "Multi-Agent Research",
    f"{API_BASE}/agentflow/research",
    {"query": "Latest developments in quantum computing"}
)

results['RAG Query'] = test_endpoint(
    "RAG Query",
    f"{API_BASE}/agentflow/rag-query",
    {"query": "What is machine learning?"}
)

results['Web Scraping'] = test_endpoint(
    "Web Scraping",
    f"{API_BASE}/agentflow/web-scrape",
    {"url": "https://example.com"}
)

# Test Health endpoint
print("\n" + "="*70)
print("TESTING SYSTEM ENDPOINTS")
print("="*70)

results['Health Check'] = test_endpoint(
    "Health Check",
    f"{API_BASE}/health",
    {},
    method="GET"
)

# Summary
print("\n" + "="*70)
print("TEST SUMMARY")
print("="*70)

total = len(results)
passed = sum(1 for v in results.values() if v)
failed = total - passed

print(f"\nTotal Tests: {total}")
print(f"✅ Passed: {passed}")
print(f"❌ Failed: {failed}")

print("\nDetailed Results:")
for name, status in results.items():
    status_icon = "✅" if status else "❌"
    print(f"{status_icon} {name}")

if failed == 0:
    print("\n🎉 All tests passed! Your application is ready to use!")
    print("\n📝 You can now:")
    print("   1. Open http://localhost:3000 in your browser")
    print("   2. Try all NLP tools (Summarization, Entity Extraction, etc.)")
    print("   3. Try AgentFlow tools (Research, RAG Query, Web Scraper)")
    print("   4. Upload documents and use ChatPDF features")
else:
    print(f"\n⚠️  {failed} test(s) failed. Please check the errors above.")

print("\n" + "="*70)
