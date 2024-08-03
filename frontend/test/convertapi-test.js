import ConvertApi from 'convertapi-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export async function testConvertApiConnection() {
  const apiSecret = process.env.REACT_APP_CONVERT_API_KEY;
  console.log('Testing ConvertAPI connection...');
  console.log(`API Key: ${maskApiKey(apiSecret)}`);

  try {
    const convertApi = ConvertApi.auth(apiSecret);
    
    // Get user information
    //const result = await convertApi.getUser();
    
    console.log('Response data:', JSON.stringify(result, null, 2));

    if (result && result.SecondsLeft > 0) {
      console.log('\x1b[32m%s\x1b[0m', 'ConvertAPI connection successful!');
      console.log('Seconds left:', result.SecondsLeft);
      return true;
    } else {
      console.error('\x1b[31m%s\x1b[0m', 'ConvertAPI connection failed. Unexpected response.');
      return false;
    }
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error testing ConvertAPI connection:');
    console.error(error);
    return false;
  }
}

function maskApiKey(key) {
  if (!key) return 'API key is undefined';
  if (key.length <= 8) return '*'.repeat(key.length);
  return key.slice(0, 4) + '*'.repeat(key.length - 8) + key.slice(-4);
}

// Run the test
testConvertApiConnection().then((result) => {
  console.log('Test result:', result ? 'Passed' : 'Failed');
});