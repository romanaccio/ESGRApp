import { render, screen } from '@testing-library/react';
import App from '../App';

test('title', () => {
  render(<App />);
  const title = screen.getByText(/ESG Revolution/i);
  expect(title).toBeInTheDocument();
});
