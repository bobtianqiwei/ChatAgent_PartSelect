# PartSelect Chat Assistant - Test Cases

**Developer:** Bob Tianqi Wei  
**Project:** Instalily AI Case Study  
**Date:** June 2025

## 🧪 Comprehensive Test Suite

### Setup Verification
- [ ] Backend server starts on port 3001
- [ ] Frontend application loads on port 3000
- [ ] DeepSeek API integration is functional
- [ ] All API endpoints respond correctly

---

## 📋 Test Case Categories

### 1. Core Functionality Tests

#### Test Case 1.1: Basic Chat Interface
**Description:** Verify basic chat functionality
**Steps:**
1. Open application in browser
2. Type "Hello" and press Enter
3. Verify response is received
4. Check typing indicator appears
5. Verify message history is maintained

**Expected Result:** Chat interface works smoothly with proper loading states

#### Test Case 1.2: DeepSeek AI Integration
**Description:** Test real AI responses
**Steps:**
1. Send message: "How are you today?"
2. Verify response is from DeepSeek (not fallback)
3. Check response quality and relevance

**Expected Result:** Natural, contextual AI responses

---

### 2. Product Information Tests

#### Test Case 2.1: Part Number Search
**Description:** Search for specific part by number
**Steps:**
1. Send: "How can I install part number PS11752778?"
2. Verify detailed installation guide
3. Check for step-by-step instructions
4. Verify difficulty level and time estimate

**Expected Result:** Complete installation guide with all details

#### Test Case 2.2: Product Information Display
**Description:** Get product details
**Steps:**
1. Send: "Tell me about part number PS11752779"
2. Verify product information is displayed
3. Check for price, stock, description
4. Verify compatibility information

**Expected Result:** Comprehensive product information

#### Test Case 2.3: Product Search
**Description:** Search by description
**Steps:**
1. Send: "Search for refrigerator door shelf bin"
2. Verify search results
3. Check product cards are displayed

**Expected Result:** Relevant product search results

---

### 3. Compatibility Tests

#### Test Case 3.1: Model Compatibility Check
**Description:** Check part compatibility with appliance model
**Steps:**
1. Send: "Is this part compatible with my WDT780SAEM1 model?"
2. Verify compatibility results
3. Check refrigerator and dishwasher parts are listed
4. Verify compatible products are shown

**Expected Result:** Detailed compatibility information with product list

#### Test Case 3.2: Multiple Model Support
**Description:** Test different appliance models
**Steps:**
1. Send: "What parts work with WDT750SAEM1?"
2. Verify different compatibility results
3. Check results differ from WDT780SAEM1

**Expected Result:** Model-specific compatibility data

---

### 4. Troubleshooting Tests

#### Test Case 4.1: Ice Maker Troubleshooting
**Description:** Get troubleshooting for ice maker issues
**Steps:**
1. Send: "The ice maker on my Whirlpool fridge is not working. How can I fix it?"
2. Verify troubleshooting guide
3. Check for common causes
4. Verify step-by-step solutions
5. Check for part recommendations

**Expected Result:** Comprehensive troubleshooting guide

#### Test Case 4.2: Dishwasher Drainage Issues
**Description:** Troubleshoot dishwasher problems
**Steps:**
1. Send: "My dishwasher won't drain properly"
2. Verify drainage troubleshooting
3. Check for problem diagnosis
4. Verify solution steps

**Expected Result:** Detailed drainage troubleshooting guide

---

### 5. General Conversation Tests

#### Test Case 5.1: Greeting and Introduction
**Description:** Test basic conversation
**Steps:**
1. Send: "Hello, how are you?"
2. Verify friendly response
3. Check PartSelect context is maintained

**Expected Result:** Natural greeting with business context

#### Test Case 5.2: Service Information
**Description:** Get information about available services
**Steps:**
1. Send: "What can you help me with?"
2. Verify service overview
3. Check all capabilities are mentioned

**Expected Result:** Complete service description

---

### 6. Edge Case Tests

#### Test Case 6.1: Out-of-Scope Questions
**Description:** Handle questions outside refrigerator/dishwasher scope
**Steps:**
1. Send: "I need help with a washing machine"
2. Verify polite redirection
3. Check focus is maintained on supported appliances

**Expected Result:** Helpful redirection to supported scope

#### Test Case 6.2: Invalid Part Numbers
**Description:** Handle non-existent part numbers
**Steps:**
1. Send: "Part number ABC123"
2. Verify helpful error message
3. Check for suggestions or alternatives

**Expected Result:** Graceful error handling with guidance

#### Test Case 6.3: Empty Messages
**Description:** Handle empty or whitespace-only messages
**Steps:**
1. Send empty message
2. Verify no processing occurs
3. Check no error is thrown

**Expected Result:** Graceful handling of empty input

---

### 7. UI/UX Tests

#### Test Case 7.1: Responsive Design
**Description:** Test interface on different screen sizes
**Steps:**
1. Test on desktop (1920x1080)
2. Test on tablet (768x1024)
3. Test on mobile (375x667)
4. Verify all elements are properly sized
5. Check chat bubbles adapt correctly

**Expected Result:** Responsive design works on all devices

#### Test Case 7.2: Loading States
**Description:** Verify loading indicators work
**Steps:**
1. Send a message
2. Verify typing indicator appears
3. Check loading animation is smooth
4. Verify indicator disappears when response arrives

**Expected Result:** Smooth loading experience

#### Test Case 7.3: Message Rendering
**Description:** Test markdown and rich content rendering
**Steps:**
1. Send message that triggers product card
2. Verify markdown is rendered correctly
3. Check product cards display properly
4. Verify compatibility checker renders

**Expected Result:** Rich content renders correctly

---

### 8. API Integration Tests

#### Test Case 8.1: Backend API Health
**Description:** Verify all API endpoints work
**Steps:**
1. Test POST /api/chat
2. Test GET /api/products
3. Test GET /api/compatibility
4. Test GET /api/installation/:partNumber
5. Test GET /api/troubleshooting

**Expected Result:** All endpoints respond correctly

#### Test Case 8.2: Error Handling
**Description:** Test API error scenarios
**Steps:**
1. Send malformed request to chat API
2. Test with invalid part numbers
3. Test with invalid model numbers
4. Verify graceful error handling

**Expected Result:** Proper error messages and fallbacks

---

## 🎯 Test Execution

### Manual Testing
1. Start both frontend and backend servers
2. Open browser to http://localhost:3000
3. Execute each test case systematically
4. Document any issues or unexpected behavior

### Automated Testing (Optional)
```bash
# Test API endpoints
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test message"}'

curl "http://localhost:3001/api/products?query=PS11752778"

curl "http://localhost:3001/api/compatibility?modelNumber=WDT780SAEM1"
```

---

## 📊 Test Results Summary

**Total Test Cases:** 20+  
**Coverage Areas:** Core functionality, Product info, Compatibility, Troubleshooting, UI/UX, API integration  
**Expected Pass Rate:** 100%  
**Critical Paths:** All core features working correctly

---

**Test Document Prepared By:** Bob Tianqi Wei  
**Date:** June 2025  
**Status:** Ready for execution 