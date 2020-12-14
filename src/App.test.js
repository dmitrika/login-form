import { render, fireEvent, waitFor } from '@testing-library/react';

import App from './app';

test('renders login form and welcome screen', async () => {
  const API = {
    login: () => Promise.resolve()
  }
  const { getByLabelText, getByText } = render(<App API={API} />);

  fireEvent.change(getByLabelText('Email'), { target: { value: 'rybin@hey.com' } })
  fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } })

  fireEvent.click(getByText('Log in'));
  expect(getByText('Loading...')).toHaveAttribute('disabled')

  expect(getByText('Loading...')).toBeInTheDocument()

  await waitFor(() => {
    expect(getByText('Welcome to your space')).toBeInTheDocument()
  })
});

test('renders error for wrong email and removes it on focus', async () => {
  const API = {
    login: () => Promise.reject({ email: 'Email is not found' })
  }
  const { getByLabelText, getByText, queryByText } = render(<App API={API} />);

  fireEvent.change(getByLabelText('Email'), { target: { value: 'example@hey.com' } })
  fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } })

  fireEvent.click(getByText('Log in'));
  expect(getByText('Loading...')).toHaveAttribute('disabled')

  expect(getByText('Loading...')).toBeInTheDocument()

  await waitFor(() => {
    expect(getByText('Email is not found')).toBeInTheDocument()
  })

  fireEvent.focus(getByLabelText('Email'))

  expect(queryByText('Email is not found')).not.toBeInTheDocument()
});

test('renders error for wrong password and removes it on focus', async () => {
  const API = {
    login: () => Promise.reject({ password: 'Password is not correct' })
  }
  const { getByLabelText, getByText, queryByText } = render(<App API={API} />);

  fireEvent.change(getByLabelText('Email'), { target: { value: 'rybin@hey.com' } })
  fireEvent.change(getByLabelText('Password'), { target: { value: '12345' } })

  fireEvent.click(getByText('Log in'));
  expect(getByText('Loading...')).toHaveAttribute('disabled')

  expect(getByText('Loading...')).toBeInTheDocument()

  await waitFor(() => {
    expect(getByText('Password is not correct')).toBeInTheDocument()
  })

  fireEvent.focus(getByLabelText('Password'))

  expect(queryByText('Password is not correct')).not.toBeInTheDocument()
});

test('renders form error and removes it when start typing again', async () => {
  const API = {
    login: () => Promise.reject({ formError: 'Failed to log in, please try again' })
  }
  const { getByLabelText, getByText } = render(<App API={API} />);

  fireEvent.change(getByLabelText('Email'), { target: { value: 'rybin@hey.com' } })
  fireEvent.change(getByLabelText('Password'), { target: { value: '12345' } })

  fireEvent.click(getByText('Log in'));

  expect(getByText('Loading...')).toHaveAttribute('disabled')
  expect(getByText('Loading...')).toBeInTheDocument()

  await waitFor(() => {
    expect(getByText('Failed to log in, please try again')).toBeInTheDocument()
  })

  expect(getByText('Log in')).not.toHaveAttribute('disabled')
});
