import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from "vitest";
import App from './App';
import { userEvent } from '@testing-library/user-event'
import { policeApiService } from './IoC/serviceProvider';
import { makeRandomStreetCrime } from './clients/policeApiClient/models/StreetCrime';

afterEach(cleanup)

describe('App', () => {
  it('on initial render, the input fields are set with initial values', () => {
    render(<App/>);

    const addressField = screen.getByTestId<HTMLInputElement>('address');

    expect(addressField.value).toBe('53.483959, -2.244644');
  })

  it('when input fields change values, and search button clicked, then calls policeApiService with updated SearchParams', async () => {
    //Arrange
    render(<App/>);
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
    expect(getStreetCrimesAroundCoordinateSpy).toHaveBeenCalledWith({lat: 0.01, lon: 0.02}, 1000, '2023-01')
  })
})