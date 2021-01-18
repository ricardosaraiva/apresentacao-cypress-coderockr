docker-up-dev:
	sed -i 's/APP_ENVIRONMENT=.*/APP_ENVIRONMENT=dev/' .env
	docker-compose down
	docker-compose up -d

docker-up-test:
	sed -i 's/APP_ENVIRONMENT=.*/APP_ENVIRONMENT=test/' .env
	docker-compose down
	docker-compose up -d

test-clear-database:
	docker-compose run --rm api bash -c "\
		cd /var/app \
		&& npx ts-node-script src/scripts/clearTestDatabase.ts\
	"

test-clear-collection:
	docker-compose run --rm api bash -c "\
		cd /var/app \
		&& npx ts-node-script src/scripts/clearTestCollection.ts $(collection)\
	"

cypress:
	make docker-up-test
	cd front && yarn start > /dev/null &
	make test-clear-database
	cd front && yarn cypress > /dev/null &
