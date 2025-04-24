import { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import WeatherApi from '@/services/WeatherApi';
import { CitySuggestion } from '@/types/weather';

const CitySearch = ({ onSelectCity }: { onSelectCity: (city: string) => void }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<CitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<CitySuggestion>({
    id: '',
    name: '',
    country: '',
    state: '',
    lat: 0,
    lon: 0,
    label: '',
  });

  useEffect(() => {
    if (inputValue.trim()) {
      setLoading(true);
      WeatherApi.searchCity(inputValue)
        .then(setOptions)
        .catch(() => setOptions([]))
        .finally(() => setLoading(false));
    }
  }, [inputValue]);

  return (
    <Autocomplete
      disableClearable
      loading={loading}
      options={options}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) =>
        option.lat === value.lat && option.lon === value.lon
      }
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue) onSelectCity(newValue.name);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'Buscar ciudad...'}
          variant={'outlined'}
          fullWidth
          InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color={'inherit'} size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
          }} />
      )} />
  );
};

export default CitySearch;
