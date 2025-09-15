import { useAuth } from '@auth/hooks/auth.hooks'
import Typewriter from '@features/home/type-writer'
import Scene from '@shared/components/scene/scene'

const Home = () => {
  const { user } = useAuth()

  return (
    <Scene>
      <Typewriter text={`Hello, ${user?.username}`} />
    </Scene>
  )
}

export default Home
