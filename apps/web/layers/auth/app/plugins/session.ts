// Runs on the server and in the browser, so a reload keeps the user signed in.
export default defineNuxtPlugin(() => {
  useAuth().restore()
})
