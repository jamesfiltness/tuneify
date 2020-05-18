# Tuneify

Tuneify is a music app built using the YouTube video player API and data from Musicbrainz and LastFm.

The focus for this project has been on learning new tech and not so much on code quality 🙈

UPDATE on this project: I ran this project locally recently and there are a few things that no longer work:
1. Playing a track no longer seems to queue the video in the embedded YouTube player. There has probably been a change to YouTube's Player API. There would probably be a quick fix for this.
2. LastFm seems to have stopped providing thumbnails in a few different contexts (most popular artists, some album covers etc). LastFm's terms of service prohibit any third party application from using the thumbnails anyway and because of this I did start writing a collection of Python scripts to scrape cover art/artist images from discogs and Musicbrainz: https://github.com/jamesfiltness/tuneify-python - these were working well and I successfully collected a very large library of images which could have been used to remove the dependency on LastFM.

LastFm is currently being used to power the search functionality and track listing data for the app. I was working to moving away from LastFm to using a custom ElasticSearch DB constructed from data running on MusicBrainz slave (https://github.com/metabrainz/musicbrainz-docker) to run the autocomplete search on as LastFm didn't seem to keep their data up to date. There is a repo here which contains some related code: https://github.com/jamesfiltness/musicbrainz-elasticsearch.

The idea was to to use [this](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-jdbc.html) Logstash plugin to ingest data from the MusicBrainz slave in to ElasticSearch. This worked really well and I had a working autocomplete running on ElasticSearch. The next problem was that a search would return any and all artists matching the autocomplete search term. Lots of artists indexed on MusicBrainz are basically unknown to the general public so the results were not very usable. To solve this problem I augmented to ElasticSearch DB to include a `views` property for each artist/release. Whenever a search was performed and a result selected I would bump the views property. ElasticSearch was configured to give stronger preference to displaying results with a higher `views` count. Obvioulsy, to begin with I had no views data so I decided to manufacture some `views`. I wrote two Python scripts which took popular artists/releases from lots of different genres of music, used LastFm's APIs to find their similar artists/releases and then bumped the `views` property in the ElasticSearch index for all of those artists/releases by 100. Those scripts can be found here: https://github.com/jamesfiltness/tuneify-python/tree/master/elasticsearch. This worked well and resulted in an autocomplete which favoured/well known artists/releases. The example app found in this repo pulled the artist/release and also the relevant thumbnail.

This was as far as I got. There was a lot more work required to get the ElasticSearch version of the app in to production, too much for one person. The React app was fairly complete (the code for the play queue needed a complete rewrite though). I planned to host the app and the artist/album images on S3/CloundFront and did some work around that. It seemed to work well and was a very cheap way to host the application. Other problems would be that the ElasticSearch DB would need to by synced with the MusicBrainz slave on a regular basis, whilst maintaining the existing `views` property data. This would also mean that it would be necessary to gather new artist/release images from Dicogs/Musicbrainz. These were problems I didn't even think about.

## Tech
* React Redux, Redux Router frontend
* Mocha, Chai, Enzyme, Sinon
* Es6 + Babel
* Serverless (AWS Lambda) + DynamoDb to store user playlist data
* Auth0
* ElasticSearch for autocomplete
* Musicbrainz slave https://bitbucket.org/lalinsky/mbslave
* S3 + Cloudfront to serve static frontend 
* S3 + Cloudfront to store artist / album images





