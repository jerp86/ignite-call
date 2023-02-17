import { Heading, Text } from '@jerp-ignite-ui/react'
import Image from 'next/image'
import { Hero, HomeContainer, Preview } from './styles'

import appPreview from '@/assets/app-preview.png'

export default function Home() {
  return (
    <HomeContainer>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>

        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>

      <Preview>
        <Image
          src={appPreview}
          alt="Calendar symbolizing application in operation"
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </HomeContainer>
  )
}
