import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from "vitest";
import SearchInputs from "./SearchInputs";
import { makeRandomStreetCrime } from '../../clients/policeApiClient/models/StreetCrime';
import { policeApiService } from '../../IoC/serviceProvider';
import userEvent from '@testing-library/user-event';
import AppContextProvider from '../../IoC/AppContextProvider';

afterEach(cleanup)

describe('SearchInputs', () => {
  it('on initial render, the input fields are set with initial values', () => {
    render(<AppContextProvider><SearchInputs/></AppContextProvider>);

    const addressField = screen.getByTestId<HTMLInputElement>('address');

    expect(addressField.value).toBe('53.483959, -2.244644');
  })

  it('when input fields change values, and search button clicked, then calls policeApiService with updated SearchParams', async () => {
    //Arrange
    render(<AppContextProvider><SearchInputs/></AppContextProvider>);
    const addressField = screen.getByTestId<HTMLInputElement>('address');
    const searchButton = screen.getByTestId<HTMLDivElement>('searchButton');

    const streetCrimes = [1, 2, 3].map(() => makeRandomStreetCrime());
    const getStreetCrimesAroundCoordinateSpy = vi.spyOn(policeApiService, 'getStreetCrimesAroundCoordinate');
    getStreetCrimesAroundCoordinateSpy.mockReturnValue(Promise.resolve(streetCrimes));

    //Act
    await userEvent.clear(addressField);
    await userEvent.type(addressField, '0.01, 0.02');

    await userEvent.click(searchButton);

    //Assert
    expect(getStreetCrimesAroundCoordinateSpy).toHaveBeenCalledWith([0.01, 0.02], 1000, '2023-04')
  })
})