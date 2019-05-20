# Build instructions

Make sure the correct .env is set, and you have regions/transportation.geojson in the /data/ directory.

Go to .../github/MACK/AccessMaps/accessmap, and run:

`docker-compose -f docker-compose.build.yml -f docker-compose.build.override.yml up`

`docker-compose up`
