import { useSession, signIn, signOut } from 'next-auth/react'

export const Login = () => {
  const { data: session } = useSession()

  const fetchRepos = () => {
    if (session?.user.accessToken) {
      return
    }
    const url = 'https://api.github.com/user/repos?per_page=10'
    const headers = {
      Authorization: 'token ' + session?.user.accessToken,
    }
    fetch(url, { headers })
      .then((res) => res.json())
      .then((json) => console.log(json))
  }

  return session ? (
    <>
      {/* {JSON.stringify(session)} */}
      <button onClick={() => signIn('google')}>Link Google</button>
      <button onClick={() => signOut()}>SignOut</button>
    </>
  ) : (
    <>
      <button onClick={() => signIn()}>SignIn</button>
    </>
  )
}
