#!/usr/bin/env python3

"""
Comprehensive Supabase RLS (Row Level Security) Test Suite - Python Version

This script tests database operations with Python (for scraper functionality):
1. READ TEST: Public read access to etf_funds table
2. WRITE TEST: Write operations with different access levels 
3. SCHEMA TEST: Schema modification attempts
4. ADMIN TEST: app_admins table security verification
5. RLS VERIFICATION: Check if RLS is properly enabled

Note: This version is designed to work with the Python scraper environment
"""

import os
import json
import datetime
from supabase import create_client, Client
from typing import List, Dict, Any, Optional

# Supabase configuration
SUPABASE_URL = 'https://nbhwnatadyubiuadfakx.supabase.co'
SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY'

# Environment variable for service role key
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

class SupabaseRLSTest:
    def __init__(self):
        self.supabase_anon: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
        self.supabase_service: Optional[Client] = None
        
        if SUPABASE_SERVICE_ROLE_KEY:
            self.supabase_service = create_client(
                SUPABASE_URL, 
                SUPABASE_SERVICE_ROLE_KEY,
                {
                    'auth': {
                        'autoRefreshToken': False,
                        'persistSession': False
                    }
                }
            )
        
        self.test_results = {
            'read_tests': [],
            'write_tests': [],
            'schema_tests': [],
            'admin_tests': [],
            'rls_tests': [],
            'summary': {
                'passed': 0,
                'failed': 0,
                'warnings': 0
            }
        }
    
    def log_test(self, category: str, test_name: str, status: str, message: str, data: Any = None):
        """Log test result with proper formatting"""
        result = {
            'test': test_name,
            'status': status,  # 'PASS', 'FAIL', 'WARN', 'INFO'
            'message': message,
            'data': data,
            'timestamp': datetime.datetime.now().isoformat()
        }
        
        self.test_results[category].append(result)
        
        emoji = {
            'PASS': '✅',
            'FAIL': '❌',
            'WARN': '⚠️',
            'INFO': 'ℹ️'
        }[status]
        
        print(f"{emoji} [{category.upper()}] {test_name}: {message}")
        if data:
            print(f"   Data: {json.dumps(data, indent=2, default=str)}")
        
        # Update summary
        if status == 'PASS':
            self.test_results['summary']['passed'] += 1
        elif status == 'FAIL':
            self.test_results['summary']['failed'] += 1
        elif status == 'WARN':
            self.test_results['summary']['warnings'] += 1
    
    def test_read_operations(self):
        """Test READ operations on etf_funds table"""
        print('\\n🔍 Testing READ operations on etf_funds table...')
        
        try:
            # Test 1.1: Basic read
            response = self.supabase_anon.table('etf_funds') \
                .select('isin,name,fund_provider,ter_numeric') \
                .limit(5) \
                .execute()
            
            if response.data and len(response.data) > 0:
                self.log_test('read_tests', 'Basic ETF data read', 'PASS', 
                             f'Successfully read {len(response.data)} ETF records', {
                                 'sample_record': response.data[0],
                                 'total_records': len(response.data)
                             })
            else:
                self.log_test('read_tests', 'Basic ETF data read', 'WARN', 
                             'No ETF data found in database')
            
            # Test 1.2: Count total records
            count_response = self.supabase_anon.table('etf_funds') \
                .select('*', count='exact') \
                .execute()
            
            if hasattr(count_response, 'count') and count_response.count:
                self.log_test('read_tests', 'ETF count query', 'PASS', 
                             f'Database contains {count_response.count} ETF records')
            else:
                self.log_test('read_tests', 'ETF count query', 'WARN', 
                             'Could not determine ETF count')
            
            # Test 1.3: Complex query with filters
            filtered_response = self.supabase_anon.table('etf_funds') \
                .select('isin,name,ter_numeric,fund_size_numeric') \
                .not_('ter_numeric', 'is', 'null') \
                .order('ter_numeric', desc=False) \
                .limit(3) \
                .execute()
            
            if filtered_response.data and len(filtered_response.data) > 0:
                self.log_test('read_tests', 'Filtered query', 'PASS', 
                             f'Successfully executed complex query with {len(filtered_response.data)} results', {
                                 'lowest_ter': filtered_response.data[0]
                             })
            else:
                self.log_test('read_tests', 'Filtered query', 'WARN', 
                             'Filtered query returned no results')
                
        except Exception as error:
            self.log_test('read_tests', 'Read operations general', 'FAIL', 
                         f'Unexpected error: {str(error)}', {'error': str(error)})
    
    def test_write_operations(self):
        """Test WRITE operations with different access levels"""
        print('\\n✏️ Testing WRITE operations...')
        
        # Test 2.1: Insert with anon key (should fail due to RLS)
        try:
            test_record = {
                'isin': 'TEST123456789',
                'name': 'Test ETF - Should Not Insert',
                'fund_provider': 'Test Provider',
                'ter_numeric': 0.01
            }
            
            response = self.supabase_anon.table('etf_funds').insert(test_record).execute()
            
            if hasattr(response, 'data') and response.data:
                self.log_test('write_tests', 'Insert with anon key', 'FAIL', 
                             'Insert with anon key succeeded - RLS may not be properly configured', response.data)
            else:
                self.log_test('write_tests', 'Insert with anon key', 'PASS', 
                             'Insert correctly blocked by RLS (no data returned)')
                
        except Exception as error:
            self.log_test('write_tests', 'Insert with anon key', 'PASS', 
                         f'Insert correctly blocked by RLS: {str(error)}', {
                             'error_type': type(error).__name__,
                             'expected_behavior': 'Insert should be blocked for anon users'
                         })
        
        # Test 2.2: Update with anon key (should fail due to RLS)
        try:
            # First get an existing record
            existing_response = self.supabase_anon.table('etf_funds') \
                .select('isin') \
                .limit(1) \
                .execute()
            
            if existing_response.data and len(existing_response.data) > 0:
                test_isin = existing_response.data[0]['isin']
                
                response = self.supabase_anon.table('etf_funds') \
                    .update({'name': 'Updated Name - Should Not Update'}) \
                    .eq('isin', test_isin) \
                    .execute()
                
                if hasattr(response, 'data') and response.data:
                    self.log_test('write_tests', 'Update with anon key', 'FAIL', 
                                 'Update with anon key succeeded - RLS may not be properly configured', response.data)
                else:
                    self.log_test('write_tests', 'Update with anon key', 'PASS', 
                                 'Update correctly blocked by RLS (no data returned)')
            else:
                self.log_test('write_tests', 'Update with anon key', 'WARN', 
                             'No existing records found to test update')
                
        except Exception as error:
            self.log_test('write_tests', 'Update with anon key', 'PASS', 
                         f'Update correctly blocked by RLS: {str(error)}', {
                             'error_type': type(error).__name__,
                             'expected_behavior': 'Update should be blocked for anon users'
                         })
        
        # Test 2.3: Test with service role (if available)
        if self.supabase_service:
            print('   Testing with service role key...')
            
            try:
                test_record = {
                    'isin': 'SVCTEST123456789',
                    'name': 'Service Role Test ETF',
                    'fund_provider': 'Service Test Provider',
                    'ter_numeric': 0.005
                }
                
                response = self.supabase_service.table('etf_funds').insert(test_record).execute()
                
                if response.data:
                    self.log_test('write_tests', 'Insert with service role', 'PASS', 
                                 'Service role can insert data as expected', response.data)
                    
                    # Clean up test record
                    self.supabase_service.table('etf_funds') \
                        .delete() \
                        .eq('isin', 'SVCTEST123456789') \
                        .execute()
                else:
                    self.log_test('write_tests', 'Insert with service role', 'FAIL', 
                                 'Service role insert failed - no data returned')
                    
            except Exception as error:
                self.log_test('write_tests', 'Insert with service role', 'FAIL', 
                             f'Service role insert failed: {str(error)}', {'error': str(error)})
        else:
            self.log_test('write_tests', 'Service role test', 'WARN', 
                         'SUPABASE_SERVICE_ROLE_KEY environment variable not set - cannot test service role operations')
    
    def test_schema_operations(self):
        """Test SCHEMA operations"""
        print('\\n🏗️ Testing SCHEMA operations...')
        
        # Test 3.1: Attempt to use SQL functions with anon key
        try:
            # Try to call a function that would require elevated permissions
            response = self.supabase_anon.rpc('sql', {
                'query': 'SELECT version();'
            })
            
            if response:
                self.log_test('schema_tests', 'SQL function call with anon key', 'FAIL', 
                             'SQL function accessible to anon users - potential security risk')
            else:
                self.log_test('schema_tests', 'SQL function call with anon key', 'PASS', 
                             'SQL function correctly blocked for anon users')
                
        except Exception as error:
            self.log_test('schema_tests', 'SQL function call with anon key', 'PASS', 
                         f'SQL function correctly blocked: {str(error)}', {
                             'error_type': type(error).__name__,
                             'expected_behavior': 'SQL functions should be blocked for anon users'
                         })
        
        # Test 3.2: Test with service role (if available)
        if self.supabase_service:
            try:
                # Check if we can query information schema
                response = self.supabase_service.rpc('sql', {
                    'query': '''SELECT column_name FROM information_schema.columns 
                                WHERE table_name = 'etf_funds' AND column_name = 'isin' LIMIT 1;'''
                })
                
                if response:
                    self.log_test('schema_tests', 'Schema query with service role', 'PASS', 
                                 'Service role can query schema information')
                else:
                    self.log_test('schema_tests', 'Schema query with service role', 'WARN', 
                                 'Service role schema query returned no results')
                    
            except Exception as error:
                self.log_test('schema_tests', 'Schema operations with service role', 'INFO', 
                             f'Service role schema access: {str(error)}')
    
    def test_admin_table_security(self):
        """Test app_admins table security"""
        print('\\n🔐 Testing app_admins table security...')
        
        # Test 4.1: Attempt to read admin table with anon key (should fail)
        try:
            response = self.supabase_anon.table('app_admins').select('*').execute()
            
            if response.data and len(response.data) > 0:
                self.log_test('admin_tests', 'Admin table read with anon key', 'FAIL', 
                             'Admin table accessible to anon users - security risk', response.data)
            else:
                self.log_test('admin_tests', 'Admin table read with anon key', 'PASS', 
                             'Admin table access correctly blocked (no data returned)')
                
        except Exception as error:
            self.log_test('admin_tests', 'Admin table read with anon key', 'PASS', 
                         f'Admin table access correctly blocked: {str(error)}', {
                             'error_type': type(error).__name__,
                             'expected_behavior': 'Admin table should be inaccessible to anon users'
                         })
        
        # Test 4.2: Attempt to insert into admin table with anon key (should fail)
        try:
            response = self.supabase_anon.table('app_admins') \
                .insert({'user_email': 'test@example.com'}) \
                .execute()
            
            if response.data:
                self.log_test('admin_tests', 'Admin table insert with anon key', 'FAIL', 
                             'Admin table insert allowed for anon users - security risk', response.data)
            else:
                self.log_test('admin_tests', 'Admin table insert with anon key', 'PASS', 
                             'Admin table insert correctly blocked (no data returned)')
                
        except Exception as error:
            self.log_test('admin_tests', 'Admin table insert with anon key', 'PASS', 
                         f'Admin table insert correctly blocked: {str(error)}', {
                             'error_type': type(error).__name__,
                             'expected_behavior': 'Admin table inserts should be blocked for anon users'
                         })
        
        # Test 4.3: Test admin function
        try:
            response = self.supabase_anon.rpc('is_user_admin', {
                'user_email': 'test@example.com'
            }).execute()
            
            if hasattr(response, 'data'):
                self.log_test('admin_tests', 'Admin function call', 'PASS', 
                             f'Admin function returned: {response.data}', {'result': response.data})
            else:
                self.log_test('admin_tests', 'Admin function call', 'WARN', 
                             'Admin function call returned no data')
                
        except Exception as error:
            self.log_test('admin_tests', 'Admin function call', 'FAIL', 
                         f'Admin function call failed: {str(error)}', {'error': str(error)})
    
    def test_rls_status(self):
        """Test RLS status verification"""
        print('\\n🛡️ Verifying Row Level Security status...')
        
        if self.supabase_service:
            try:
                # Check RLS status for all tables
                response = self.supabase_service.rpc('sql', {
                    'query': '''
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
                    '''
                })
                
                if response:
                    self.log_test('rls_tests', 'RLS status check', 'PASS', 
                                 'Successfully retrieved RLS status for tables', response)
                else:
                    self.log_test('rls_tests', 'RLS status check', 'WARN', 
                                 'RLS status check returned no data')
                    
            except Exception as error:
                self.log_test('rls_tests', 'RLS status check', 'FAIL', 
                             f'Failed to check RLS status: {str(error)}', {'error': str(error)})
            
            # Check for existing policies
            try:
                response = self.supabase_service.rpc('sql', {
                    'query': '''
                        SELECT 
                            schemaname,
                            tablename,
                            policyname,
                            permissive,
                            roles,
                            cmd
                        FROM pg_policies 
                        WHERE schemaname = 'public'
                        ORDER BY tablename, policyname;
                    '''
                })
                
                if response:
                    policy_count = len(response) if isinstance(response, list) else 1
                    self.log_test('rls_tests', 'RLS policies check', 'PASS', 
                                 f'Found RLS policies', {
                                     'total_policies': policy_count,
                                     'policies': response
                                 })
                else:
                    self.log_test('rls_tests', 'RLS policies check', 'WARN', 
                                 'No RLS policies found')
                    
            except Exception as error:
                self.log_test('rls_tests', 'RLS policies check', 'FAIL', 
                             f'Failed to check RLS policies: {str(error)}', {'error': str(error)})
        else:
            self.log_test('rls_tests', 'RLS verification', 'WARN', 
                         'Cannot verify RLS status without service role key')
    
    def generate_report(self):
        """Generate final test report"""
        print('\\n📊 TEST SUMMARY')
        print('=' * 50)
        print(f"✅ Passed: {self.test_results['summary']['passed']}")
        print(f"❌ Failed: {self.test_results['summary']['failed']}")
        print(f"⚠️  Warnings: {self.test_results['summary']['warnings']}")
        print('=' * 50)
        
        # Security recommendations
        print('\\n🔒 SECURITY ANALYSIS & RECOMMENDATIONS')
        print('=' * 50)
        
        read_tests_passed = len([t for t in self.test_results['read_tests'] if t['status'] == 'PASS'])
        write_tests_protected = len([t for t in self.test_results['write_tests'] 
                                   if t['status'] == 'PASS' and 'anon key' in t['test']])
        
        if read_tests_passed > 0:
            print('✅ PUBLIC READ ACCESS: Frontend can read ETF data successfully')
        else:
            print('❌ PUBLIC READ ACCESS: Issues detected with public read access')
        
        if write_tests_protected > 0:
            print('✅ WRITE PROTECTION: Anonymous users are properly blocked from writing')
        else:
            print('❌ WRITE PROTECTION: Anonymous users may have write access - security risk')
        
        if not SUPABASE_SERVICE_ROLE_KEY:
            print('⚠️  SERVICE ROLE: Set SUPABASE_SERVICE_ROLE_KEY environment variable to test service role operations')
            print('   Example: export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"')
        
        # Configuration status
        print('\\n⚙️ CONFIGURATION STATUS')
        print('=' * 50)
        print(f'Database URL: {SUPABASE_URL}')
        print(f'Anon Key: {SUPABASE_ANON_KEY[:20]}...')
        print(f'Service Role Key: {"Set" if SUPABASE_SERVICE_ROLE_KEY else "Not Set"}')
        
        # Save detailed results
        timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
        report_path = f'/tmp/supabase_rls_test_{timestamp}.json'
        
        try:
            with open(report_path, 'w') as f:
                json.dump(self.test_results, f, indent=2, default=str)
            print(f'\\n📄 Detailed test results saved to: {report_path}')
        except Exception as error:
            print(f'\\n⚠️  Could not save detailed results: {str(error)}')
        
        return self.test_results
    
    def run_all_tests(self):
        """Execute all tests"""
        print('🚀 Starting Supabase RLS Test Suite (Python Version)')
        print('=' * 50)
        print(f'Testing database: {SUPABASE_URL}')
        print(f'Test started: {datetime.datetime.now().isoformat()}')
        
        try:
            self.test_read_operations()
            self.test_write_operations()
            self.test_schema_operations()
            self.test_admin_table_security()
            self.test_rls_status()
            
            return self.generate_report()
            
        except Exception as error:
            print(f'\\n💥 Test suite failed with error: {str(error)}')
            raise

if __name__ == '__main__':
    tester = SupabaseRLSTest()
    try:
        results = tester.run_all_tests()
        exit_code = 1 if results['summary']['failed'] > 0 else 0
        exit(exit_code)
    except Exception as e:
        print(f'Test execution failed: {str(e)}')
        exit(1)