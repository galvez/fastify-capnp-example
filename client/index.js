import { Basic } from '../basic'
import { Message } from 'capnp-es'

document.getElementById('sendBtn')
  .addEventListener('click', async () => {

    const message = new Message()
    const obj = message.initRoot(Basic)
    obj.name = 'John Doe'
    obj.email = 'johndoe@acme.org'

    const res = await fetch('/decode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-capnp'
      },
      body: message.toArrayBuffer()
    })

    const data = await res.json()
    console.log('Name:', data.name)
    console.log('Email:', data.email)
  })
