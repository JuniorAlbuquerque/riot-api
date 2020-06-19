const getDate = () => {
  var n = new Date()
  var y = n.getFullYear()
  var m = n.getMonth() + 1
  var d = n.getDate()
  var m = checkNumber(m)
  var d = checkNumber(d)
  var date = d + '/' + m + '/' + y + ' '
  return date
}

const formatDate = (data, formato) => {
  if (formato === 'pt-br') {
    return data.substr(0, 10).split('-').reverse().join('/')
  } else {
    return data.substr(0, 10).split('/').reverse().join('-')
  }
}

function checkNumber(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

module.exports = { getDate, formatDate }
