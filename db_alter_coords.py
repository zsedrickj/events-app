import psycopg2
from psycopg2 import sql
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

DB_HOST = "localhost"
DB_PORT = 5432
DB_USER = "postgres"       # change to your PostgreSQL user
DB_PASSWORD = "didik123"  # change to your PostgreSQL password

def create_database():
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        dbname="postgres"  # connect to default db first
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    # Check if DB exists
    cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'events_db'")
    exists = cursor.fetchone()

    if not exists:
        cursor.execute("CREATE DATABASE events_db")
        print("✅ Database 'events_db' created.")
    else:
        print("ℹ️  Database 'events_db' already exists.")

    cursor.close()
    conn.close()

def create_table():
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        dbname="events_db"
    )
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS events_entries (
            id          SERIAL PRIMARY KEY,
            title       VARCHAR(255) NOT NULL,
            description TEXT,
            lat         DOUBLE PRECISION NOT NULL,
            lng         DOUBLE PRECISION NOT NULL,
            created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    # Create indexes on lat and lng (DD format)
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_events_lat ON events_entries (lat);
    """)
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_events_lng ON events_entries (lng);
    """)

    conn.commit()
    print("✅ Table 'events_entries' created with lat/lng indexes.")

    cursor.close()
    conn.close()

if __name__ == "__main__":
    print("🔧 Running db_alter_coords.py...")
    create_database()
    create_table()
    print("🎉 Done! Database and table are ready.")