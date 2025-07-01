import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { Button, Divider } from '@heroui/react';
import Image from "next/image";

const footerLinks = [
  {
    title: 'Sobre Nosotros',
    links: [
      { name: 'Nuestra Historia', href: '/about' },
      { name: 'Trabaja con Nosotros', href: '/careers' },
      { name: 'Términos y Condiciones', href: '/terms' },
      { name: 'Política de Privacidad', href: '/privacy' },
    ],
  },
  {
    title: 'Servicio al Cliente',
    links: [
      { name: 'Preguntas Frecuentes', href: '/faq' },
      { name: 'Envíos y Entregas', href: '/shipping' },
      { name: 'Devoluciones', href: '/returns' },
      { name: 'Contacto', href: '/contact' },
    ],
  },
  {
    title: 'Mi Cuenta',
    links: [
      { name: 'Mis Pedidos', href: '/account/orders' },
      { name: 'Mis Favoritos', href: '/account/wishlist' },
      { name: 'Direcciones', href: '/account/addresses' },
      { name: 'Configuración', href: '/account/settings' },
    ],
  },
];

export const StoreFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foreground text-background mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">
              <Image
                  src="/CemacoAzulFooter.png"
                  alt="Cemaco Logo"
                  width={120}
                  height={64}
                  className="max-w-35"
                  priority
              />
            </h2>
            <p className="text-foreground-500">
              Encuentra los mejores productos para tu hogar a los mejores precios.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Button
                      as={Link}
                      href={'#'}
                      variant="light"
                      className="justify-start text-foreground-500 hover:text-foreground"
                    >
                      {link.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Divider className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground-500 text-sm">
            &copy; {currentYear} Cemaco. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button
              isIconOnly
              variant="light"
              as="a"
              href="https://www.facebook.com/cemacogt"
              className="text-foreground-500 hover:text-primary"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              isIconOnly
              variant="light"
              as="a"
              href="https://www.instagram.com/cemacoguate"
              className="text-foreground-500 hover:text-pink-500"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;