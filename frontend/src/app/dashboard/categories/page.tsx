import Image from 'next/image';
import { Button } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <Image
            src="/undraw_developer-activity_4zqd.svg"
            alt="En construcción"
            width={400}
            height={300}
            className="mx-auto"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Próximamente!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Muy pronto podrás administrar todas tus categorías desde aquí.
        </p>
        <div className="flex justify-center">
          <Button
            as={Link}
            href="/dashboard"
            color="primary"
            startContent={<ArrowLeft size={18} />}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
