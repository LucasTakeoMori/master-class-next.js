// src/env.mjs
import { z } from "zod";
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },

  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});