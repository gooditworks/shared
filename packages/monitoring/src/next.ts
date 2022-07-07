import * as Sentry from "@sentry/nextjs"

type NextApiHandler = Parameters<typeof Sentry.withSentry>[0]

const withSentryFlush = (handler: NextApiHandler): NextApiHandler => {
  const wrappedHandler = Sentry.withSentry(handler)

  return async (request, response) => {
    const returns = await wrappedHandler(request, response)

    // we need do it manually in Vercel
    // https://github.com/vercel/next.js/blob/canary/examples/with-sentry/pages/api/test4.js#L10-L12
    await Sentry.flush(2500)

    return returns
  }
}

export {default, withSentryConfig} from "@sentry/nextjs"
export {withSentryFlush as withSentry, Sentry}
