import { Box, Heading, styled, Text } from '@jerp-ignite-ui/react'

export const Container = styled('main', {
  maxWidth: '35.75rem',
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Header = styled('div', {
  padding: '0 $6',

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const RegisterForm = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const RegisterFormError = styled(Text, {
  color: '#F75A68',
})
