import './App.css'
import Routes from './Routes'
import { useRoutes } from "react-router-dom";

function App() {
  const routing = useRoutes(Routes)

  return (
    <>
      {routing}
    </>
  )
}

export default App
