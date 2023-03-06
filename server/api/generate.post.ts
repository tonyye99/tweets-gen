import requestIp from "request-ip";
import { Ratelimit } from "@upstash/ratelimit";
import redis from "~/utils/redis";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(15, "1 m"),
  analytics: true,
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const identifier = requestIp.getClientIp(event.node.req);
  const { success } = await ratelimit.limit(identifier!);

  if (!success) {
    return {
      status: 429,
      content: "Too many requests",
    }
  }

  const body = await readBody(event);
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      max_tokens: 1024,
      temperature: 0.4,
      messages: body,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.openaiApiKey}`,
    },
  })

  if (response.ok) {
    const { choices } = await response.json();
    return {
      status: 200,
      content: choices[0].message?.content,
    };
  } else {
    return {
      status: response.status,
      content: await response.text(),
    };
  }
});
