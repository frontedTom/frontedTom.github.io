import Main from './Main'
import MeteorShower from '@/components/MeteorShower'
export default async function Page() {
  return (
    <>
      <MeteorShower meteorColor="#ababab" tailLength={80} targetY={500} direction={45} />
      <Main />
    </>
  )
}
