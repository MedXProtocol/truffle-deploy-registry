module.exports = function (networkId) {
  return (networkId || '').endsWith('-fork')
}
