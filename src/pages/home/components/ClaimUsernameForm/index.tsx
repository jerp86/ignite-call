import { Button, TextInput } from '@jerp-ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Form } from './styles'

export const ClaimUsernameForm = () => (
  <Form as="form">
    <TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuário" />
    <Button size="sm" type="submit">
      Reservar
      <ArrowRight />
    </Button>
  </Form>
)
