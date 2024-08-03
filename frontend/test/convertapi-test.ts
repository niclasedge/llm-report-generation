import axios from 'axios';

declare const process: {
  env: {
    REACT_APP_CONVERT_API_KEY: string | undefined;
  };
};

export async function testConvertApiConnection(): Promise<boolean> {
  const apiSecret = process.env.REACT_APP_CONVERT_API_KEY;
  const testUrl = `https://v2.convertapi.com/user?Secret=c5OBliWp`;

  console.log('Testing ConvertAPI connection...');
  console.log(`API Key: ${maskApiKey(apiSecret)}`);

  try {
    const response = await axios.get(testUrl);
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));

    if (response.status === 200 && response.data.SecondsLeft > 0) {
      console.log('\x1b[32m%s\x1b[0m', 'ConvertAPI connection successful!');
      console.log('Seconds left:', response.data.SecondsLeft);
      return true;
    } else {
      console.error('\x1b[31m%s\x1b[0m', 'ConvertAPI connection failed. Unexpected response.');
      return false;
    }
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error testing ConvertAPI connection:');
    if (axios.isAxiosError(error)) {
      console.error('Status:', error.response?.status);
      console.error('Data:', JSON.stringify(error.response?.data, null, 2));
    } else {
      console.error(error);
    }
    return false;
  }
}

function maskApiKey(key: string | undefined): string {
  if (!key) return 'API key is undefined';
  if (key.length <= 8) return '*'.repeat(key.length);
  return key.slice(0, 4) + '*'.repeat(key.length - 8) + key.slice(-4);
}

// Run the test
testConvertApiConnection().then((result) => {
  console.log('Test result:', result ? 'Passed' : 'Failed');
});