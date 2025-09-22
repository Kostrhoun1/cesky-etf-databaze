#!/bin/bash

# Database connection script for PostgreSQL/Supabase
# Usage: ./connect_psql.sh [password]

SUPABASE_HOST="db.nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_USER="postgres"
SUPABASE_DB="postgres"
SUPABASE_PORT="5432"

if [ -z "$1" ]; then
    echo "Usage: $0 <database_password>"
    echo ""
    echo "Example queries you can run:"
    echo "SELECT COUNT(*) FROM etf_funds;"
    echo "SELECT DISTINCT region FROM etf_funds ORDER BY region;"
    echo "SELECT name, ter_numeric FROM etf_funds WHERE region = 'Severní Amerika' LIMIT 5;"
    exit 1
fi

PASSWORD="$1"

echo "🔗 Connecting to Supabase PostgreSQL..."
echo "Host: $SUPABASE_HOST"
echo "Database: $SUPABASE_DB"
echo "User: $SUPABASE_USER"
echo ""

# Connect to PostgreSQL
PGPASSWORD="$PASSWORD" psql -h "$SUPABASE_HOST" -p "$SUPABASE_PORT" -U "$SUPABASE_USER" -d "$SUPABASE_DB"