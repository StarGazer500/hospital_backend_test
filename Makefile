

# Start MongoDB in development mode (native mongod)
start-dev-db:
	mongod

# Start MongoDB Compass (GUI)
start-compass:
	mongodb-compass

# Start your development server using nodemon
start-dev-server:
	nodemon index.js


start-docker-db:
	docker compose  up --build



# Stop MongoDB container
stop-docker-db:
	docker compose  down 

test-apis:
	npm run test1
	npm run test2
	npm run test3
	# npm run test_gemini







