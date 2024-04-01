"use client"
import React, { FormEvent, useState } from 'react';
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
import { useRouter } from 'next/navigation';

const CreateStaticGroupForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [players, setPlayers] = useState(Array(8).fill({ name: '' }));
  const toast = useToast();

  const handlePlayerNameChange = (index: number, event: FormEvent<HTMLInputElement>) => {
    const updatedPlayerArray = players.map((player, i) => {
        if (i === index) return {...player, name: (event.target as HTMLInputElement).value}
        else return player
    })
    setPlayers(updatedPlayerArray);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const allPlayersFilled = players.every(player => player.name.trim() !== '');
    if (!allPlayersFilled) {
      toast({
        title: 'Error',
        description: "All player names must be filled.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('/api/static', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, players }),
      });

      if (!response.ok) {
        throw new Error('Failed to create static group');
      }

      toast({
        title: 'Success',
        description: "Static group created successfully.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

    } catch (error:any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    onClose();
    router.refresh();

  };

  return (
    <>
      <Button marginTop={'1rem'} onClick={onOpen}>Create New Static Group</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Static Group</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
          <ModalBody>
          <VStack spacing={4}>
            <FormControl id="group-name">
              <FormLabel>Group Name</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            {players.map((player, index) => (
              <FormControl key={index} id={`player-${index}`}>
                <FormLabel>Player {index + 1} Name</FormLabel>
                <Input type="text" value={player.name} onChange={(e) => handlePlayerNameChange(index, e)} />
              </FormControl>
            ))}
          </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" colorScheme="blue">Create Group</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>

  );
};

export default CreateStaticGroupForm;