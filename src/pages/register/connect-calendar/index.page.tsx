import { Button, Heading, MultiStep, Text } from '@jerp-ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { useCallback, useMemo } from 'react'
import { RegisterContainer, RegisterHeader } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedId = session.status === 'authenticated'

  const handleConnectCalendar = useCallback(
    async () =>
      await signIn('google', { callbackUrl: '/register/connect-calendar' }),
    [],
  )

  const renderConnectOrConnectedButton = useMemo(() => {
    if (isSignedId) {
      return (
        <Button size="sm" disabled>
          Conectado
          <Check weight="bold" />
        </Button>
      )
    }

    return (
      <Button
        variant="secondary"
        size="sm"
        type="button"
        onClick={handleConnectCalendar}
      >
        Conectar
        <ArrowRight />
      </Button>
    )
  }, [handleConnectCalendar, isSignedId])

  const handleNextStep = useCallback(async () => {
    await router.push('/register/time-intervals')
  }, [router])

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
          {renderConnectOrConnectedButton}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedId} onClick={handleNextStep}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </RegisterContainer>
  )
}
