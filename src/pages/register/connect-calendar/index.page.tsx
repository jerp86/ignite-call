import { Button, Heading, MultiStep, Text } from '@jerp-ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { useCallback, useMemo } from 'react'
import { Container, Header } from '../styles'
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

  const handleNavigateToNextStep = useCallback(async () => {
    await router.push('/register/time-intervals')
  }, [router])

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

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

          <Button
            type="submit"
            disabled={!isSignedId}
            onClick={handleNavigateToNextStep}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
