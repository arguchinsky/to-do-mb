import { type ChangeEvent, type FC, useState, memo, type KeyboardEventHandler } from 'react';
import { TextField } from '@mui/material';
import type { TInputField } from './types';

export const InputField: FC<TInputField> = memo(({ addValue }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  const handleKeyUp = (event: KeyboardEventHandler<HTMLDivElement> | undefined) => {
    if (event?.key === 'Enter' && inputValue) {
      addValue(inputValue);
      setInputValue('');
    }
  };

  return (
    <TextField
      value={inputValue}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      type='text'
      label='Add another task'
    />
  );
});
