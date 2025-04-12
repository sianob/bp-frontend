/// <reference types="vitest" />

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, vi, afterEach, beforeEach, test } from 'vitest';
import App from './App';
import '@testing-library/jest-dom';


// Mock fetch globally

beforeEach(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('valid input triggers API call and displays result', async () => {
  // Mock the first API call to /getbpcategory
  globalThis.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ category: 'Ideal' }),
    })
    // Mock the second API call to /getTip
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ tip: 'Maintain a healthy diet.' }),
    });

  // Render the App component
  render(<App />);

  // Simulate user input for systolic and diastolic values
  fireEvent.change(screen.getByLabelText(/Systolic/i), { target: { value: '110' } });
  fireEvent.change(screen.getByLabelText(/Diastolic/i), { target: { value: '70' } });

  // Simulate clicking the Submit button
  fireEvent.click(screen.getByText(/Submit/i));

  // Wait for the result to appear in the DOM
  await waitFor(() => {
    expect(screen.getByText(/Result: Ideal/i)).toBeInTheDocument();
    expect(screen.getByText(/Tip: Maintain a healthy diet./i)).toBeInTheDocument();
  });

  // Verify that fetch was called with the correct arguments
  expect(globalThis.fetch).toHaveBeenCalledWith(
    "http://localhost:8000/getbpcategory",
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ systolic: 110, diastolic: 70 }),
    })
  );

  expect(globalThis.fetch).toHaveBeenCalledWith(
    "http://localhost:8000/getTip?category=Ideal",
    expect.objectContaining({
      method: 'GET',
    })
  );
});

test('systolic value below range prevents submission', async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Systolic/i), { target: { value: '60' } });
  fireEvent.change(screen.getByLabelText(/Diastolic/i), { target: { value: '70' } });
  fireEvent.click(screen.getByText(/Submit/i));
  expect(globalThis.fetch).not.toHaveBeenCalled();
});

test('diastolic value above range prevents submission', async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Systolic/i), { target: { value: '120' } });
  fireEvent.change(screen.getByLabelText(/Diastolic/i), { target: { value: '110' } });
  fireEvent.click(screen.getByText(/Submit/i));

  expect(globalThis.fetch).not.toHaveBeenCalled();
});

test('empty inputs prevent submission', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Submit/i));

  expect(globalThis.fetch).not.toHaveBeenCalled();
});

test('API error shows fallback message', async () => {
  globalThis.fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: 'Server Error' }),
  });

  render(<App />);

  fireEvent.change(screen.getByLabelText(/Systolic/i), { target: { value: '120' } });
  fireEvent.change(screen.getByLabelText(/Diastolic/i), { target: { value: '80' } });
  fireEvent.click(screen.getByText(/Submit/i));

  await waitFor(() => {
    expect(screen.getByText(/Server Error/i)).toBeInTheDocument();
  });
});
