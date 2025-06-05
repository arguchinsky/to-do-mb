import { render, screen, fireEvent, within } from '@testing-library/react';
import { InputField } from '../InputField';

describe('InputField', () => {
  test('the component exist', () => {
    render(<InputField addValue={jest.fn()} />);
    const input = screen.getByTestId('app-input');
    expect(input).toBeInTheDocument();
  });

  test('update value', () => {
    render(<InputField addValue={jest.fn()} />);
    const input = within(screen.getByTestId('app-input') as HTMLDivElement).getByLabelText(
      'Add another task',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test value' } });
    expect(input.value).toBe('test value');
  });

  test('call addValue byt the Enter button pressing', () => {
    const addValueMock = jest.fn();
    render(<InputField addValue={addValueMock} />);
    const input = within(screen.getByTestId('app-input') as HTMLDivElement).getByLabelText(
      'Add another task',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(addValueMock).toHaveBeenCalledWith('new task');
    expect(input.value).toBe('');
  });

  test("doesn't call the addValue if there isn't value", () => {
    const addValueMock = jest.fn();
    render(<InputField addValue={addValueMock} />);
    const input = screen.getByTestId('app-input') as HTMLInputElement;

    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(addValueMock).not.toHaveBeenCalled();
  });
});
