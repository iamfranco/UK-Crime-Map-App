import './App.css'
import { PoliceApiClient } from './clients/policeApiClient/policeApiClient';
import { Coordinate } from './models/Coordinate';
import { CoordinateConversionService } from './services/coordinateConversionService/coordinateConversionService';
import { PoliceApiService } from './services/policeApiService/policeApiService';

function App() {
  const policeApiClient = new PoliceApiClient();
  const coordinateConversionService = new CoordinateConversionService();
  const policeApiService = new PoliceApiService(policeApiClient, coordinateConversionService);

  const handleClick = async () => {
    const coordinate: Coordinate = {lat: 53.483959, lon: -2.244644};
    const squareLengthMetres = 1000;
    const date = '2023-01';
    const result = await policeApiService.getStreetCrimesAroundCoordinate(coordinate, squareLengthMetres, date);
    console.log(result);
  }

  return (
    <>
      <button onClick={handleClick}>Get Street Crimes</button>
    </>
  )
}

export default App
