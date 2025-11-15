const { createClient } = require('@supabase/supabase-js');



const supabase = createClient(

  process.env.VITE_SUPABASE_URL,

  process.env.VITE_SUPABASE_ANON_KEY

);



exports.handler = async (event) => {

  // Allow only POST requests

  if (event.httpMethod !== 'POST') {

    return {

      statusCode: 405,

      headers: {

        'Access-Control-Allow-Origin': '*',

        'Access-Control-Allow-Methods': 'POST',

        'Access-Control-Allow-Headers': 'Content-Type',

      },

      body: JSON.stringify({ error: 'Method not allowed' }),

    };

  }



  // Parse JSON body

  let input;

  try {

    input = JSON.parse(event.body);

  } catch (err) {

    return {

      statusCode: 400,

      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify({ error: 'Invalid JSON payload' }),

    };

  }



  const { supplementId, medicationId } = input;

  if (!supplementId || !medicationId) {

    return {

      statusCode: 400,

      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify({

        error: 'Both supplementId and medicationId are required',

      }),

    };

  }



  try {

    const { data, error } = await supabase

      .from('interactions')

      .select('*, supplements(name), medications(name)')

      .eq('supplement_id', supplementId)

      .eq('medication_id', medicationId);



    if (error) throw error;



    return {

      statusCode: 200,

      headers: {

        'Access-Control-Allow-Origin': '*',

        'Access-Control-Allow-Methods': 'POST',

        'Access-Control-Allow-Headers': 'Content-Type',

      },

      body: JSON.stringify({ interactions: data }),

    };

  } catch (err) {

    return {

      statusCode: 500,

      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify({ error: err.message }),

    };

  }

};
