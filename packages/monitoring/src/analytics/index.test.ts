import Analytics from "."

global.gtag = jest.fn()

const mockedGtag = gtag as jest.Mock<typeof gtag>

describe("analytics works correctly", () => {
  it("actially calls gtag", () => {
    const analytics = new Analytics()
    analytics.event("eventName", {eventOpt: true})

    expect(mockedGtag.mock.calls[0]).toEqual(["event", "eventName", {eventOpt: true}])
  })
})
