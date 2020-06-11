# Newsy-API
Newsy is a website designed for consumption of the new aggregation API. It handles login, user creation, password encryption &amp; resetting, a UI for consumption of the API, article logging, feed parsing and topics (as mentioned in the Editors section). By default it will run on http://127.0.0.1:5000/
API
Endpoints

Format is http://<url>/<endpoint>, e.g GET: http://localhost:3000/channel/5eadd20cc33ff44bd3cc91ad

    POST:
        /channel : Create new channel with input format:
            'name' : String denoting the channel name
            'url' : String of the RSS feed url
            'enabled' : Boolean value denoting whether the feed is enabled or not

    GET:
        /channel/ : Get all channel names
        /channel/`channel_id` : Get a channel based on a given channel ID
        /channel/`channel_url` : Get a channel based on a given RSS feed URL
        /channel/namesearch : Get all channels matching a regex expression passed as input

    PATCH:
        /channel/`channel_id` : Update a channel using the same format as the POST command

    PUT:
        /channel/enabled : Enable/Disable the channel based on a given channel name

    DELETE:
        /channel/`channel_id` : Delete a channel based on a given channel ID

By default this will run on http://localhost:3000
