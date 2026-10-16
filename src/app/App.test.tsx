import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';

// jsdom has no WebGL. The real canvas is checked in the browser smoke test.
vi.mock('../components', () => ({ WorldPreview: () => <canvas aria-label="3D preview" /> }));

describe('placeholder page', () => {
  it('shows the requested identity and an accessible 3D preview region', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Miniature Earth' })).toBeVisible();
    expect(screen.getByText('Build a world. Play with time.')).toBeVisible();
    expect(screen.getByRole('region', { name: /spinning rounded green box/i })).toContainElement(
      screen.getByLabelText('3D preview'),
    );
  });
});
