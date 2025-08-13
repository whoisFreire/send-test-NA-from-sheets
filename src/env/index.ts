import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    ROUTER_KEY: z.string(),
    ROUTER_KEY_TEST: z.string(),
    BOT_KEY: z.string(),
    BOT_KEY_TEST: z.string(),
    BOT_SLUG: z.string(),
    BOT_SLUG_TEST: z.string(),
    NAMESPACE_TEST: z.string(),
    NAMESPACE: z.string(),
    STATE_ID_TEST: z.string(),
    STATE_ID: z.string(),
    FLOW_ID_TEST: z.string(),
    FLOW_ID: z.string(),
    URL_DISPARO: z.string(),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error('Invalid environment variable', z.treeifyError(_env.error))
    throw new Error()
}

export const env = _env.data
