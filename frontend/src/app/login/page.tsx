import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardBody } from '@heroui/react';
import Link from 'next/link';
import './style.css';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="login-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/CemacoAzulFooter.png"
              alt="Cemaco Logo"
              width={150}
              height={80}
              className="max-w-35"
              priority
            />
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
  );
}
