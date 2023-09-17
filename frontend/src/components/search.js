import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
const Search = ({ cities, onSearch }) => {
  const [searchValue, setSearchValue] = useState(null);


  const onChangeHandler = (selectedOption) => {
    setSearchValue(selectedOption);
    if (selectedOption) {
      onSearch(selectedOption.value);
    } else {
      onSearch('');
    }
  };

  // ...

  const loadOptions = (inputValue, loadedOptions) => {
    // Filter distinct cities based on input value
    const filteredOptions = [...new Set(cities)]
      .filter((city) => city.toLowerCase().includes(inputValue.toLowerCase()));


    const options = filteredOptions.map((city) => ({
      value: city,
      label: city,
    }));

    // Return paginated options
    return {
      options: options.slice(loadedOptions, loadedOptions + 10),
      hasMore: options.length > loadedOptions + 10,
    };
  };

  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
