import { PoliceApiClient } from "../clients/policeApiClient/policeApiClient";
import { CoordinateConversionService } from "../services/coordinateConversionService/coordinateConversionService";
import { PoliceApiService } from "../services/policeApiService/policeApiService";

const policeApiClient = new PoliceApiClient();
const coordinateConversionService = new CoordinateConversionService();
export const policeApiService = new PoliceApiService(policeApiClient, coordinateConversionService);