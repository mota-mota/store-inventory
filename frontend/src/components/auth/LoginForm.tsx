"use client"

import React, {useEffect} from "react"
import { useState } from "react"
import { Button, Input } from "@heroui/react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { loginUser } from "@/app/login/actions"
import {useRouter} from "next/navigation";

export function LoginForm() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { user, login } = useAuth()
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const user = await loginUser(email, password)
      login(user)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(user && user.id) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <Input
          type="email"
          label="Correo Electrónico"
          placeholder="tu@email.com"
          startContent={<Mail size={18} className="text-gray-400" />}
          variant="bordered"
          isRequired
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          startContent={<Lock size={18} className="text-gray-400" />}
          endContent={
            <button type="button" onClick={toggleVisibility} tabIndex={-1}>
              {isVisible ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}
            </button>
          }
          type={isVisible ? "text" : "password"}
          variant="bordered"
          isRequired
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <Button type="submit" className="w-full btn-brand" size="lg" isLoading={isLoading}>
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
    </motion.form>
  )
}
