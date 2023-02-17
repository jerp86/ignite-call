import { Heading, styled, Text } from '@jerp-ignite-ui/react'

export const HomeContainer = styled('main', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('section', {
  maxWidth: '30rem',
  padding: '0 $10',

  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('section', {
  paddingRight: '$8',
  overflow: 'hidden',

  img: {
    aspectRatio: 1.87,
    objectFit: 'cover',
  },

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
