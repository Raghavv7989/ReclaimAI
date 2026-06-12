<![CDATA[# ============================================================================
# ReclaimAI — Development Makefile
# ============================================================================

.PHONY: help up down restart logs build clean \
        frontend-dev frontend-lint frontend-test frontend-build \
        backend-dev backend-lint backend-test backend-migrate \
        ai-dev ai-lint ai-test \
        lint test typecheck db-migrate db-reset seed

# Default target
help: ## Show this help message
	@echo "ReclaimAI — Development Commands"
	@echo "================================"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ============================================================================
# Docker Compose
# ============================================================================

up: ## Start all services (docker compose up)
	docker compose up --build -d

down: ## Stop all services
	docker compose down

restart: ## Restart all services
	docker compose down && docker compose up --build -d

logs: ## Tail logs for all services
	docker compose logs -f

build: ## Build all Docker images
	docker compose build

clean: ## Remove all containers, volumes, and images
	docker compose down -v --rmi all --remove-orphans

# ============================================================================
# Frontend
# ============================================================================

frontend-dev: ## Start frontend dev server (local)
	cd frontend && npm run dev

frontend-lint: ## Lint frontend code
	cd frontend && npm run lint

frontend-test: ## Run frontend tests
	cd frontend && npm run test

frontend-build: ## Build frontend for production
	cd frontend && npm run build

# ============================================================================
# Backend
# ============================================================================

backend-dev: ## Start backend dev server (local)
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

backend-lint: ## Lint backend code
	cd backend && ruff check . && ruff format --check .

backend-test: ## Run backend tests
	cd backend && python -m pytest

backend-migrate: ## Run database migrations
	cd backend && alembic upgrade head

# ============================================================================
# AI Service
# ============================================================================

ai-dev: ## Start AI service dev server (local)
	cd ai_service && uvicorn app.main:app --reload --host 0.0.0.0 --port 8001

ai-lint: ## Lint AI service code
	cd ai_service && ruff check . && ruff format --check .

ai-test: ## Run AI service tests
	cd ai_service && python -m pytest

# ============================================================================
# Aggregate Commands
# ============================================================================

lint: frontend-lint backend-lint ai-lint ## Run all linters

test: frontend-test backend-test ai-test ## Run all tests

typecheck: ## Run type checks for all services
	cd frontend && npx tsc --noEmit
	cd backend && python -m mypy app/
	cd ai_service && python -m mypy app/

# ============================================================================
# Database
# ============================================================================

db-migrate: ## Run pending database migrations
	cd backend && alembic upgrade head

db-reset: ## Reset database (drop all + migrate + seed)
	cd backend && alembic downgrade base && alembic upgrade head
	python scripts/seed_db.py

seed: ## Seed database with demo data
	python scripts/seed_db.py
]]>
