import { Button, Heading, MultiStep, Text } from '@jerp-ignite-ui/react'
import { signIn } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { RegisterContainer, RegisterHeader } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

export default function Register() {
  return (
    <RegisterContainer>
      <RegisterHeader>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </RegisterHeader>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => signIn('google')}
          >
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </RegisterContainer>
  )
}
