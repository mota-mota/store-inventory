import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Form,
  NumberInput,
  addToast,
  Select,
  SelectItem,
} from '@heroui/react';
import { Product } from '@/services/products/types';
import { useEffect, useRef, useState } from 'react';
import { useCreateProduct, useUpdateProduct } from '@/services/products/productsService';

const categories = [
  { id: 1, name: 'Electrodomésticos' },
  { id: 2, name: 'Tecnología' },
  { id: 3, name: 'Hogar' },
];

export interface CreateProductProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  callback: (toNull: null) => void;
  product?: Product | null | undefined;
}
export function CreateProduct({ isOpen, onOpenChange, product, callback }: CreateProductProps) {
  useEffect(() => {
    console.log(product);
  }, [product]);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    loading: createLoading,
    error: createError,
    response: createResponse,
    createProduct,
  } = useCreateProduct();
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    SKU: '',
  });

  // Actualizar los valores iniciales cuando cambia el producto
  useEffect(() => {
    if (product) {
      setInitialValues({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        quantity: product.quantity?.toString() || '',
        categoryId: product.categoryId?.toString() || '',
        SKU: product.SKU || '',
      });
    } else {
      // Resetear a valores por defecto cuando no hay producto
      setInitialValues({
        name: '',
        description: '',
        price: '',
        quantity: '',
        categoryId: '',
        SKU: '',
      });
    }
  }, [product]);

  const {
    loading: updateLoading,
    error: updateError,
    response: updateResponse,
    updateProduct,
  } = useUpdateProduct();

  const handleCreateOrUpdateProduct = (formInfo: any) => {
    if (product?.id) {
      updateProduct(product.id, formInfo);
    } else {
      createProduct(formInfo);
    }
  };

  // Mostrar los errores de actualización
  useEffect(() => {
    if (!updateLoading) {
      if (updateError) {
        addToast({
          title: 'Error',
          description: updateError?.message || 'Error al actualizar el producto',
          color: 'danger',
          variant: 'flat',
        });
      }
    }
  }, [updateLoading, updateError]);

  useEffect(() => {
    if (!updateLoading && updateResponse?.data.id) {
      const success = () => {
        addToast({
          title: 'Producto actualizado',
          description: 'El producto ha sido actualizado correctamente',
          color: 'success',
          variant: 'flat',
        });
        callback(null);
        onOpenChange(false);
      };
      success();
    }
  }, [updateLoading, updateResponse]);

  useEffect(() => {
    if (!createLoading) {
      if (createError) {
        addToast({
          title: 'Error',
          description: createError || 'Error al crear el producto',
          color: 'danger',
          variant: 'flat',
        });
      }
    }
  }, [createLoading, createError]);

  useEffect(() => {
    if (!createLoading && createResponse?.data.id) {
      const success = () => {
        addToast({
          title: 'Producto creado',
          description: 'El producto ha sido creado correctamente',
          color: 'success',
          variant: 'flat',
        });
        callback(null);
        onOpenChange(false);
      };
      success();
    }
  }, [createLoading, createResponse]);

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {product?.id ? 'Editar' : 'Crear'} Producto
              </ModalHeader>
              <ModalBody>
                <Form
                  ref={formRef}
                  className="w-full flex flex-col gap-4"
                  onSubmit={e => {
                    e.preventDefault();
                    let data = Object.fromEntries(new FormData(e.currentTarget));

                    handleCreateOrUpdateProduct(data);
                  }}
                  defaultValues={initialValues}
                >
                  <Input
                    isRequired
                    errorMessage="Ingresa un nombre válido"
                    label="Nombre del producto"
                    labelPlacement="outside"
                    name="name"
                    defaultValue={initialValues.name}
                    placeholder="Ej: Escritorio ajustable"
                    type="text"
                  />
                  <Textarea
                    isRequired
                    label="Descripción del producto"
                    labelPlacement="outside"
                    placeholder="Ej: Escritorio ajustable con pantalla de 1920x1080"
                    name="description"
                    defaultValue={initialValues.description}
                    errorMessage="Ingresa una descripción válida"
                  />
                  <NumberInput
                    isRequired
                    name="price"
                    defaultValue={initialValues.price}
                    type="number"
                    label="Precio"
                    placeholder="0.00"
                    labelPlacement="outside"
                    variant="bordered"
                    errorMessage="Por favor ingresa un precio válido"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">Q</span>
                      </div>
                    }
                  />
                  <Input
                    isRequired
                    name="quantity"
                    defaultValue={initialValues.quantity}
                    type="number"
                    label="Cantidad en Inventario"
                    placeholder="0"
                    labelPlacement="outside"
                    variant="bordered"
                    errorMessage="Por favor ingresa una cantidad válida"
                    min="0"
                    step="1"
                  />
                  <Select
                    items={categories}
                    label="Categorias"
                    name="categoryId"
                    defaultSelectedKeys={initialValues.categoryId ? [initialValues.categoryId] : []}
                    labelPlacement="outside"
                    placeholder="Selecciona una categoria"
                  >
                    {category => (
                      <SelectItem key={category.id} textValue={category.name}>
                        <div className="flex gap-2 items-center">
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    isRequired
                    name="SKU"
                    defaultValue={initialValues.SKU}
                    errorMessage="Ingresa un SKU válido"
                    label="SKU"
                    labelPlacement="outside"
                    placeholder="Ej: ABC123"
                    type="text"
                  />
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  type="button"
                  disabled={createLoading}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (formRef.current && formRef.current?.checkValidity()) {
                      const formData = new FormData(formRef.current);
                      const data = Object.fromEntries(formData);

                      handleCreateOrUpdateProduct(data);
                    }
                  }}
                  type="submit"
                  disabled={createLoading}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
