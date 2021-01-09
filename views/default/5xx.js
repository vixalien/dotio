export default ({ message, name, stack }) => {
  return <main>
    <h1>500: Internal Server Error</h1>
    <p>Looks like something blew up!</p>
    <pre>{stack}</pre>
  </main>
}
