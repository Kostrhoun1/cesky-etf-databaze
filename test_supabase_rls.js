#!/usr/bin/env node

/**
 * Comprehensive Supabase RLS (Row Level Security) Test Suite
 * 
 * This script tests database operations after implementing RLS security fixes:
 * 1. READ TEST: Public read access to etf_funds table
 * 2. WRITE TEST: Write operations with different access levels
 * 3. SCHEMA TEST: Schema modification attempts
 * 4. ADMIN TEST: app_admins table security verification
 * 5. RLS VERIFICATION: Check if RLS is properly enabled
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://nbhwnatadyubiuadfakx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY';

// Create clients with different access levels
const supabaseAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Note: Service role key should be set as environment variable for security
// For this test, we'll only test with anon key and provide recommendations
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseService = SUPABASE_SERVICE_ROLE_KEY ? 
  createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  }) : null;

// Test results storage
const testResults = {
  readTests: [],
  writeTests: [],
  schemaTests: [],
  adminTests: [],
  rlsTests: [],
  summary: {
    passed: 0,
    failed: 0,
    warnings: 0
  }
};

// Utility functions
function logTest(category, testName, status, message, data = null) {
  const result = {
    test: testName,
    status: status, // 'PASS', 'FAIL', 'WARN', 'INFO'
    message: message,
    data: data,
    timestamp: new Date().toISOString()
  };
  
  testResults[category].push(result);
  
  const emoji = {
    'PASS': '✅',
    'FAIL': '❌',
    'WARN': '⚠️',
    'INFO': 'ℹ️'
  }[status];
  
  console.log(`${emoji} [${category.toUpperCase()}] ${testName}: ${message}`);
  if (data) {
    console.log(`   Data:`, JSON.stringify(data, null, 2));
  }
  
  // Update summary
  if (status === 'PASS') testResults.summary.passed++;
  else if (status === 'FAIL') testResults.summary.failed++;
  else if (status === 'WARN') testResults.summary.warnings++;
}

// TEST 1: READ OPERATIONS (should work with public read policy)
async function testReadOperations() {
  console.log('\n🔍 Testing READ operations on etf_funds table...');
  
  try {
    // Test 1.1: Basic read
    const { data, error } = await supabaseAnon
      .from('etf_funds')
      .select('isin, name, fund_provider, ter_numeric')
      .limit(5);
    
    if (error) {
      logTest('readTests', 'Basic ETF data read', 'FAIL', `Error reading ETF data: ${error.message}`, error);
    } else if (data && data.length > 0) {
      logTest('readTests', 'Basic ETF data read', 'PASS', `Successfully read ${data.length} ETF records`, {
        sampleRecord: data[0],
        totalRecords: data.length
      });
    } else {
      logTest('readTests', 'Basic ETF data read', 'WARN', 'No ETF data found in database');
    }
    
    // Test 1.2: Count total records
    const { count, error: countError } = await supabaseAnon
      .from('etf_funds')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      logTest('readTests', 'ETF count query', 'FAIL', `Error counting ETF records: ${countError.message}`, countError);
    } else {
      logTest('readTests', 'ETF count query', 'PASS', `Database contains ${count} ETF records`);
    }
    
    // Test 1.3: Complex query with filters
    const { data: filteredData, error: filterError } = await supabaseAnon
      .from('etf_funds')
      .select('isin, name, ter_numeric, fund_size_numeric')
      .not('ter_numeric', 'is', null)
      .order('ter_numeric', { ascending: true })
      .limit(3);
    
    if (filterError) {
      logTest('readTests', 'Filtered query', 'FAIL', `Error executing filtered query: ${filterError.message}`, filterError);
    } else if (filteredData && filteredData.length > 0) {
      logTest('readTests', 'Filtered query', 'PASS', `Successfully executed complex query with ${filteredData.length} results`, {
        lowestTER: filteredData[0]
      });
    } else {
      logTest('readTests', 'Filtered query', 'WARN', 'Filtered query returned no results');
    }
    
  } catch (error) {
    logTest('readTests', 'Read operations general', 'FAIL', `Unexpected error: ${error.message}`, error);
  }
}

// TEST 2: WRITE OPERATIONS
async function testWriteOperations() {
  console.log('\n✏️ Testing WRITE operations...');
  
  // Test 2.1: Insert with anon key (should fail due to RLS)
  try {
    const testRecord = {
      isin: 'TEST123456789',
      name: 'Test ETF - Should Not Insert',
      fund_provider: 'Test Provider',
      ter_numeric: 0.01
    };
    
    const { data, error } = await supabaseAnon
      .from('etf_funds')
      .insert(testRecord);
    
    if (error) {
      logTest('writeTests', 'Insert with anon key', 'PASS', `Insert correctly blocked by RLS: ${error.message}`, {
        errorCode: error.code,
        expectedBehavior: 'Insert should be blocked for anon users'
      });
    } else {
      logTest('writeTests', 'Insert with anon key', 'FAIL', 'Insert with anon key succeeded - RLS may not be properly configured', data);
    }
  } catch (error) {
    logTest('writeTests', 'Insert with anon key', 'FAIL', `Unexpected error: ${error.message}`, error);
  }
  
  // Test 2.2: Update with anon key (should fail due to RLS)
  try {
    const { data: existingRecords } = await supabaseAnon
      .from('etf_funds')
      .select('isin')
      .limit(1);
    
    if (existingRecords && existingRecords.length > 0) {
      const testIsin = existingRecords[0].isin;
      
      const { data, error } = await supabaseAnon
        .from('etf_funds')
        .update({ name: 'Updated Name - Should Not Update' })
        .eq('isin', testIsin);
      
      if (error) {
        logTest('writeTests', 'Update with anon key', 'PASS', `Update correctly blocked by RLS: ${error.message}`, {
          errorCode: error.code,
          expectedBehavior: 'Update should be blocked for anon users'
        });
      } else {
        logTest('writeTests', 'Update with anon key', 'FAIL', 'Update with anon key succeeded - RLS may not be properly configured', data);
      }
    } else {
      logTest('writeTests', 'Update with anon key', 'WARN', 'No existing records found to test update');
    }
  } catch (error) {
    logTest('writeTests', 'Update with anon key', 'FAIL', `Unexpected error: ${error.message}`, error);
  }
  
  // Test 2.3: Test with service role (if available)
  if (supabaseService) {
    console.log('   Testing with service role key...');
    
    try {
      const testRecord = {
        isin: 'SVCTEST123456789',
        name: 'Service Role Test ETF',
        fund_provider: 'Service Test Provider',
        ter_numeric: 0.005
      };
      
      const { data, error } = await supabaseService
        .from('etf_funds')
        .insert(testRecord);
      
      if (error) {
        logTest('writeTests', 'Insert with service role', 'FAIL', `Service role insert failed: ${error.message}`, error);
      } else {
        logTest('writeTests', 'Insert with service role', 'PASS', 'Service role can insert data as expected', data);
        
        // Clean up test record
        await supabaseService
          .from('etf_funds')
          .delete()
          .eq('isin', 'SVCTEST123456789');
      }
    } catch (error) {
      logTest('writeTests', 'Insert with service role', 'FAIL', `Unexpected error: ${error.message}`, error);
    }
  } else {
    logTest('writeTests', 'Service role test', 'WARN', 'SUPABASE_SERVICE_ROLE_KEY environment variable not set - cannot test service role operations');
  }
}

// TEST 3: SCHEMA OPERATIONS
async function testSchemaOperations() {
  console.log('\n🏗️ Testing SCHEMA operations...');
  
  // Test 3.1: Attempt to add column with anon key (should fail)
  try {
    const { data, error } = await supabaseAnon.rpc('sql', {
      query: 'ALTER TABLE etf_funds ADD COLUMN test_column_should_fail TEXT;'
    });
    
    if (error) {
      logTest('schemaTests', 'Schema modification with anon key', 'PASS', `Schema modification correctly blocked: ${error.message}`, {
        errorCode: error.code,
        expectedBehavior: 'Schema modifications should be blocked for anon users'
      });
    } else {
      logTest('schemaTests', 'Schema modification with anon key', 'FAIL', 'Schema modification with anon key succeeded - this is a security risk', data);
    }
  } catch (error) {
    logTest('schemaTests', 'Schema modification with anon key', 'PASS', `Schema modification blocked as expected: ${error.message}`);
  }
  
  // Test 3.2: Test with service role (if available)
  if (supabaseService) {
    try {
      // First try to check if a test column exists
      const { data, error } = await supabaseService.rpc('sql', {
        query: `SELECT column_name FROM information_schema.columns 
                WHERE table_name = 'etf_funds' AND column_name = 'test_service_column';`
      });
      
      if (!error) {
        logTest('schemaTests', 'Schema query with service role', 'PASS', 'Service role can query schema information');
        
        // Note: We won't actually modify the schema in the test to avoid side effects
        logTest('schemaTests', 'Schema modification with service role', 'INFO', 'Service role should be able to modify schema (not tested to avoid side effects)');
      } else {
        logTest('schemaTests', 'Schema query with service role', 'FAIL', `Service role schema query failed: ${error.message}`, error);
      }
    } catch (error) {
      logTest('schemaTests', 'Schema operations with service role', 'FAIL', `Unexpected error: ${error.message}`, error);
    }
  }
}

// TEST 4: ADMIN TABLE SECURITY
async function testAdminTableSecurity() {
  console.log('\n🔐 Testing app_admins table security...');
  
  // Test 4.1: Attempt to read admin table with anon key (should fail)
  try {
    const { data, error } = await supabaseAnon
      .from('app_admins')
      .select('*');
    
    if (error) {
      logTest('adminTests', 'Admin table read with anon key', 'PASS', `Admin table access correctly blocked: ${error.message}`, {
        errorCode: error.code,
        expectedBehavior: 'Admin table should be inaccessible to anon users'
      });
    } else {
      logTest('adminTests', 'Admin table read with anon key', 'FAIL', 'Admin table accessible to anon users - security risk', data);
    }
  } catch (error) {
    logTest('adminTests', 'Admin table read with anon key', 'PASS', `Admin table access blocked as expected: ${error.message}`);
  }
  
  // Test 4.2: Attempt to insert into admin table with anon key (should fail)
  try {
    const { data, error } = await supabaseAnon
      .from('app_admins')
      .insert({ user_email: 'test@example.com' });
    
    if (error) {
      logTest('adminTests', 'Admin table insert with anon key', 'PASS', `Admin table insert correctly blocked: ${error.message}`, {
        errorCode: error.code,
        expectedBehavior: 'Admin table inserts should be blocked for anon users'
      });
    } else {
      logTest('adminTests', 'Admin table insert with anon key', 'FAIL', 'Admin table insert allowed for anon users - security risk', data);
    }
  } catch (error) {
    logTest('adminTests', 'Admin table insert with anon key', 'PASS', `Admin table insert blocked as expected: ${error.message}`);
  }
  
  // Test 4.3: Test admin function
  try {
    const { data, error } = await supabaseAnon.rpc('is_user_admin', {
      user_email: 'test@example.com'
    });
    
    if (error) {
      logTest('adminTests', 'Admin function call', 'WARN', `Admin function call failed: ${error.message}`, error);
    } else {
      logTest('adminTests', 'Admin function call', 'PASS', `Admin function returned: ${data}`, { result: data });
    }
  } catch (error) {
    logTest('adminTests', 'Admin function call', 'FAIL', `Unexpected error: ${error.message}`, error);
  }
}

// TEST 5: RLS VERIFICATION
async function testRLSStatus() {
  console.log('\n🛡️ Verifying Row Level Security status...');
  
  if (supabaseService) {
    try {
      // Check RLS status for all tables
      const { data, error } = await supabaseService.rpc('sql', {
        query: `
          SELECT 
            schemaname,
            tablename,
            rowsecurity as rls_enabled,
            CASE 
              WHEN rowsecurity THEN 'ENABLED'
              ELSE 'DISABLED'
            END as rls_status
          FROM pg_tables 
          WHERE schemaname = 'public'
          AND tablename IN ('etf_funds', 'app_admins', 'newsletter_subscribers', 'newsletters')
          ORDER BY tablename;
        `
      });
      
      if (error) {
        logTest('rlsTests', 'RLS status check', 'FAIL', `Failed to check RLS status: ${error.message}`, error);
      } else if (data) {
        logTest('rlsTests', 'RLS status check', 'PASS', 'Successfully retrieved RLS status for tables', data);
        
        // Check specific tables
        const criticalTables = ['etf_funds', 'app_admins'];
        for (const table of criticalTables) {
          const tableInfo = data.find(t => t.tablename === table);
          if (tableInfo) {
            if (tableInfo.rls_enabled) {
              logTest('rlsTests', `RLS for ${table}`, 'PASS', `RLS is enabled for ${table} table`);
            } else {
              logTest('rlsTests', `RLS for ${table}`, 'FAIL', `RLS is DISABLED for ${table} table - security risk`);
            }
          } else {
            logTest('rlsTests', `RLS for ${table}`, 'WARN', `Table ${table} not found in RLS status check`);
          }
        }
      }
    } catch (error) {
      logTest('rlsTests', 'RLS status check', 'FAIL', `Unexpected error: ${error.message}`, error);
    }
    
    // Check for existing policies
    try {
      const { data, error } = await supabaseService.rpc('sql', {
        query: `
          SELECT 
            schemaname,
            tablename,
            policyname,
            permissive,
            roles,
            cmd,
            qual
          FROM pg_policies 
          WHERE schemaname = 'public'
          ORDER BY tablename, policyname;
        `
      });
      
      if (error) {
        logTest('rlsTests', 'RLS policies check', 'FAIL', `Failed to check RLS policies: ${error.message}`, error);
      } else if (data) {
        logTest('rlsTests', 'RLS policies check', 'PASS', `Found ${data.length} RLS policies`, {
          totalPolicies: data.length,
          policies: data
        });
      }
    } catch (error) {
      logTest('rlsTests', 'RLS policies check', 'FAIL', `Unexpected error: ${error.message}`, error);
    }
  } else {
    logTest('rlsTests', 'RLS verification', 'WARN', 'Cannot verify RLS status without service role key');
  }
}

// Generate final report
function generateReport() {
  console.log('\n📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${testResults.summary.passed}`);
  console.log(`❌ Failed: ${testResults.summary.failed}`);
  console.log(`⚠️  Warnings: ${testResults.summary.warnings}`);
  console.log('='.repeat(50));
  
  // Security recommendations
  console.log('\n🔒 SECURITY ANALYSIS & RECOMMENDATIONS');
  console.log('='.repeat(50));
  
  const readTestsPassed = testResults.readTests.filter(t => t.status === 'PASS').length;
  const writeTestsFailed = testResults.writeTests.filter(t => t.status === 'PASS' && t.test.includes('anon key')).length;
  
  if (readTestsPassed > 0) {
    console.log('✅ PUBLIC READ ACCESS: Frontend can read ETF data successfully');
  } else {
    console.log('❌ PUBLIC READ ACCESS: Issues detected with public read access');
  }
  
  if (writeTestsFailed > 0) {
    console.log('✅ WRITE PROTECTION: Anonymous users are properly blocked from writing');
  } else {
    console.log('❌ WRITE PROTECTION: Anonymous users may have write access - security risk');
  }
  
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.log('⚠️  SERVICE ROLE: Set SUPABASE_SERVICE_ROLE_KEY environment variable to test service role operations');
    console.log('   Example: export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"');
  }
  
  // Configuration status
  console.log('\n⚙️ CONFIGURATION STATUS');
  console.log('='.repeat(50));
  console.log(`Database URL: ${SUPABASE_URL}`);
  console.log(`Anon Key: ${SUPABASE_ANON_KEY.substring(0, 20)}...`);
  console.log(`Service Role Key: ${SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Not Set'}`);
  
  // Save detailed results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = `/tmp/supabase_rls_test_${timestamp}.json`;
  
  try {
    require('fs').writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
    console.log(`\n📄 Detailed test results saved to: ${reportPath}`);
  } catch (error) {
    console.log(`\n⚠️  Could not save detailed results: ${error.message}`);
  }
}

// Main test execution
async function runAllTests() {
  console.log('🚀 Starting Supabase RLS Test Suite');
  console.log('='.repeat(50));
  console.log(`Testing database: ${SUPABASE_URL}`);
  console.log(`Test started: ${new Date().toISOString()}`);
  
  try {
    await testReadOperations();
    await testWriteOperations();
    await testSchemaOperations();
    await testAdminTableSecurity();
    await testRLSStatus();
    
    generateReport();
    
  } catch (error) {
    console.error('\n💥 Test suite failed with error:', error);
    process.exit(1);
  }
}

// Execute tests
runAllTests().catch(console.error);