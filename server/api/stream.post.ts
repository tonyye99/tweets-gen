import https from 'https'
import { getClientIp } from 'request-ip'
import { Ratelimit } from '@upstash/ratelimit'
import redis from '~/utils/redis'

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, '1 m'),
  analytics: true
})

const randomTemperature = () => {
  const min = 0.1
  const max = 0.5
  return Math.random() * (max - min) + min
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const identifier = getClientIp(event.node.req)
  const { success } = await ratelimit.limit(identifier!)

  event.node.res.setHeader('Content-Type', 'text/event-stream')
  event.node.res.setHeader('Cache-Control', 'no-cache')
  event.node.res.setHeader('Connection', 'keep-alive')

  if (!success) {
    event.node.res.statusCode = 429
    event.node.res.write('TOO_MANY_REQUEST')
    event.node.res.end()
    return
  }
  const payload = await readBody(event)

  const req = https.request({
    hostname: 'api.openai.com',
    port: 443,
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openaiApiKey}`
    }
  }, function (res: any) {
    if (res.statusCode !== 200) {
      event.node.res.statusCode = res.statusCode
      event.node.res.write(res.statusMessage)
      event.node.res.end()
      return
    }
    res.on('data', (chunk: any) => {
      event.node.res.write(chunk)
    })
    res.on('end', () => {
      console.log('No more data in response.')
      event.node.res.end()
    })
    res.on('error', (e: any) => {
      console.log('problem with request:' + e.message)
      event.node.res.statusCode = 500
      event.node.res.write(e.message)
    })
  })

  const body = JSON.stringify({
    model: 'gpt-3.5-turbo',
    max_tokens: 500,
    temperature: randomTemperature(),
    messages: payload,
    stream: true
  })

  req.write(body)

  req.on('error', (e: any) => {
    console.log('problem with request:' + e.message)
    event.node.res.statusCode = 500
  })

  req.end()

  await new Promise((resolve) => {
    event.node.res.on('finish', resolve)
  })
})
