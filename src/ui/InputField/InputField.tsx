import { type ChangeEvent, type FC, useState, memo, type KeyboardEvent } from 'react';
import { TextField } from '@mui/material';
import { INPUT_DATA_TEST_ID, INPUT_LABEL } from './constants';
import type { TInputField } from './types';

export const InputField: FC<TInputField> = memo(({ addValue }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key === 'Enter' && inputValue) {
      addValue(inputValue);
      setInputValue('');
    }
  };

  return (
    <TextField
      data-test-id={INPUT_DATA_TEST_ID}
      value={inputValue}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      type='text'
      label={INPUT_LABEL}
    />
  );
});
