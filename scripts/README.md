<![CDATA[# Scripts — Development & Operations Utilities

## Responsibility

This directory contains standalone scripts for development, operations, and maintenance tasks. These scripts are NOT part of any service runtime — they are invoked manually or via CI/CD pipelines.

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `seed_db.py` | Populate the database with realistic demo data for development and testing | `python scripts/seed_db.py` |
| `rebuild_index.py` | Rebuild FAISS indexes from database embeddings (disaster recovery, cold start) | `python scripts/rebuild_index.py` |
| `generate_api_docs.py` | Export OpenAPI spec to static files for documentation hosting | `python scripts/generate_api_docs.py` |

## Guidelines

- All scripts should be runnable from the repository root
- Scripts must load configuration from environment variables (same `.env` as services)
- Scripts should include `--help` documentation via `argparse`
- Scripts should handle errors gracefully and provide clear output
- Database scripts must use the same SQLAlchemy models as the backend to prevent schema drift
]]>
