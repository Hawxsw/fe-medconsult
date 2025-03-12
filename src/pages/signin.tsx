import { useState } from 'react'
import { motion } from 'framer-motion'
import doctorImage from '../assets/doctor-illustration.svg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface SignInCredentials {
  email: string
  password: string
}

interface SignInResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signInMutation = useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      const response = await axios.post<SignInResponse>(
        'http://localhost:3000/sessions',
        credentials
      )
      return response.data
    },
    onSuccess: (data) => {
      localStorage.setItem('@App:token', data.token)
      localStorage.setItem('@App:user', JSON.stringify(data.user))

      navigate('/dashboard')
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    signInMutation.mutate({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center">
              <img
                src={doctorImage}
                alt="Ilustração de médico"
                className="h-32 w-auto mb-6"
              />
            </div>
            <CardTitle className="text-2xl text-center font-bold">
              Entre na sua conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={signInMutation.isPending}
                  />
                </div>
                <div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={signInMutation.isPending}
                  />
                </div>
              </div>

              {signInMutation.isError && (
                <div className="text-red-500 text-sm text-center">
                  Email ou senha inválidos
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={signInMutation.isPending}
              >
                {signInMutation.isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button variant="link" asChild>
                <a href="forgot" className="text-blue-500 hover:text-blue-600">
                  Esqueci minha senha
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default SignIn
