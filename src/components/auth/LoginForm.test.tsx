import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LoginForm } from '@/components/auth/LoginForm'
import { renderWithProviders } from '@/test/renderWithProviders'

beforeEach(() => {
  window.localStorage.setItem('locale', 'en')
})

describe('LoginForm', () => {
  it('shows required validation for empty email and password', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<LoginForm loading={false} onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    const requiredErrors = await screen.findAllByText('This field is required.')
    expect(requiredErrors).toHaveLength(2)
    expect(onSubmit).not.toHaveBeenCalled()

    expect(screen.getByLabelText('Email address')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Password')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows invalid-email validation and associates email input with its error message', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<LoginForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Email address'), 'not-an-email')
    await user.type(screen.getByLabelText('Password'), 'secret-pass')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()

    const emailInput = screen.getByLabelText('Email address')
    expect(emailInput).toHaveAttribute('aria-describedby', 'auth-login-email-error')
  })

  it('submits valid values, trims email, and keeps password unchanged', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<LoginForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Email address'), '  customer@example.com  ')
    await user.type(screen.getByLabelText('Password'), '  top-secret  ')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'customer@example.com',
      password: '  top-secret  ',
    })
    expect(screen.queryByText('This field is required.')).not.toBeInTheDocument()
    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument()
  })

  it('disables submit and shows loading label while loading, and prevents submit calls', () => {
    const onSubmit = vi.fn()

    renderWithProviders(<LoginForm loading={true} onSubmit={onSubmit} />)

    const submitButton = screen.getByRole('button', { name: 'Loading' })
    expect(submitButton).toBeDisabled()

    const form = submitButton.closest('form')
    expect(form).not.toBeNull()

    if (form) {
      fireEvent.submit(form)
    }

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('renders external authentication error separately from field validation errors', () => {
    const onSubmit = vi.fn()

    renderWithProviders(<LoginForm loading={false} onSubmit={onSubmit} error="Sign in failed. Please try again." />)

    const externalError = screen.getByText('Sign in failed. Please try again.')
    expect(externalError).toBeInTheDocument()
    expect(externalError.tagName).toBe('P')
    expect(screen.queryByText('This field is required.')).not.toBeInTheDocument()
    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument()
  })
})
