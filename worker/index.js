/**
 * Cloudflare Worker for Serer Divination API Proxy
 * 
 * This worker acts as a proxy between the frontend and the local/open-source LLM endpoint.
 * It handles CORS, authentication, and formats requests/responses appropriately.
 * 
 * Environment Variables Required:
 * - MODEL_API_ENDPOINT: The URL of your local model API endpoint
 * - MODEL_API_KEY: (Optional) API key if your model requires authentication
 */

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    // Only accept POST requests to /divination endpoint
    const url = new URL(request.url);
    if (url.pathname !== '/divination' || request.method !== 'POST') {
      return new Response('Not Found', { 
        status: 404,
        headers: corsHeaders()
      });
    }

    try {
      // Parse the incoming request
      const { prompt } = await request.json();

      // Validate input
      if (!prompt) {
        return new Response(JSON.stringify({ error: 'Prompt is required' }), {
          status: 400,
          headers: jsonHeaders()
        });
      }

      // Check if MODEL_API_ENDPOINT is configured
      if (!env.MODEL_API_ENDPOINT) {
        console.error('MODEL_API_ENDPOINT not configured');
        return new Response(JSON.stringify({ 
          error: 'API endpoint not configured. Please set MODEL_API_ENDPOINT environment variable.' 
        }), {
          status: 500,
          headers: jsonHeaders()
        });
      }

      // Prepare the prompt for the LLM
      const systemPrompt = `You are a diviner working within the Serer cosmology tradition. Generate divinations that are thoughtful, meaningful, and rooted in themes of connection, wisdom, spirituality, and embodiment.

You must respond with a JSON object containing exactly four sections: heart, head, soul, and flesh. Each section should be 2-4 sentences long.

- heart: Matters of love, relationships, the threads that bind us, the acts that untether us
- head: Matters of thought, clarity, decision-making, and perspective
- soul: Matters of spirit, inner peace, purpose, and connection to the sacred
- flesh: Matters of the body, health, vitality, and physical presence

Your response must be valid JSON in this exact format:
{
  "heart": "...",
  "head": "...",
  "soul": "...",
  "flesh": "..."
}`;

      // Call the model API
      // Note: This is a generic format - adjust based on your specific model's API
      const modelResponse = await fetch(env.MODEL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include API key if configured
          ...(env.MODEL_API_KEY && { 'Authorization': `Bearer ${env.MODEL_API_KEY}` })
        },
        body: JSON.stringify({
          // Adjust these fields based on your model's API format
          // Common formats include:
          // - OpenAI/compatible: { messages: [...], model: "...", temperature: 0.7 }
          // - Text generation: { prompt: "...", max_tokens: 500 }
          // - Ollama: { model: "...", prompt: "...", stream: false }
          
          // Example format (adjust as needed):
          prompt: `${systemPrompt}\n\nUser request: ${prompt}\n\nGenerate a divination:`,
          max_tokens: 800,
          temperature: 0.8,
          // Add any other parameters your model requires
        })
      });

      if (!modelResponse.ok) {
        const errorText = await modelResponse.text();
        console.error('Model API error:', errorText);
        throw new Error(`Model API returned ${modelResponse.status}: ${errorText}`);
      }

      const modelData = await modelResponse.json();
      
      // Parse the model response
      // Adjust this based on your model's response format
      // Common formats:
      // - OpenAI: modelData.choices[0].message.content
      // - Text generation: modelData.generated_text or modelData.text
      // - Ollama: modelData.response
      
      let divinationText = modelData.response || modelData.text || modelData.generated_text;
      
      // If the response is in a choices array (OpenAI format)
      if (modelData.choices && modelData.choices[0]) {
        divinationText = modelData.choices[0].message?.content || modelData.choices[0].text;
      }

      // Try to parse the JSON response from the model
      let divination;
      try {
        // Remove markdown code blocks if present
        const cleanedText = divinationText.replace(/```json\n?|\n?```/g, '').trim();
        divination = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('Failed to parse model response as JSON:', parseError);
        console.error('Raw response:', divinationText);
        
        // Fallback: return a structured error or default response
        return new Response(JSON.stringify({
          error: 'Failed to parse divination response',
          raw_response: divinationText
        }), {
          status: 500,
          headers: jsonHeaders()
        });
      }

      // Validate the structure
      if (!divination.heart || !divination.head || !divination.soul || !divination.flesh) {
        console.error('Invalid divination structure:', divination);
        return new Response(JSON.stringify({
          error: 'Invalid divination structure received from model'
        }), {
          status: 500,
          headers: jsonHeaders()
        });
      }

      // Return the successful divination
      return new Response(JSON.stringify(divination), {
        status: 200,
        headers: jsonHeaders()
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }), {
        status: 500,
        headers: jsonHeaders()
      });
    }
  }
};

/**
 * Returns CORS headers for the response
 */
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Returns JSON response headers with CORS
 */
function jsonHeaders() {
  return {
    'Content-Type': 'application/json',
    ...corsHeaders()
  };
}

/**
 * Handles CORS preflight requests
 */
function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders()
  });
}

