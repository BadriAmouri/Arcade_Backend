const supabase = require('./db'); // Import the Supabase client

async function testConnection() {
  const { data, error } = await supabase.from('games').select('*').limit(1);

  if (error) {
    console.error('Connection failed:', error.message);
  } else {
    console.log('✅ Supabase connected successfully!', data);
  }
}

testConnection();