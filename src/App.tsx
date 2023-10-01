import './App.css'
import 'leaflet/dist/leaflet.css';
import SearchInputs from './components/search-inputs/SearchInputs';
import MapViewer from './components/mapViewer/MapViewer';
import AppContextProvider from './IoC/AppContextProvider';

function App() {
  return (
    <AppContextProvider>
      <SearchInputs />

      <MapViewer />
    </AppContextProvider>
  )
}

export default App
