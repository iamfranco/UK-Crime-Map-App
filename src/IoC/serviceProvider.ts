import { NominatimApiClient } from "../clients/nominatimApiClient/nominatimApiClient";
import { PoliceApiClient } from "../clients/policeApiClient/policeApiClient";
import { CircleGroupUtils } from "../components/mapViewer/scripts/circleGroupUtils";
import { CoordinateConversionService } from "../services/coordinateConversionService/coordinateConversionService";
import { PoliceApiService } from "../services/policeApiService/policeApiService";

export const policeApiClient = new PoliceApiClient();
export const nominatimApiClient = new NominatimApiClient();
export const coordinateConversionService = new CoordinateConversionService(nominatimApiClient);
export const policeApiService = new PoliceApiService(policeApiClient, coordinateConversionService);
export const circleGroupUtils = new CircleGroupUtils();