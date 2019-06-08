docker-compose stop
docker-compose rm -f -s
docker-compose -f docker-compose.build.yml -f docker-compose.build.override.yml stop router_build
docker-compose -f docker-compose.build.yml -f docker-compose.build.override.yml rm -f router_build
docker-compose -f docker-compose.build.yml -f docker-compose.build.override.yml build --no-cache router_build
docker-compose -f docker-compose.build.yml -f docker-compose.build.override.yml build
docker-compose -f docker-compose.build.yml -f docker-compose.build.override.yml up
docker-compose -f docker-compose.yml -f docker-compose.override.yml build	
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
