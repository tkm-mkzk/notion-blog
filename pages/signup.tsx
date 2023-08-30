import { Button } from '@mantine/core'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import { useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session || session?.user.email != null) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return { props: {} }
}

export default function Signup() {
  const [email, setEmail] = useState('')
  const [signuped, setSignuped] = useState(false)
  const onSignup = async () => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (res.status == 200) {
      setSignuped(true)
      signIn('google')
    } else {
      alert('error signup')
    }
  }

  return signuped ? (
    <>
      {/* <h2>Success Signup</h2>
      <button onClick={() => signIn()}>Re Signin</button> */}
    </>
  ) : (
    <div className="flex flex-col items-center w-full h-screen bg-gray-100">
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">Signup</h2>
      <p>初回登録時はメールアドレスを登録してください。</p>
      <input
        className="mb-2 p-2 w-64 rounded border shadow focus:outline-none focus:border-blue-400"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button color="cyan" onClick={onSignup}>
        Signup
      </Button>
    </div>
  )
}
