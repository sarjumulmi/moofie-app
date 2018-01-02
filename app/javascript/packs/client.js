export function isLoggedIn () {
  return true
}

export function handleError (response) {
  if (!response.ok) {
    throw response
  }
  return response.json()
}

export function setErrors (errMsg) {
  const errors = {}
  const messages = errMsg.errors.messages
  for (var key in messages) {
    if (messages.hasOwnProperty(key)) {
      errors[key] = messages[key] ? `${key} ${messages[key].join(' ')}` : undefined
    }
  }
  return errors
}

export function formatErrorMessages (errors) {
  const errorMessage = Object.values(errors).map(msg => msg).join('. ')
  return errorMessage
}
