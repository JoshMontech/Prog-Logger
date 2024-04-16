"use client"
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure 
} from '@chakra-ui/react';

const CreateProgSessionForm = ({staticId}: {staticId:string}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (event:FormEvent) => {
    event.preventDefault();
    try {
      // start loading
      const response = await fetch(`/api/static/${staticId}/progsession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ staticId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create progression session');
      }
      // end loading
      toast({
        title: 'Success',
        description: "Progression session created successfully.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onClose();
      const {id} = await response.json()
      router.push(`/static/${staticId}/progsession/${id}`);
; // Close the modal on successful creation
    } catch (error:any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create progression session',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Create New Prog Session</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Progression Session</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue">Create Session</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProgSessionForm;