import { render, screen } from '@testing-library/react';
import Box from '../Box';

test('title', () => {
  render(<Box title='test title' />);
  const title = screen.getByText(/test title/i);
  expect(title).toBeInTheDocument();
});
