import React, {useEffect} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/react";
import {useDeleteProduct} from "@/services/products/productsService";
import {Alert} from "@heroui/alert";

interface DeleteProductConfirmationProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  id: number | null;
  onSuccess: () => void;
}

const DeleteProductConfirmation = ({
    isOpen,
    onOpenChange,
    id,
    onSuccess
}: DeleteProductConfirmationProps) => {
    const {loading, error, response, deleteProduct} = useDeleteProduct();

    const handleDeleteProduct = async () => {
        if(id) {
            await deleteProduct(id);
        }
    }

    useEffect(() => {
        if(!loading) {
            if(response?.status === true){
                onSuccess();
            }
        }
    }, [loading, response]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={"top"}>
      <ModalContent>
        <ModalHeader>Eliminar producto</ModalHeader>
        <ModalBody>
          ¿Estás seguro de que deseas eliminar este producto?
            {
                error?.message && <Alert color={"danger"} title={error?.message} />
            }
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancelar
          </Button>
          <Button onPress={() => handleDeleteProduct()} disabled={loading} color="danger">
              Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProductConfirmation;