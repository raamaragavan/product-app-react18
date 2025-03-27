import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

test('renders App component correctly', () => {
  render( <Provider store={store}><App /> </Provider>);
  const element = screen.getByText('Shopify');
  expect(element).toBeInTheDocument();
});

