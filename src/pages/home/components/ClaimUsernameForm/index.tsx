import { Button, TextInput } from '@jerp-ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './styles'

const ClaimUsernameFormSchema = z.object({
  username: z.string(),
})

interface ClaimUsernameFormData
  extends z.infer<typeof ClaimUsernameFormSchema> {}

export const ClaimUsernameForm = () => {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuário"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
