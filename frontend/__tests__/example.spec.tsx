import { render } from '@testing-library/react';
import React from 'react';

describe('example', () => {
  it('should render', () => {
    const { getByText } = render(<div>hello</div>);
    expect(getByText('hello')).toBeInTheDocument();
  });
});
