import { useState, useEffect, FC, FormEvent, useRef} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useUser } from '../lib/hooks'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'

interface LoginProps {
  username: string
  password: string
  status: string
}

interface LoginStatus {
  username: string
  password: string
  status: string
}
const LoginPage: FC<LoginProps> = () =>  {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')
  const username = useRef(null);
  const password = useRef(null);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username: username.current.value, password: password.current.value}),
    })

    if (res.status === 200) {
      const userObj = await res.json()
      // set user to useSWR state
      mutate(userObj)
    } else {
      setErrorMsg('Incorrect username or password. Try better!')
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <>
      <h1>Login to Example</h1>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input type="text" name="username" ref={username} required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" ref={password} required />
          </label>
          <div className="submit">
            <input type="submit" value="Login" />
            <Link href="/signup">
              <a>I don't have an account</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
export default LoginPage;