import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@jerp-ignite-ui/react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Container,
  RegisterForm,
  RegisterFormError,
  Header,
} from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

interface RegisterFormData extends z.infer<typeof registerFormSchema> {}

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  const handleRegister = useCallback(
    async (data: RegisterFormData) => {
      try {
        await api.post('/users', {
          name: data.name,
          username: data.username,
        })

        await router.push('/register/connect-calendar')
      } catch (err) {
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message)
          return
        }

        console.error(err)
      }
    },
    [router],
  )

  useEffect(() => {
    if (!router.query?.username) return

    setValue('username', String(router.query.username))
  }, [router.query?.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <RegisterForm as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome do usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuário"
            {...register('username')}
          />

          {errors.username && (
            <RegisterFormError size="sm">
              {errors.username.message}
            </RegisterFormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />

          {errors.name && (
            <RegisterFormError size="sm">
              {errors.name.message}
            </RegisterFormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </RegisterForm>
    </Container>
  )
}
