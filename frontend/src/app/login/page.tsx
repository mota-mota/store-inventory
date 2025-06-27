import { LoginForm } from "@/components/auth/LoginForm"
import { Card, CardBody } from "@heroui/react"
import Link from "next/link"
import "./style.css"

export default function LoginPage() {
  return (
    <div className="login-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-brand-primary">Cemaco</h1>
          </Link>
          <p className="text-gray-600 mt-2">Inicia sesión en tu cuenta</p>
        </div>

        <Card className="shadow-xl">
          <CardBody className="p-8">
            <LoginForm />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
