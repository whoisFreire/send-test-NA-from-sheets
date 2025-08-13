import { env } from "../env"

export const defineBotConfig = (environment) => {
    const bot = {
        "routerBotKey": environment === 'dev' ? env.ROUTER_KEY_TEST.split(' ')[1] : env.ROUTER_KEY.split(' ')[1],
        "botKey": environment === 'dev' ? env.BOT_KEY_TEST.split(' ')[1] : env.BOT_KEY.split(' ')[1],
        "botSlug": environment === 'dev' ? env.BOT_SLUG_TEST : env.BOT_SLUG,
        "namespace": environment === 'dev' ? env.NAMESPACE_TEST : env.NAMESPACE,
        "stateId": environment === 'dev' ? env.STATE_ID_TEST : env.STATE_ID,
        "flowId": environment === 'dev' ? env.FLOW_ID_TEST : env.FLOW_ID,
    }

    return bot
}
