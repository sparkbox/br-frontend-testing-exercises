module.exports.register = (Handlebars, options) ->
  Handlebars.registerHelper "ifFutureDate", (date, options) ->
    options.fn(@) if date == undefined || Date.parse(date) >= new Date()

  Handlebars.registerHelper "toFromDate", (start, end, options) ->
    monthNames = ["January", "February", "March",
                 "April", "May", "June",
                 "July", "August", "September",
                 "October", "November", "December"]

    debugger
    startDate = new Date(start)
    endDate = new Date(end)
    startMonth = startDate.getMonth()
    endMonth = endDate.getMonth()

    if startMonth == endMonth
      if startDate.getDate() == endDate.getDate()
        new Handlebars.SafeString "#{monthNames[startMonth]} #{startDate.getDate()}, #{startDate.getFullYear()}"
      else
        new Handlebars.SafeString "#{monthNames[startMonth]} #{startDate.getDate()}-#{endDate.getDate()}, #{startDate.getFullYear()}"
    else
      new Handlebars.SafeString "#{monthNames[startMonth].substring(0,3)} #{startDate.getDate()}- #{monthNames[endMonth].substring(0,3)} #{endDate.getDate()}, #{endDate.getFullYear()}"

  Handlebars.registerHelper "createId", (str) ->
    str=str.toLowerCase()
    str.replace(/\s/gi, "_")
