import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

describe('example', () => {
  it('should render', () => {
    const { getByText } = render(<div>hello</div>);
    expect(getByText('hello')).toBeInTheDocument();
  });
});
