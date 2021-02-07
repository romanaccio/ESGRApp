import { render, screen } from '@testing-library/react';
import Survey from '../Survey';

test('title', () => {
  render(<Survey />);
  const title = screen.getByText(/ESG Revolution/i);
  expect(title).toBeInTheDocument();
});
