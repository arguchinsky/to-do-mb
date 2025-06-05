import { render, fireEvent, screen } from '@testing-library/react';
import { AppListItem } from '../AppListItem';
import { DATA_TEST_ID_START } from '../constants';

const defaultProps = {
  id: 1,
  checked: false,
  value: 'Test item',
  onChange: jest.fn(),
};

describe('AppListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('the component exist', () => {
    render(<AppListItem {...defaultProps} />);
    expect(screen.getByTestId(`${DATA_TEST_ID_START}${defaultProps.id}`)).toBeInTheDocument();
  });

  it("the checkbox isn't checked by default", () => {
    const { getByRole } = render(<AppListItem {...defaultProps} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("select the checkbox and call onChange callback by item's clicking", () => {
    const { getByRole } = render(<AppListItem {...defaultProps} />);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(defaultProps.onChange).toHaveBeenCalledWith(1);

    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  it('set the element non-active if the checkbox set', () => {
    const { getByRole, getByText } = render(<AppListItem {...defaultProps} />);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(getByText('Test item').parentElement).toHaveStyle('pointer-events: none');
  });

  it('render the item as selected if the property "checked" === true', () => {
    const { getByRole } = render(<AppListItem {...defaultProps} checked={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
