import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { renderWithProviders } from '@/test/renderWithProviders'

beforeEach(() => {
  window.localStorage.setItem('locale', 'en')
})

describe('ForgotPasswordForm', () => {
  it('shows required email validation on empty submit', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<ForgotPasswordForm loading={false} onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Forgot password?' }))

    expect(await screen.findByText('This field is required.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()

    const emailInput = screen.getByLabelText('Email address')
    expect(emailInput).toHaveAttribute('aria-invalid', 'true')
    expect(emailInput).toHaveAttribute('aria-describedby', 'auth-forgot-email-error')
  })

  it('shows invalid email validation for malformed email', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<ForgotPasswordForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Email address'), 'not-an-email')
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }))

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Email address')).toHaveAttribute('aria-invalid', 'true')
  })

  it('submits trimmed valid email', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<ForgotPasswordForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Email address'), '  customer@example.com  ')
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith('customer@example.com')
    expect(screen.queryByText('This field is required.')).not.toBeInTheDocument()
    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument()
  })

  it('respects loading state and does not submit again', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<ForgotPasswordForm loading={true} onSubmit={onSubmit} />)

    const emailInput = screen.getByLabelText('Email address')
    await user.type(emailInput, 'customer@example.com')

    const submitButton = screen.getByRole('button', { name: 'Loading' })
    expect(submitButton).toBeDisabled()

    const form = submitButton.closest('form')
    expect(form).not.toBeNull()
    expect(form).toHaveAttribute('aria-busy', 'true')

    if (form) {
      fireEvent.submit(form)
    }

    expect(onSubmit).not.toHaveBeenCalled()
    expect(emailInput).toHaveValue('customer@example.com')
  })

  it('renders success message as non-urgent live region', () => {
    const onSubmit = vi.fn()

    renderWithProviders(
      <ForgotPasswordForm loading={false} onSubmit={onSubmit} successMessage="A mock reset link was sent to your email address." />,
    )

    const successMessage = screen.getByText('A mock reset link was sent to your email address.')
    expect(successMessage).toBeInTheDocument()
    expect(successMessage).toHaveAttribute('role', 'status')
    expect(successMessage).toHaveAttribute('aria-live', 'polite')
    expect(screen.getByLabelText('Email address')).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByText('This field is required.')).not.toBeInTheDocument()
  })

  it('renders external error as alert without linking to email input', () => {
    const onSubmit = vi.fn()

    renderWithProviders(
      <ForgotPasswordForm loading={false} onSubmit={onSubmit} error="Unable to process your request right now. Please try again." />,
    )

    const externalError = screen.getByText('Unable to process your request right now. Please try again.')
    expect(externalError).toBeInTheDocument()
    expect(externalError).toHaveAttribute('role', 'alert')

    const emailInput = screen.getByLabelText('Email address')
    expect(emailInput).not.toHaveAttribute('aria-invalid', 'true')
    expect(emailInput).not.toHaveAttribute('aria-describedby', 'auth-forgot-email-error')
  })

  it('keeps external error visible while still enforcing field validation', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(
      <ForgotPasswordForm loading={false} onSubmit={onSubmit} error="Unable to process your request right now. Please try again." />,
    )

    await user.click(screen.getByRole('button', { name: 'Forgot password?' }))

    expect(screen.getByText('Unable to process your request right now. Please try again.')).toBeInTheDocument()
    expect(await screen.findByText('This field is required.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Email address')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not call async callback repeatedly after rerendering into loading state', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()

    const { rerender } = renderWithProviders(<ForgotPasswordForm loading={false} onSubmit={onSubmit} />)

    const emailInput = screen.getByLabelText('Email address')
    await user.type(emailInput, 'customer@example.com')
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)

    rerender(<ForgotPasswordForm loading={true} onSubmit={onSubmit} />)

    const loadingButton = screen.getByRole('button', { name: 'Loading' })
    const form = loadingButton.closest('form')
    if (form) {
      fireEvent.submit(form)
    }

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText('Email address')).toHaveValue('customer@example.com')
  })
})
