const bugfixes = require('bugfixes')

const libs = require('./libs')

const bugfunctions = bugfixes.functions

module.exports = (event, context, callback) => {
  const body = JSON.parse(event.body)

  const details = libs.details
  details.url = body.feed
  details.checkInCache((error, result) => {
    if (error) {
      return callback(null, bugfunctions.lambdaError(100, {
        success: false,
        error: error
      }))
    }

    if (!result.inCache) {
      const parser = libs.parser
      parser.url = body.feed
      parser.parse((error, result) => {
        if (error) {
          bugfixes.error('Parser Error', 103, error)

          return callback(null, bugfunctions.lambdaError(103, {
            success: false,
            error: error
          }))
        }

        details.title = result.metadata.title
        details.lastUpdated = Date.now()

        details.add((error, result) => {
          if (error) {
            return callback(null, bugfunctions.lambdaError(104, {
              success: false,
              error: error
            }))
          }

          return callback(null, bugfunctions.lambdaResult(104, {
            success: true
          }))
        })
      })
    }
  })
}
