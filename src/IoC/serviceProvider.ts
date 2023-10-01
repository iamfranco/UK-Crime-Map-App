import { PoliceApiClient } from "../clients/policeApiClient/policeApiClient";
import { CircleGroupUtils } from "../components/mapViewer/scripts/circleGroupUtils";
import { CoordinateConversionService } from "../services/coordinateConversionService/coordinateConversionService";
import { PoliceApiService } from "../services/policeApiService/policeApiService";

const policeApiClient = new PoliceApiClient();
export const coordinateConversionService = new CoordinateConversionService();
export const policeApiService = new PoliceApiService(policeApiClient, coordinateConversionService);
export const circleGroupUtils = new CircleGroupUtils();