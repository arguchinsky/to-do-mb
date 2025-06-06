import { render, screen, fireEvent } from '@testing-library/react';
import { useAppState } from '../hooks/useAppState/useAppState.ts';
import { DATA_TEST_ID_START } from '../ui/AppListItem/constants';
import { DELETE_ICON_DATA_TEST_ID } from '../constants';
import App from '../App';

jest.mock('../hooks/useAppState/useAppState.ts', () => ({
  useAppState: jest.fn(),
}));

describe('App component', () => {
  const mockHandleAddValue = jest.fn();
  const mockHandleCompleteItem = jest.fn();
  const mockHandleOnTabChange = jest.fn();
  const mockHandleClearList = jest.fn();

  const defaultState = {
    tab: 'all',
    preparedList: [
      { id: 1, checked: false, value: 'Task 1' },
      { id: 2, checked: true, value: 'Task 2' },
    ],
    counters: { all: 2, active: 1, done: 1 },
    handleAddValue: mockHandleAddValue,
    handleCompleteItem: mockHandleCompleteItem,
    handleOnTabChange: mockHandleOnTabChange,
    handleClearList: mockHandleClearList,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppState as jest.Mock).mockReturnValue(defaultState);
  });

  it('render the header and a static text', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ToDos');
    expect(screen.getByText('Test app for the Mindbox')).toBeInTheDocument();
  });

  it('render InputField', () => {
    render(<App />);
    expect(screen.getByTestId('app-input')).toBeInTheDocument();
  });

  it('render tabs with the correct active tab', () => {
    render(<App />);
    const allTab = screen.getByRole('tab', { name: /all/i });
    const activeTab = screen.getByRole('tab', { name: /active/i });
    const doneTab = screen.getByRole('tab', { name: /done/i });

    expect(allTab).toHaveAttribute('aria-selected', 'true');
    expect(activeTab).toHaveAttribute('aria-selected', 'false');
    expect(doneTab).toHaveAttribute('aria-selected', 'false');
  });

  it("render list of tasks and call onChange by clicking on a task's item", () => {
    render(<App />);
    expect(
      screen.getByTestId(`${DATA_TEST_ID_START}${defaultState.preparedList[0].id}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${DATA_TEST_ID_START}${defaultState.preparedList[1].id}`),
    ).toBeInTheDocument();

    const task1 = screen.getByTestId(`${DATA_TEST_ID_START}${defaultState.preparedList[0].id}`);
    fireEvent.click(task1);

    expect(mockHandleCompleteItem).toHaveBeenCalledWith(1);
  });

  it('show "No items", if the list is empty', () => {
    (useAppState as jest.Mock).mockReturnValue({
      ...defaultState,
      preparedList: [],
      counters: { all: 0, active: 0, done: 0 },
    });

    render(<App />);
    expect(screen.getByText('No items')).toBeInTheDocument();
  });

  it('show the correct counters', () => {
    render(<App />);
    expect(screen.getByText('All: 2 | Active: 1 | Done: 1')).toBeInTheDocument();
  });

  it('call handleOnTabChange if the tab has been changed', () => {
    render(<App />);
    const activeTab = screen.getByRole('tab', { name: 'Active' });
    fireEvent.click(activeTab);
    expect(mockHandleOnTabChange).toHaveBeenCalled();
  });

  it('render delete icon with correct test id', () => {
    render(<App />);
    const deleteIcon = screen.getByTestId(DELETE_ICON_DATA_TEST_ID);
    expect(deleteIcon).toBeInTheDocument();
  });

  it('call handleClearList when delete icon is clicked', () => {
    render(<App />);
    const deleteIcon = screen.getByTestId(DELETE_ICON_DATA_TEST_ID);
    fireEvent.click(deleteIcon);
    expect(mockHandleClearList).toHaveBeenCalled();
  });

  it('render list with correct styles when empty', () => {
    (useAppState as jest.Mock).mockReturnValue({
      ...defaultState,
      preparedList: [],
    });

    render(<App />);
    const list = screen.getByRole('list');
    expect(list).toHaveStyle('justify-content: center');
  });

  it('render list with correct styles when not empty', () => {
    render(<App />);
    const list = screen.getByRole('list');
    expect(list).toHaveStyle('justify-content: start');
  });

  it('render correct number of list items', () => {
    render(<App />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(defaultState.preparedList.length);
  });

  it('render AppListItem with correct props', () => {
    render(<App />);
    const firstItem = defaultState.preparedList[0];
    const itemElement = screen.getByText(firstItem.value);
    expect(itemElement).toBeInTheDocument();
  });
});
