function response(res, status, result = '') {
  let desc = ''

  switch (status) {
    case 200:
      desc = 'OK'
      break
    case 201:
      desc = 'Created'
      break
    case 204:
      desc = 'No Content'
      break
    case 400:
      desc = 'Bad Request'
      break
    case 401:
      desc = 'Unauthorized'
      break
    case 404:
      desc = 'Page Not Found'
      break
    case 500:
      desc = 'Internal Server Error'
      break
    case 501:
      desc = 'Bad Gateway'
      break
    case 304:
      desc = 'Not Modified'
      break
    default:
      desc = ''
  }
  let results = {
    status: status,
    description: desc,
  }

  if (status >= 500) {
    results.error = result
  } else if (status >= 400 || typeof result == 'string') {
    results.message = result
  } else if (Array.isArray(result)) {
    results.data = result
  } else {
    results = {
      ...results,
      ...result,
    }
  }

  res.status(status).json(results)
}

module.exports = response
