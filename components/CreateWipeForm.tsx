"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { MultiSelect, useMultiSelect } from 'chakra-multiselect';
import { WipeTag } from '@prisma/client';
import { createWipe } from '@/lib/wipeService';
import { useRouter } from 'next/navigation';
import router from 'next/router';
type BossGateSelection = {
  description: string,
  id: string,
  name: string,
  totalTimeInSeconds: number,
  totalHealthInBars: number,
  wipeTags: WipeTag[]
}

const CreateWipeForm = ({ wipeFormProperties, players, staticId, progSessionId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter()
  const { control, handleSubmit, watch, setValue, getValues, setError } = useForm({
    defaultValues: {
      selectedBoss: '',
      selectedGate: '',
      selectedPlayer: '',
      remainingHealthbars: 0,
      remainingTime: '',
      optionalNote: '',
      selectedWipeTags: [],
      wipeTags: []
    },
    mode: 'onChange', // Validate form when fields change
  });
  const toast = useToast();
  const selectedBoss = watch('selectedBoss');
  const selectedGate = watch('selectedGate');
  const selectedBossGateObject: BossGateSelection = wipeFormProperties
  .find(boss => boss.id === selectedBoss)?.bossGates
  .find(gate => gate.id === selectedGate);
  const wipeTagOptions = selectedBossGateObject?.wipeTags ? selectedBossGateObject.wipeTags.map(wipeTag => {
    return {label: wipeTag.description, value: wipeTag.id};
  }) : []

  const onSubmit = async (data) => {
    // alert(JSON.stringify(data, null, 2))
    const resp = await createWipe(data, staticId, progSessionId)
    onClose();
    toast({
      title: 'Success',
      description: 'The wipe has been successfully reported.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    router.refresh();
  }; 

  const getSelectedBossGate = (newGateId?: string) => {
    if (!newGateId) {
      const [bossId, gateId] = getValues(['selectedBoss', 'selectedGate']);
      return wipeFormProperties
      .find(boss => boss.id === bossId)?.bossGates
      .find(gate => gate.id === gateId);
    } else {
      const bossId = getValues('selectedBoss')
      return wipeFormProperties
      .find(boss => boss.id === bossId)?.bossGates
      .find(gate => gate.id === newGateId);
    } 
  }

  return (
    <>
      <Button onClick={onOpen}>Report New Wipe</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Report New Wipe</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
              <FormControl>
                <FormLabel>Boss</FormLabel>
                <Controller
                  name="selectedBoss"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} required placeholder="Select boss" onChange={(e) => {
                      field.onChange(e); // This is necessary to update the form state
                      setValue('selectedGate', ''); // Reset selectedPhase when boss changes
                    }}>
                      {wipeFormProperties.map((boss) => (
                        <option key={boss.id} value={boss.id}>{boss.name}</option>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl isDisabled={!selectedBoss}>
                <FormLabel>Gate</FormLabel>
                <Controller
                  name="selectedGate"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} required placeholder="Select gate" disabled={!selectedBoss} onChange={(e) => {
                        const selectedGateId = e.target.value;
                        field.onChange(selectedGateId); // Update the gate selection
                        const selectedGate = getSelectedBossGate(selectedGateId);
                        setValue('remainingHealthbars', selectedGate ? selectedGate.totalHealthInBars : 0); // Reset selectedPhase when boss changes
                        setValue('remainingTime', ''); // clear remaining time when boss changes
                        setValue('selectedWipeTags', [])
                        const wipeTagOptions = selectedGate?.wipeTags ? selectedGate.wipeTags.map(wipeTag => {
                          return {label: wipeTag.description, value: wipeTag.id};
                        }) : []
                        setValue('wipeTags', wipeTagOptions)
                      }}>
                      {selectedBoss && wipeFormProperties.find(boss => boss.id === selectedBoss)?.bossGates.map(gate => (
                        <option key={gate.id} value={gate.id}>{gate.name}</option>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl isDisabled={!selectedGate || !selectedBoss}>
                <FormLabel>Character</FormLabel>
                <Controller
                  name="selectedPlayer"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} placeholder="Player responsible for wipe (if any)" disabled={!selectedGate || !selectedBoss}>
                      {selectedGate && selectedBoss && players.map(player => (
                        <option key={player.id} value={player.id}>{player.name}</option>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl isDisabled={!selectedGate}>
                <FormLabel htmlFor="remainingHealthbars">Healthbars Left</FormLabel>
                <Controller
                  name="remainingHealthbars"
                  control={control}
                  rules={{
                    required: 'Healthbars left is required',
                    min: { value: 0, message: "Healthbars can't be negative" },
                    max: { value: selectedBossGateObject ? selectedBossGateObject.totalHealthInBars : 0, message: "Healthbars exceed the total" }
                  }}
                  render={({ field }) => (
                    <NumberInput 
                      {...field} 
                      id="remainingHealthbars" 
                      max={selectedBossGateObject ? selectedBossGateObject.totalHealthInBars : 0}
                      min={0}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
              </FormControl>
              <FormControl isDisabled={!selectedGate}>
                <FormLabel htmlFor="remainingTime">Remaining Time (MM:SS)</FormLabel>
                <Controller
                  name="remainingTime"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-5][0-9]:[0-5][0-9]$/,
                      message: "Input must be in MM:SS format"
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      id="remainingTime"
                      placeholder="MM:SS"
                      isDisabled={!selectedGate}
                      onChange={(e) => {
                        const { value } = e.target;
                        let formattedValue = value;
                        const currentTime = getValues('remainingTime')
                        // Directly use regex to test the input value without appending colon prematurely
                        const regex = /^(2[0-9]|[01]?[0-9]):?([0-5]?[0-9]?)?$/;

                        // Detect when user types the 2nd digit of the hour and append ':' if not present
                        if (value.length === 2 && !value.includes(':') && /^\d{2}$/.test(value)) {
                          formattedValue = value + ':';
                        }

                        // handle backspace on semicolon
                        if (value.length === 2 && currentTime.length === 3) {
                          formattedValue = value;
                        }

                        // Update the field only if the formattedValue matches the regex
                        if (regex.test(formattedValue)) {
                          field.onChange(formattedValue);
                        } else if (formattedValue === value && value.length < currentTime.length) {
                          // Allows deletion if the new value is shorter than the current, indicating backspace usage
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormControl isDisabled={!selectedGate}>
                <FormLabel htmlFor="selectedWipeTags">Wipe Tags</FormLabel>
                <Controller
                  name="selectedWipeTags"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MultiSelect
                      {...field}
                      options={getValues('wipeTags')}
                      id="selectedWipeTags"
                      placeholder="wipe tags"
                      disabled={!selectedGate}
                    />
                  )}
                />
              </FormControl>
              <FormControl isDisabled={!selectedGate}>
                <FormLabel htmlFor="optionalNote">Optional Note</FormLabel>
                <Controller
                  name="optionalNote"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      id="optionalNote"
                      placeholder="optional note"
                      isDisabled={!selectedGate}
                    />
                  )}
                />
              </FormControl>
              </VStack>
              {/* Subsequent fields like selectedPhase go here, using similar pattern */}
              {/* Make sure to conditionally render or enable them based on the selectedBoss value */}
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>Close</Button>
              <Button type="submit" colorScheme="blue">Submit</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
      
export default CreateWipeForm;