import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { renderWithProviders } from '@/test/renderWithProviders'

beforeEach(() => {
  window.localStorage.setItem('locale', 'en')
})

describe('RegisterForm', () => {
  it('shows required validation for required fields while phone remains optional', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<RegisterForm loading={false} onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Create account' }))

    const requiredErrors = await screen.findAllByText('This field is required.')
    expect(requiredErrors).toHaveLength(5)
    expect(screen.queryByText('Please enter a valid phone number.')).not.toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()

    expect(screen.getByLabelText('First name')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Last name')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Email address')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Password')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Confirm password')).toHaveAttribute('aria-invalid', 'true')
  })

  it('blocks submission with invalid email and wires email error association', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<RegisterForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('First name'), 'Sara')
    await user.type(screen.getByLabelText('Last name'), 'Ahmadi')
    await user.type(screen.getByLabelText('Email address'), 'not-an-email')
    await user.type(screen.getByLabelText('Password'), 'secure123')
    await user.type(screen.getByLabelText('Confirm password'), 'secure123')
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Email address')).toHaveAttribute('aria-describedby', 'auth-register-email-error')
  })

  it('blocks submission with invalid optional phone', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<RegisterForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('First name'), 'Sara')
    await user.type(screen.getByLabelText('Last name'), 'Ahmadi')
    await user.type(screen.getByLabelText('Email address'), 'sara@example.com')
    await user.type(screen.getByLabelText('Phone number'), 'phone-12')
    await user.type(screen.getByLabelText('Password'), 'secure123')
    await user.type(screen.getByLabelText('Confirm password'), 'secure123')
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(await screen.findByText('Please enter a valid phone number.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Phone number')).toHaveAttribute('aria-invalid', 'true')
  })

  it('blocks submission when password is shorter than eight characters', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<RegisterForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('First name'), 'Sara')
    await user.type(screen.getByLabelText('Last name'), 'Ahmadi')
    await user.type(screen.getByLabelText('Email address'), 'sara@example.com')
    await user.type(screen.getByLabelText('Password'), 'abc1234')
    await user.type(screen.getByLabelText('Confirm password'), 'abc1234')
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(await screen.findByText('Password must be at least 8 characters.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('blocks submission when password does not contain both letter and number', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<RegisterForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('First name'), 'Sara')
    await user.type(screen.getByLabelText('Last name'), 'Ahmadi')
    await user.type(screen.getByLabelText('Email address'), 'sara@example.com')
    await user.type(screen.getByLabelText('Password'), 'onlyletters')
    await user.type(screen.getByLabelText('Confirm password'), 'onlyletters')
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(await screen.findByText('Password must contain at least one letter and one number.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows mismatch error on confirm password field only', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<RegisterForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('First name'), 'Sara')
    await user.type(screen.getByLabelText('Last name'), 'Ahmadi')
    await user.type(screen.getByLabelText('Email address'), 'sara@example.com')
    await user.type(screen.getByLabelText('Password'), 'secure123')
    await user.type(screen.getByLabelText('Confirm password'), 'secure124')
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Confirm password')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Password')).not.toHaveAttribute('aria-invalid', 'true')
  })

  it('submits normalized values for a valid registration payload', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<RegisterForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('First name'), '  Sara  ')
    await user.type(screen.getByLabelText('Last name'), '  Ahmadi  ')
    await user.type(screen.getByLabelText('Email address'), '  sara@example.com  ')
    await user.type(screen.getByLabelText('Phone number'), '  +44 7700 900123  ')
    await user.type(screen.getByLabelText('Password'), 'secure123')
    await user.type(screen.getByLabelText('Confirm password'), 'secure123')
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      firstName: 'Sara',
      lastName: 'Ahmadi',
      email: 'sara@example.com',
      phone: '+44 7700 900123',
      password: 'secure123',
      confirmPassword: 'secure123',
    })

    expect(screen.queryByText('This field is required.')).not.toBeInTheDocument()
    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument()
    expect(screen.queryByText('Please enter a valid phone number.')).not.toBeInTheDocument()
  })

  it('normalizes blank optional phone to undefined', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<RegisterForm loading={false} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('First name'), 'Sara')
    await user.type(screen.getByLabelText('Last name'), 'Ahmadi')
    await user.type(screen.getByLabelText('Email address'), 'sara@example.com')
    await user.type(screen.getByLabelText('Phone number'), '   ')
    await user.type(screen.getByLabelText('Password'), 'secure123')
    await user.type(screen.getByLabelText('Confirm password'), 'secure123')
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      firstName: 'Sara',
      lastName: 'Ahmadi',
      email: 'sara@example.com',
      phone: undefined,
      password: 'secure123',
      confirmPassword: 'secure123',
    })
    expect(screen.queryByText('Please enter a valid phone number.')).not.toBeInTheDocument()
  })

  it('disables submit and exposes aria-busy while loading', () => {
    const onSubmit = vi.fn()

    renderWithProviders(<RegisterForm loading={true} onSubmit={onSubmit} />)

    const submitButton = screen.getByRole('button', { name: 'Loading' })
    expect(submitButton).toBeDisabled()

    const form = submitButton.closest('form')
    expect(form).not.toBeNull()
    expect(form).toHaveAttribute('aria-busy', 'true')

    if (form) {
      fireEvent.submit(form)
    }

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('renders external registration error separately without marking inputs invalid by itself', () => {
    const onSubmit = vi.fn()

    renderWithProviders(
      <RegisterForm loading={false} onSubmit={onSubmit} error="Registration failed. Please try again." />,
    )

    const externalError = screen.getByText('Registration failed. Please try again.')
    expect(externalError).toBeInTheDocument()
    expect(externalError).toHaveAttribute('role', 'alert')
    expect(screen.queryByText('This field is required.')).not.toBeInTheDocument()

    expect(screen.getByLabelText('First name')).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Last name')).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Email address')).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Phone number')).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Password')).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Confirm password')).not.toHaveAttribute('aria-invalid', 'true')
  })
})
