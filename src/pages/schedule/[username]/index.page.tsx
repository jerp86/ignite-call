import { prisma } from '@/lib/prisma'
import { timeToRevalidate } from '@/utils'
import { Avatar, Heading, Text } from '@jerp-ignite-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Container, UserHeader } from './styles'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  const router = useRouter()

  if (!user) {
    router.push('/').then(() => console.log('Nenhum usuário encontrado'))
    return null
  }

  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} alt={user.name} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return {
      notFound: true,
    }

    // or
    // return {
    //   redirect: {
    //     destination: '/',
    //     permanent: false,
    //   },
    // }
  }

  return {
    props: {
      user: {
        avatarUrl: user.avatar_url,
        bio: user.bio,
        name: user.name,
      },
    } as ScheduleProps,
    revalidate: timeToRevalidate({ days: 7 }),
  }
}
