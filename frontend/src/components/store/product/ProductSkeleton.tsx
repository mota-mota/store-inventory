import { Card, CardBody, CardFooter, Skeleton } from '@heroui/react';

export const ProductSkeleton = () => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardBody className="p-0 flex-grow-0">
        <div className="flex items-center justify-center h-48 bg-gray-50">
          <Skeleton className="rounded-lg w-full h-full">
            <div className="h-full w-full bg-gray-200" />
          </Skeleton>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start p-4 flex-grow">
        <Skeleton className="w-4/5 rounded-lg mb-2">
          <div className="h-5 bg-gray-200 rounded-lg" />
        </Skeleton>

        <div className="flex items-center mb-3 w-full">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Skeleton key={star} className="w-4 h-4 mx-0.5">
                <div className="w-4 h-4 bg-gray-200" />
              </Skeleton>
            ))}
          </div>
          <Skeleton className="ml-2 w-8 h-4 rounded">
            <div className="w-8 h-4 bg-gray-200" />
          </Skeleton>
        </div>

        <div className="flex items-center justify-between w-full mt-auto">
          <Skeleton className="w-16 h-6 rounded-lg">
            <div className="w-16 h-6 bg-gray-300" />
          </Skeleton>
          <Skeleton className="w-10 h-10 rounded-full">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
          </Skeleton>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductSkeleton;
