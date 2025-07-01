import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { ShoppingCart, Star, ShoppingBasket } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image?: string | null;
  rating?: number;
  reviewCount?: number;
}

export const ProductCard = ({
  id,
  name,
  price,
  rating = 4.5,
  reviewCount = 0,
}: ProductCardProps) => {
  // Format price
  const formattedPrice = new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 2,
  }).format(parseFloat(price));

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardBody className="p-0 flex-grow-0">
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-t-lg">
          <Link href={`/product/${id}`} className="flex items-center justify-center w-full h-full">
            <ShoppingBasket className="h-24 w-24 text-gray-300" />
          </Link>
        </div>
      </CardBody>

      <CardFooter className="flex flex-col items-start p-4 flex-grow">
        <Link href={`/product/${id}`} className="w-full">
          <h3 className="font-medium text-foreground mb-2 line-clamp-2 h-12" title={name}>
            {name}
          </h3>
        </Link>
        <div className="flex items-center mb-3 w-full">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          {reviewCount > 0 && (
            <span className="text-xs text-gray-500 ml-1">
              {reviewCount} {reviewCount === 1 ? 'opinión' : 'opiniones'}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between w-full mt-auto">
          <span className="text-lg font-bold text-foreground">{formattedPrice}</span>
          <Button
            isIconOnly
            color="primary"
            variant="flat"
            aria-label="Agregar al carrito"
            className="ml-2"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;