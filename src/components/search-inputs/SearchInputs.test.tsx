import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from "vitest";
import SearchInputs from "./SearchInputs";
import { makeRandomStreetCrime } from '../../clients/policeApiClient/models/StreetCrime';
import { coordinateConversionService, policeApiService } from '../../IoC/serviceProvider';
import userEvent from '@testing-library/user-event';
import AppContextProvider from '../../IoC/AppContextProvider';

afterEach(cleanup)

describe('SearchInputs', () => {
  it('on initial render, the input fields are set with initial values', () => {
    render(<AppContextProvider><SearchInputs/></AppContextProvider>);

    const addressField = screen.getByTestId<HTMLInputElement>('address');

    expect(addressField.value).toBe('NW1 2RT');
  })

  it('when input fields change values, and search button clicked, then calls policeApiService with updated SearchParams', async () => {
    //Arrange
    render(<AppContextProvider><SearchInputs/></AppContextProvider>);
    const addressField = screen.getByTestId<HTMLInputElement>('address');
    const searchButton = screen.getByTestId<HTMLDivElement>('searchButton');

    const address = 'some address';

    const latLon = [Math.random(), Math.random()] as [number, number];
    const getLatLonFromAddressSpy = vi
      .spyOn(coordinateConversionService, 'getLatLonFromAddress')
      .mockReturnValue(Promise.resolve(latLon));

    const streetCrimes = [1, 2, 3].map(() => makeRandomStreetCrime());
    const getStreetCrimesAroundCoordinateSpy = vi
      .spyOn(policeApiService, 'getStreetCrimesAroundCoordinate')
      .mockReturnValue(Promise.resolve(streetCrimes));

    //Act
    await userEvent.clear(addressField);
    await userEvent.type(addressField, address);
    await act(async () => {
      await userEvent.click(searchButton);
    });

    const dates = [
      '2023-01', 
      '2023-02', 
      '2023-03', 
      '2023-04', 
      '2023-05', 
      '2023-06', 
      '2023-07'
    ];

    //Assert
    expect(getLatLonFromAddressSpy).toHaveBeenCalledWith(address);
    expect(getStreetCrimesAroundCoordinateSpy).toHaveBeenCalledWith(latLon, 1000, dates);
  })
})