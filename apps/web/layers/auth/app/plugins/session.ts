/**
 * Fills the session store from the cookie when the app starts, on the server and in
 * the browser, so a reload keeps the user signed in (S3, ADR 0069).
 */
export default defineNuxtPlugin(() => {
  useAuth().restore()
})
