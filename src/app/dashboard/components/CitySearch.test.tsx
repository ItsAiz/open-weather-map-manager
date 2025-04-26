import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react';
import CitySearch from './CitySearch';
import WeatherApi from '@/services/WeatherApi';
import { useNotification } from '@/context/NotificationContext';

jest.mock('@/services/WeatherApi');
jest.mock('@/context/NotificationContext');

describe('CitySearch component', () => {
  const mockOnSelectCity = jest.fn();
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNotification as jest.Mock).mockReturnValue({ showNotification: mockShowNotification });
  });

  /**
   * Test to verify that the CitySearch component renders the input field.
   * It ensures the input field with the label "Search City" is present in the document.
   */
  it('renders input field', async () => {
    await act(async () => {
      render(<CitySearch onSelectCity={mockOnSelectCity} />);
    });
    expect(screen.getByLabelText(/search city/i)).toBeInTheDocument();
  });

  /**
   * Test to verify that WeatherApi.searchCity is called on input change.
   * It mocks the API response and ensures that the correct API call is made when the user types into the input field.
   */
  it('calls WeatherApi.searchCity on input change', async () => {
    const mockResults = [
      {
        id: '1',
        name: 'Paris',
        country: 'FR',
        state: '',
        lat: 48.8566,
        lon: 2.3522,
        label: 'Paris, FR',
      },
    ];

    (WeatherApi.searchCity as jest.Mock).mockResolvedValue(mockResults);

    await act(async () => {
      render(<CitySearch onSelectCity={mockOnSelectCity} />);
    });

    const input = screen.getByLabelText(/search city/i);

    // Simulate user typing in the input field
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Paris' } });
    });

    // Wait for the API call to complete
    await waitFor(() => {
      expect(WeatherApi.searchCity).toHaveBeenCalledWith('Paris');
    });

    // Verify that the result appears in the screen
    expect(await screen.findByText(/Paris, FR/i)).toBeInTheDocument();
  });

  /**
   * Test to verify that when a user selects a city, the onSelectCity function is called with the selected city.
   * It mocks the API response, simulates user interaction with the dropdown, and ensures that onSelectCity is called correctly.
   */
  it('selects a city and calls onSelectCity', async () => {
    const mockResults = [
      {
        id: '2',
        name: 'London',
        country: 'UK',
        state: '',
        lat: 51.5074,
        lon: -0.1278,
        label: 'London, UK',
      },
    ];

    (WeatherApi.searchCity as jest.Mock).mockResolvedValue(mockResults);

    await act(async () => {
      render(<CitySearch onSelectCity={mockOnSelectCity} />);
    });

    const input = screen.getByLabelText(/search city/i);

    // Simulate user typing in the input field
    fireEvent.change(input, { target: { value: 'London' } });

    // Wait for the option to appear and select it
    const option = await screen.findByText(/London, UK/i);
    fireEvent.click(option);

    // Verify if the `onSelectCity` function was called with the selected city's name
    expect(mockOnSelectCity).toHaveBeenCalledWith('London');
  });

  /**
   * Test to verify that an error notification is shown if the WeatherApi call fails.
   * It mocks the API to reject with an error and checks if the error notification is displayed correctly.
   */
  it('shows error notification if API fails', async () => {
    (WeatherApi.searchCity as jest.Mock).mockRejectedValue(new Error('API Error'));

    await act(async () => {
      render(<CitySearch onSelectCity={mockOnSelectCity} />);
    });

    const input = screen.getByLabelText(/search city/i);

    // Simulate input change that will cause an API failure
    fireEvent.change(input, { target: { value: 'FailCity' } });

    // Wait for the error notification to appear
    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith('Error searching city', 'error');
    });
  });
});
