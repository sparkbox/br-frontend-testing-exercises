window.MAPDATA =

  icons:
    sparkbox:
      iconUrl: "/img/mapbox/marker--sb-hq.png"
      iconSize: [44, 51]
      iconAnchor: [22, 51]
      popupAnchor: [0, -51]
      className: "map--sb-hq"
    speaking:
      iconUrl: "/img/mapbox/marker--speaking.png"
      iconSize: [44, 51]
      iconAnchor: [22, 51]
      popupAnchor: [0, -51]
      className: "map--speaking"
    buildright:
      iconUrl: "/img/mapbox/marker--build-right.png"
      iconSize: [44, 51]
      iconAnchor: [22, 51]
      popupAnchor: [0, -51]
      className: "map--build-right"
    attending:
      iconUrl: "/img/mapbox/marker--attending.png"
      iconSize: [44, 51]
      iconAnchor: [22, 51]
      popupAnchor: [0, -51]
      className: "map--sb-hq"

  marker:
    type: "Feature"
    geometry:
      type: "Point"
    properties: {}


window.MAP =

  openPopup: (id) ->
    @map.markerLayer.eachLayer (marker) =>
      if marker.feature.properties.id is id
        @map.setView(marker.getLatLng(), 6, {pan: {animate: true}})
        marker.openPopup()

  linkSidebar: ->
    $(".map-footer--nav").on "click", ".map-footer--nav-item", (e) ->
      MAP.openPopup $(this).data("marker-id")

      state = APP.getState()

      MAP.openCloseNav() if state is "small" or state is "default"

      e.preventDefault()

  setEventCount: (count) ->
    $(".map-footer--event-count").html count

  buildKey: (city, state, country) ->
    result = ""

    result += city if city
    result += state if state
    result += country if country

  validCoordinates: (coords) ->
    return false unless $.isArray(coords)
    return false unless coords.length == 2
    return false if coords[0] is null or coords[1] == null or isNaN(coords[0]) or isNaN(coords[1])

    true

  plotMarker: (location) ->

    if location and MAP.validCoordinates(location.coordinates) and (location.endDate is undefined or location.endDate >= @today)

      icon = location.icon or "attending"

      marker = JSON.parse(JSON.stringify(MAPDATA.marker))
      marker.geometry.coordinates = location.coordinates
      marker.properties.icon = JSON.parse(JSON.stringify(MAPDATA.icons[icon]))
      marker.properties.description = location.description
      marker.properties.title = location.title
      marker.properties.city = location.city
      marker.properties.state = location.state
      marker.properties.country = location.country
      marker.properties.id = MAP.buildKey(location.city, location.state, location.country)
      marker.properties.count = 1
      marker.properties.people = location.people
      marker.properties.startDate = location.startDateText

    return marker

  goingToCity: (city, state) ->
    result = false
    for m in @markers
      if m?.properties?.city == city && m.properties.state == state
        m.properties.count += 1
        m.properties.icon.iconUrl = "/img/mapbox/marker--#{m.properties.count}.png"
        result = true

    return result

  createMarkers: ->
    @markers = []
    count = 0
    for location in @mapLocations
      if @isPublishable(location)
        count++
        marker = @plotMarker(location)
        unless marker == undefined or @goingToCity(location.city, location.state)
          @markers.push marker

      if @isRuntime()
        @map.markerLayer.setGeoJSON(@markers)
        @createPopups()

    @setEventCount count

  isPublishable: ->
    location.title == "Sparkbox Headquarters" || location.endDateText == undefined || location.endDateText > new Date()

  isRuntime: ->
    @map?

  listTemplate: Handlebars.compile """
    <ul>
      {{#each this}}
        <li>
          <a href="#" title="View {{title}} on the map" class="map-footer--nav-item {{#if is-highlighted}}map-footer--nav-item_highlighted{{/if}}" data-marker-id="{{city}}{{state}}{{country}}">
            <h4 class="map-footer--nav-title">{{title}}</h4>
            {{#if startDate}}
              {{toFromDate startDateText endDateText}}
            {{/if}}
            <span class="map-footer--nav-location">{{city}}{{#if state}}, {{state}}{{/if}}{{#isnt country "United States"}}, {{country}}{{/isnt}} </span>
          </a>
        </li>
      {{/each}}
    </ul>
  """

  popupTemplate: Handlebars.compile """
    {{#if hasMoreThanOne}}
      <p class="map-footer--popup-title">Events in {{firstLocation.city}}</p>
    {{/if}}

    <ul class="map-footer--popup-multi-city--list">

      {{#each locations}}
        <li>
          <h1 class="map-footer--popup-title{{#if ../hasMoreThanOne}}_multi-city{{/if}}">
            <a href="{{ link }}">{{title}}</a>
          </h1>
          <div class="map-footer--popup-inner-content">

            {{#if startDateText}}
              <p class="map-footer--popup-date">{{startDateText}}</p>
            {{/if}}

            <p>{{{description}}}</p>

            {{#if speakers}}
              <h2 class="map-footer--popup-subheading">Speaking:</h2>
              <ul class="map-footer--popup-twitter-listing">
                {{#each speakers}}
                  <li>
                    <a href="//twitter.com/{{this}}">{{this}}</a>
                  </li>
                {{/each}}
              </ul>
            {{/if}}

            {{#if attendees}}
              <h2 class="map-footer--popup-subheading">Attending:</h2>
              <ul class="map-footer--popup-twitter-listing">
                {{#each attendees}}
                  <li>
                    <a href="//twitter.com/{{this}}">{{this}}</a>
                  </li>
                {{/each}}
              </ul>
            {{/if}}

          </div>
        </li>
      {{/each}}

    </ul>
  """

  popupContent: (props) ->
    {city, state, country} = props
    locations = []

    for location in @mapLocations
      if location.city == city and location.state == state and location.country == country
        locations.push(location)

    @popupTemplate(
      locations: locations
      firstLocation: locations[0]
      hasMoreThanOne: props.count > 1
    )

  createPopups: ->
    @map.markerLayer.eachLayer (layer) =>
      content = @popupContent layer.feature.properties
      layer.bindPopup content,
        closeButton: false
        offset: new L.Point(0, -55)

  openCloseNav: ->
    mapContainer = $(".map-footer--map-container")
    mapContainer.toggleClass("map-footer--map-container_is-open")

  navToggle: ->
    $(".js--map-footer--nav-trigger").click (e) =>
      e.preventDefault()
      @openCloseNav()

  hbHelpers: ->
    Handlebars.registerHelper 'isnt',  (value, test, options)->
      if value != test
        options.fn(@)
      else
        options.inverse(@)

    Handlebars.registerHelper 'toFromDate', (start, end, options) ->
      endDate = undefined
      endMonth = undefined
      monthNames = undefined
      startDate = undefined
      startMonth = undefined
      monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      startDate = new Date(start)
      endDate = new Date(end)
      startMonth = startDate.getMonth()
      endMonth = endDate.getMonth()

      if startMonth is endMonth
        if startDate.getDate() is endDate.getDate()
          new Handlebars.SafeString("" + monthNames[startMonth] + " " + (startDate.getDate()) + ", " + (startDate.getFullYear()))
        else
          new Handlebars.SafeString("" + monthNames[startMonth] + " " + (startDate.getDate()) + " - " + (endDate.getDate()) + ", " + (startDate.getFullYear()))
      else
        new Handlebars.SafeString("" + (monthNames[startMonth].substring(0, 3)) + " " + (startDate.getDate()) + "- " + (monthNames[endMonth].substring(0, 3)) + " " + (endDate.getDate()) + ", " + (endDate.getFullYear()))

  load: ->
    @today = new Date()

    @hbHelpers()

    $.ajax
      url: "/map-data.json"
      success: (data) =>
        @mapLocations = if typeof data == "object"
          data
        else
          JSON.parse data

        $(".map-footer--nav").html @listTemplate(@mapLocations)

        try
          @map = L.mapbox.map('map', 'sparkbox.gig7i1dj')
          @map.markerLayer.on 'layeradd', (e) ->
            marker = e.layer
            feature = marker.feature

            marker.setIcon(L.icon(feature.properties.icon))

          @createMarkers()

          @map.fitBounds(@map.markerLayer.getBounds(),
            padding: [5, 5]
          )

          @navToggle()
          @map.scrollWheelZoom.disable()
          @setEventCount()
          @linkSidebar()

          @loaded = true
        catch e

