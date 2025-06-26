/**
 * Scope Validation Test Script
 * 
 * Developer: Bob Tianqi Wei
 * Project: Instalily AI Case Study
 * 
 * This script tests whether the AI assistant properly restricts responses
 * to refrigerator and dishwasher parts only, as required by the case study.
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

// Test cases to validate scope restrictions
const testCases = [
  // ✅ Valid cases (should be answered)
  {
    category: 'Valid Refrigerator',
    query: 'How can I install part number PS11752778?',
    expectedBehavior: 'Should provide installation help for refrigerator part'
  },
  {
    category: 'Valid Dishwasher',
    query: 'Is this part compatible with my WDT780SAEM1 model?',
    expectedBehavior: 'Should check compatibility for dishwasher part'
  },
  {
    category: 'Valid Troubleshooting',
    query: 'The ice maker on my Whirlpool fridge is not working. How can I fix it?',
    expectedBehavior: 'Should provide troubleshooting for refrigerator'
  },
  
  // ❌ Invalid cases (should be redirected)
  {
    category: 'Invalid Washing Machine',
    query: 'My washing machine is not spinning properly',
    expectedBehavior: 'Should redirect to refrigerator/dishwasher focus'
  },
  {
    category: 'Invalid Dryer',
    query: 'I need a dryer belt replacement',
    expectedBehavior: 'Should redirect to refrigerator/dishwasher focus'
  },
  {
    category: 'Invalid Oven',
    query: 'My oven temperature is not accurate',
    expectedBehavior: 'Should redirect to refrigerator/dishwasher focus'
  },
  {
    category: 'Invalid Microwave',
    query: 'The microwave door won\'t close properly',
    expectedBehavior: 'Should redirect to refrigerator/dishwasher focus'
  },
  {
    category: 'Non-Appliance',
    query: 'What\'s the weather like today?',
    expectedBehavior: 'Should redirect to appliance parts focus'
  },
  {
    category: 'General Appliance',
    query: 'I need help with my toaster',
    expectedBehavior: 'Should redirect to refrigerator/dishwasher focus'
  }
];

// Keywords that indicate proper scope redirection
const redirectKeywords = [
  'refrigerator and dishwasher',
  'only help with',
  'cannot help with',
  'please visit our main website',
  'contact customer service',
  'outside our scope',
  'refrigerator/dishwasher focus'
];

// Keywords that indicate scope violation
const violationKeywords = [
  'washing machine',
  'dryer',
  'oven',
  'microwave',
  'toaster',
  'blender',
  'coffee maker'
];

async function testScopeValidation() {
  console.log('🔍 Testing AI Scope Validation...\n');
  
  let passedTests = 0;
  let totalTests = testCases.length;
  
  for (const testCase of testCases) {
    console.log(`📝 Testing: ${testCase.category}`);
    console.log(`Query: "${testCase.query}"`);
    console.log(`Expected: ${testCase.expectedBehavior}`);
    
    try {
      const response = await axios.post(`${BASE_URL}/api/chat`, {
        message: testCase.query
      });
      
      const aiResponse = response.data.content.toLowerCase();
      
      // Check if response contains redirect keywords (good)
      const hasRedirectKeywords = redirectKeywords.some(keyword => 
        aiResponse.includes(keyword.toLowerCase())
      );
      
      // Check if response contains violation keywords (bad)
      const hasViolationKeywords = violationKeywords.some(keyword => 
        aiResponse.includes(keyword.toLowerCase())
      );
      
      // Determine if test passed
      let testPassed = false;
      let result = '';
      
      if (testCase.category.startsWith('Valid')) {
        // Valid cases should NOT have redirect keywords and should provide helpful info
        testPassed = !hasRedirectKeywords && !hasViolationKeywords;
        result = testPassed ? '✅ PASSED' : '❌ FAILED - Should provide help, not redirect';
      } else {
        // Invalid cases should have redirect keywords and NOT provide help for other appliances
        testPassed = hasRedirectKeywords && !hasViolationKeywords;
        result = testPassed ? '✅ PASSED' : '❌ FAILED - Should redirect, not provide help';
      }
      
      if (testPassed) {
        passedTests++;
      }
      
      console.log(`Result: ${result}`);
      console.log(`Response: ${response.data.content.substring(0, 100)}...`);
      console.log('---\n');
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
      console.log('---\n');
    }
  }
  
  // Summary
  console.log('📊 TEST SUMMARY');
  console.log(`Passed: ${passedTests}/${totalTests}`);
  console.log(`Success Rate: ${((passedTests/totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All scope validation tests passed! AI properly restricts responses.');
  } else {
    console.log('⚠️  Some tests failed. Review AI system prompt for better scope control.');
  }
}

// Run the test
if (require.main === module) {
  testScopeValidation().catch(console.error);
}

module.exports = { testScopeValidation, testCases }; 