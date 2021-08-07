/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

it('Should create an item', () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  const addItemButton = getByText('+');
  const textInput = getByPlaceholderText('Write something');

  const createdItemText = 'first todo';

  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addItemButton);

  const createdItem = getByText(createdItemText);

  expect(createdItem).not.toBeNull();
});

it('Should create multiple items', () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  const addItemButton = getByText('+');
  const textInput = getByPlaceholderText('Write something');

  const createdItemText = 'first todo';
  const createdItemText2 = 'second todo';
  const createdItemText3 = 'third todo';

  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addItemButton);
  fireEvent.changeText(textInput, createdItemText2);
  fireEvent.press(addItemButton);
  fireEvent.changeText(textInput, createdItemText3);
  fireEvent.press(addItemButton);

  const createdItem = getByText(createdItemText);
  expect(createdItem).not.toBeNull();

  const createdItem2 = getByText(createdItemText2);
  expect(createdItem2).not.toBeNull();

  const createdItem3 = getByText(createdItemText3);
  expect(createdItem3).not.toBeNull();
});

it('Should delete an item', async () => {
  const { getByText, getByPlaceholderText, queryByText } = render(<App />);

  const addItemButton = getByText('+');
  const textInput = getByPlaceholderText('Write something');

  const createItemText = 'first todo';

  fireEvent.changeText(textInput, createItemText);
  fireEvent.press(addItemButton);

  // my solution works
  // await waitFor(() => {
  //   const deleteButton = getByText('X');
  //   expect(deleteButton).not.toBeNull();
  //   fireEvent.press(deleteButton);
  // });

  // const createdItem = queryByText(createItemText);
  // expect(createdItem).toBeNull();

  const deleteButton = queryByText('X');
  fireEvent.press(deleteButton);

  const deletedItem = queryByText(createItemText);
  expect(deletedItem).toBeNull();
});

it('An error message should appear', () => {
  const { queryByText, getByText } = render(<App />);

  const addButton = queryByText('+');
  fireEvent.press(addButton);
  const errorText = queryByText('Please insert a valid text');
  expect(errorText).not.toBeNull();
});

it('should make error message disappear', () => {
  const { queryByText, getByText, queryByPlaceholderText } = render(<App />);

  const addButton = queryByText('+');
  fireEvent.press(addButton);

  const textInput = queryByPlaceholderText('Write something');
  fireEvent.changeText(textInput, 'first todo');
  fireEvent.press(addButton);

  const errorText = queryByText('Please insert a valid text');
  expect(errorText).toBeNull();
});
