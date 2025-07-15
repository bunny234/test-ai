import { render, screen } from '@testing-library/react';
import App from './App';

test('renders trading strategy configuration heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/trading strategy configuration/i);
  expect(headingElement).toBeInTheDocument();
});
