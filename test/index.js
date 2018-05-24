/* global it, describe */
require('dotenv').config()
const bugfixes = require('bugfixes')

const expect = require('chai').expect

const underTest = require('../src/index')

const payLoad = {
  "resource": "/login",
  "path": "/v1/login",
  "httpMethod": "POST",
  "headers": {
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "GB",
    "Content-Type": "application/json; charset=utf-8",
    "Host": "account.bugfix.es",
    "User-Agent": "Paw/3.1.5 (Macintosh; OS X/10.13.4) GCDHTTPRequest",
    "Via": "1.1 823355654d69efaf19d467269c43b83a.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "vdr-ndAQGr6glTbrjgFPP67dH7YJ4F5EZW-YwM_cFIOAKNF-aTeXkQ==",
    "X-Amzn-Trace-Id": "Root=1-5acb82f6-58d4bf48609b48804f96551c",
    "X-API-KEY": "FqeFIjvhgi3etnvwWmpsj64SRNmf11rM99Ve369R",
    "X-Forwarded-For": "37.157.242.120, 54.240.156.47",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  "queryStringParameters": null,
  "pathParameters": null,
  "stageVariables": null,
  "requestContext": {
    "resourceId": "db8q1j",
    "resourcePath": "/login",
    "httpMethod": "POST",
    "extendedRequestId": "FFFmjH7YrPEFt_g=",
    "requestTime": "09/Apr/2018:15:12:54 +0000",
    "path": "/v1/account",
    "accountId": "369633732598",
    "protocol": "HTTP/1.1",
    "stage": "Live_v1",
    "requestTimeEpoch": 1523286774745,
    "requestId": "7a7ff09f-3c08-11e8-957a-a3725751a011",
    "identity": {
      "cognitoIdentityPoolId": null,
      "cognitoIdentityId": null,
      "apiKey": "FqeFIjvhgi3etnvwWmpsj64SRNmf11rM99Ve369R",
      "cognitoAuthenticationType": null,
      "userArn": null,
      "apiKeyId": "jtiqpzjpl0",
      "userAgent": "Paw/3.1.5 (Macintosh; OS X/10.13.4) GCDHTTPRequest",
      "accountId": null,
      "caller": null,
      "sourceIp": "37.157.242.120",
      "accessKey": null,
      "cognitoAuthenticationProvider": null,
      "user": null
    },
    "apiId": "437o1c2113"
  },
  "body": null,
  "isBase64Encoded": false
}

describe('Feed Parser', () => {
  it('it should parse the feed from the url', (done) => {
    payLoad.body = "{\"feed\":\"http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/front_page/rss.xml\"}"
    //payLoad.body = "{\"feed\":\"http://www.guardian.co.uk/world/usa/rss\"}"

    underTest(payLoad, console, (error, result) => {
      if (error) {
        done(Error(error))
      }

      expect(result).to.be.an('object')
      expect(result).to.have.property('body')

      let resultObj = JSON.parse(result.body)
      expect(resultObj).to.have.property('message')
      expect(resultObj.message).to.have.property('success')
      expect(resultObj.message.success).to.be.equal(true)

      done()
    })
  })
})