const bugfixes = require('bugfixes')
const libs = require('chewedfeed')

const bugfunctions = bugfixes.functions

module.exports = (event, context, callback) => {
  let feed = event.feed
  if (bugfunctions.checkIfDefined(event.body)) {
    feed = JSON.parse(event.body)
  }

  const details = libs.details
  details.url = feed
  details.checkInCache((error, result) => {
    bugfixes.log('Details CacheCheck', error, result)

    if (error) {
      return callback(null, bugfunctions.lambdaError(100, {
        success: false,
        error: error
      }))
    }

    if (result.inCache === false) {
      const parser = libs.parser
      parser.url = feed
      parser.parse((error, result) => {
        bugfixes.log('Parser Parse', error, result)

        if (error) {
          return callback(null, bugfunctions.lambdaError(103, {
            success: false,
            error: error
          }))
        }

        details.title = result.metadata.title
        details.add((error, result) => {
          bugfixes.log('Details Add', error, result)

          if (error) {
            return callback(null, bugfunctions.lambdaError(104, {
              success: false,
              error: error
            }))
          }

          return callback(null, bugfunctions.lambdaResult(105, {
            success: true
          }))
        })
      })
    } else {
      return callback(null, bugfunctions.lambdaResult(106, {
        success: false
      }))
    }
  })
}
