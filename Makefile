up-b:
	docker-compose up --build --force-recreate -d app
up:
	docker-compose up app
stop:
	docker-compose stop app
down:
	docker-compose down
sh:
	docker-compose exec -it app sh

