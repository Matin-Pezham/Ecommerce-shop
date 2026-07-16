import type { AuthUser, LoginPayload, RegisterPayload } from '@/features/auth/types'

const MOCK_LATENCY_MS = 320

function sleep(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function createInitialsAvatar(fullName: string) {
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token[0]?.toUpperCase() ?? '')
    .join('')

  const bg = '1f2937'
  const fg = 'ffffff'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bg}&color=${fg}`
}

function buildUserFromIdentity(identity: {
  firstName: string
  lastName: string
  email: string
  phone?: string
}): AuthUser {
  const fullName = `${identity.firstName} ${identity.lastName}`.trim()

  return {
    id: `usr-${Date.now()}`,
    firstName: identity.firstName,
    lastName: identity.lastName,
    fullName,
    email: identity.email,
    phone: identity.phone,
    avatarUrl: createInitialsAvatar(fullName || identity.email),
    role: 'customer',
    createdAt: new Date().toISOString(),
  }
}

function parseNameFromEmail(email: string) {
  const localPart = email.split('@')[0] || 'guest'
  const parts = localPart
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)

  const firstName = parts[0] ? parts[0][0].toUpperCase() + parts[0].slice(1) : 'Guest'
  const lastName = parts[1] ? parts[1][0].toUpperCase() + parts[1].slice(1) : 'Customer'

  return { firstName, lastName }
}

export async function mockLogin(payload: LoginPayload) {
  await sleep(MOCK_LATENCY_MS)

  const identity = parseNameFromEmail(payload.email)
  return buildUserFromIdentity({
    firstName: identity.firstName,
    lastName: identity.lastName,
    email: payload.email,
  })
}

export async function mockRegister(payload: RegisterPayload) {
  await sleep(MOCK_LATENCY_MS)

  return buildUserFromIdentity({
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
  })
}

export async function mockForgotPassword(email: string) {
  await sleep(MOCK_LATENCY_MS)
  void email
  return true
}
