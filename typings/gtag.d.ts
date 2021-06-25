type Gtag = import("@types/gtag.js").Gtag

declare module "ga-gtag" {
  const install = (measurementId: string) => {}

  type GtagOptions = Record<string, unknown>

  export {install, GtagOptions}
  export default Gtag
}
