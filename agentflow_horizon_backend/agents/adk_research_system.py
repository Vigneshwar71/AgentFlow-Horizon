"""Multi-Agent Research System using Google ADK"""
from google.adk.agents import LlmAgent, SequentialAgent, ParallelAgent
from google.adk.tools import google_search
import os
import logging

logger = logging.getLogger(__name__)

class ADKResearchSystem:
    def __init__(self, api_key: str):
        self.api_key = api_key
        os.environ['GOOGLE_API_KEY'] = api_key
        os.environ['GOOGLE_GENAI_USE_VERTEXAI'] = 'FALSE'
        
        # Create specialized agents
        self.researcher = self._create_researcher_agent()
        self.summarizer = self._create_summarizer_agent()
        self.analyzer = self._create_analyzer_agent()
        self.refiner = self._create_refiner_agent()
        
        # Create sequential orchestrator
        self.orchestrator = SequentialAgent(
            name="research_orchestrator",
            sub_agents=[self.researcher, self.summarizer, self.analyzer, self.refiner]
        )
        
    def _create_researcher_agent(self) -> LlmAgent:
        """Agent that gathers information"""
        return LlmAgent(
            name="researcher",
            model="gemini-2.0-flash",
            instruction="""You are a research agent specialized in gathering comprehensive information.
            Your task is to:
            1. Understand the research query
            2. Break it down into key components
            3. Gather relevant information
            4. Provide detailed findings with sources when available
            
            Be thorough and accurate in your research.""",
            description="Gathers comprehensive information for research queries",
            tools=[google_search]
        )
    
    def _create_summarizer_agent(self) -> LlmAgent:
        """Agent that summarizes findings"""
        return LlmAgent(
            name="summarizer",
            model="gemini-2.0-flash",
            instruction="""You are a summarization specialist.
            Your task is to:
            1. Take the research findings from the previous agent
            2. Extract key insights and main points
            3. Create a concise, well-structured summary
            4. Organize information logically
            
            Keep summaries clear and informative.""",
            description="Summarizes research findings into key insights"
        )
    
    def _create_analyzer_agent(self) -> LlmAgent:
        """Agent that analyzes patterns and extracts entities"""
        return LlmAgent(
            name="analyzer",
            model="gemini-2.0-flash",
            instruction="""You are an analysis specialist.
            Your task is to:
            1. Analyze the summarized findings
            2. Extract named entities (people, organizations, dates, locations)
            3. Identify sentiment and tone
            4. Detect patterns and relationships
            5. Provide structured analysis output
            
            Format your analysis clearly with sections for:
            - Entities
            - Sentiment
            - Key Patterns""",
            description="Analyzes content for entities, sentiment, and patterns"
        )
    
    def _create_refiner_agent(self) -> LlmAgent:
        """Agent that refines and synthesizes final output"""
        return LlmAgent(
            name="refiner",
            model="gemini-2.0-flash",
            instruction="""You are a synthesis specialist who creates final polished outputs.
            Your task is to:
            1. Take all previous agent outputs (research, summary, analysis)
            2. Synthesize them into a comprehensive final answer
            3. Ensure the response is:
               - Clear and well-structured
               - Addresses the original query completely
               - Includes key insights, entities, and sentiment
               - Professional and actionable
            
            Format the final response with:
            - Executive Summary
            - Detailed Findings
            - Key Entities
            - Sentiment Analysis
            - Conclusion""",
            description="Refines and synthesizes all findings into final output"
        )
    
    async def research(self, query: str) -> dict:
        """Execute multi-agent research workflow"""
        try:
            logger.info(f"Starting ADK research for query: {query}")
            
            # For now, we'll manually orchestrate since ADK runner needs special setup
            # In production, you'd use: runner = Runner(agent=self.orchestrator)
            # response = await runner.run(query)
            
            # Temporary direct approach using individual agents
            from google.genai import Client
            client = Client(api_key=self.api_key)
            
            # Step 1: Research
            research_prompt = f"Research this query thoroughly: {query}"
            research_response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=research_prompt
            )
            research_findings = research_response.text
            
            # Step 2: Summarize
            summary_prompt = f"Summarize these research findings concisely:\n\n{research_findings}"
            summary_response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=summary_prompt
            )
            summary = summary_response.text
            
            # Step 3: Analyze
            analysis_prompt = f"""Analyze the following content and extract:
            1. Named entities (people, organizations, dates, locations)
            2. Sentiment and tone
            3. Key patterns
            
            Content:
            {summary}"""
            analysis_response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=analysis_prompt
            )
            analysis = analysis_response.text
            
            # Step 4: Refine and synthesize
            refine_prompt = f"""Synthesize the following information into a comprehensive final answer for the query: "{query}"
            
            Research Findings:
            {research_findings[:500]}...
            
            Summary:
            {summary}
            
            Analysis:
            {analysis}
            
            Provide a well-structured final response with:
            - Executive Summary
            - Detailed Findings  
            - Key Entities
            - Sentiment
            - Conclusion"""
            
            final_response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=refine_prompt
            )
            final_answer = final_response.text
            
            return {
                "success": True,
                "query": query,
                "research_findings": research_findings[:500],
                "summary": summary,
                "analysis": analysis,
                "final_answer": final_answer,
                "agent_system": "Google ADK",
                "orchestration": "Sequential"
            }
            
        except Exception as e:
            logger.error(f"ADK Research error: {str(e)}")
            return {
                "success": False,
                "message": f"Research failed: {str(e)}",
                "query": query
            }
