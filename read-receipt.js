// ============================================================
// Netlify Serverless Function — Anthropic Receipt Reader
// Your API key lives ONLY here as an environment variable
// Never exposed to the browser or public files
// ============================================================

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  // CORS headers so your GitHub Pages site can call this
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { imageBase64, mediaType } = JSON.parse(event.body);

    if (!imageBase64) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'No image provided' }) };
    }

    // API key lives in Netlify environment — never in your code
    const apiKey = process.env.ANTHROPIC_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'API key not configured' }) };
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType || 'image/jpeg',
                data: imageBase64,
              }
            },
            {
              type: 'text',
              text: `You are reading a receipt or expense screenshot for a personal finance app. Extract the info and return ONLY valid JSON with no markdown, no extra text:
{"amount":0.00,"description":"store/merchant name and what was purchased","category":"one of: housing,transport,food,utilities,business,health,personal,entertainment,other","date":"MM/DD/YY or today if unclear","store":"store name only","items":"brief list of main items if visible"}`
            }
          ]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: data.error.message }) };
    }

    const text = data.content?.[0]?.text || '{}';
    let parsed;
    try {
      parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch {
      parsed = { description: 'Receipt', amount: 0, category: 'other' };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(parsed)
    };

  } catch (err) {
    console.error('Receipt function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to read receipt' })
    };
  }
};
