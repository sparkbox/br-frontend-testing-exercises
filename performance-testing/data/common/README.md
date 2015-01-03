# Instructions for updating Events

```YAML
title: [title] (required)
description: [brief text description]
link: [URL] (required)
icon: [speaking|attending|buildright] (required)
startDate: [mm-dd-yyyy] (only used for informational purposes)
endDate: [mm-dd-yyyy] (required, Events will no longer show up on the list after this date)
city: [city] (required)
state: [state]
country: [country]
coordinates: "[lon, lat]" (required)
people:
  - twitter: "@[twitter name]"
```

## Instructions for dates

Possible date formats:
```
3-1-2014
May, 2014
```
[More info on date formats](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

## Instructions for getting Lat/Lon

  1. Google "[city name] lat lon" and you will get the latitude and longitude for that city.
    - ex: "Dayton lat lon" -> 39.7594° N, 84.1917° W

  2. Anything that is S or W needs to made into a negative number.
    - ex. Dayton = 39.7594° N, 84.1917° W -> 39.7594, -84.1917

  3. To put that into the YAML, the latitude and longitude need to be reversed.
    - ex. Dayton = 39.7594° N, 84.1917° W -> 39.7594, -84.1917 -> -84.1917, 39.7594

  4. Put these coordinates into the YAML in quoted brackets.

    ```YAML
    city: Dayton
    coordinates: "[-84.1917, 39.7594]"
    ```

## Instructions for Twitter handles

  1. List Twitter handles for everyone going under the people section. They should be listed in the order they will appear, without the `@` symbol:

    ```YAML
    people:
      - bencallahan
      - otherpeople
    ```

### Here is a list of Twitter handles:
  - bencallahan
  - robertHarr
  - jeremyloyd
  - drewtclemens
  - cromwellryan
  - emilykggray
  - mutewinter
  - ethanmuller
  - marshall_norman
  - neilrenicker
  - a_simpson
  - SimpsonPatrick
  - robtarr
  - myockey
  - zastrow