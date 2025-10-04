import https from 'https'

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
]

urls.forEach((url) => {
  const req = https.get(url, (res) => {
    console.log(`✅ Подключились к ${url}, статус: ${res.statusCode}`)
    
    // быстро закрываем соединение без чтения тела
    res.destroy()
  })

  req.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
      console.log(`⚡ Соединение закрыто преждевременно для ${url} (socket hang up)`)
    } else {
      console.error(`❌ Ошибка для ${url}:`, err.message)
    }
  })

  // Дополнительно можно форсировать сброс через 50ms
  setTimeout(() => {
    req.abort()
  }, 50)
})
