curl --location --request POST 'https://api.astronomyapi.com/api/v2/studio/star-chart' \
--header 'Content-Type: application/json' \
--header "Authorization: Basic ${BASIC_AUTH_KEY}" \
--data '{
  "observer": {
    "date": "2022-02-01",
    "latitude": -22.05546,
    "longitude": 54.36588
  },
  "style": "red",
  "view": {
    "parameters": {
      "constellation": "tau"
    },
    "type": "constellation"
  }
}'