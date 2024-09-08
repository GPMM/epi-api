include .env
export

compose-up:
	docker compose up -d

compose-down:
	docker compose down

docker-clean-all:
	docker system prune --volumes

prisma-generate:
	npx prisma generate

prisma-migrate:
	npx prisma migrate dev

run:
	npm run start:dev