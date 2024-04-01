"use client"
import React from 'react';
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

const CreateWipeForm = ({ wipeFormProperties, players }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, handleSubmit, watch, setValue, setError } = useForm({
    defaultValues: {
      selectedBoss: '',
      selectedGate: '',
      selectedPlayer: '',
      remainingHealthbars: 0,
      remainingTime: '',
    },
  });
  const toast = useToast();

  const selectedBoss = watch('selectedBoss');
  const selectedGate = watch('selectedGate');
  const selectedBossGateObject = wipeFormProperties
  .find(boss => boss.id === selectedBoss)?.bossGates
  .find(gate => gate.id === selectedGate);
  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2))
    // Here you can handle form submission, for example, by making an API call.
    toast({
      title: 'Success',
      description: 'The wipe has been successfully reported.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  const handleTimeInputChange = (event, onChange) => {
    const { value } = event.target;
    const regex = /^(?:[0-5]\d:[0-5]\d)?$/; // Allows empty, partial, or full MM:SS format

    if (regex.test(value)) {
      onChange(value);
    }
  };

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
                      setValue('remainingHealthbars', 0);
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
                        field.onChange(e); // This is necessary to update the form state
                        setValue('remainingHealthbars', 0); // Reset selectedPhase when boss changes
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
                  render={({ field }) => (
                    <NumberInput 
                      {...field} 
                      id="remainingHealthbars" 
                      defaultValue={selectedBossGateObject ? selectedBossGateObject.totalhealthInBars : 0}
                      max={selectedBossGateObject ? selectedBossGateObject.totalhealthInBars : 0}
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
                      placeholder="Enter time as MM:SS"
                      isDisabled={!selectedGate}
                      onChange={(e) => {
                        const { value } = e.target;
                        const matchesPattern = /^[0-5]?[0-9]:[0-5][0-9]$/;
                        if (value.length < 5 || (value === "" || matchesPattern.test(value))) {
                            if (value.length === 2) e.target.value = e.target.value + ':'
                          field.onChange(e);
                        }
                      }}
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
      

// const CreateWipeForm = ({staticId, progSessionId, wipeFormProperties}: {staticId: string, progSessionId:string, wipeFormProperties: BossFormOption[]}) => {
//   const router = useRouter();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const toast = useToast();
//   const [bosses, setBosses] = useState([]);
//   const [selectedBoss, setSelectedBoss] = useState('');
//   const [selectedPhase, setSelectedPhase] = useState('');

//   const handleSubmit = async (event:FormEvent) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//       <Button onClick={onOpen}>Report new wipe</Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>New wipe</ModalHeader>
//           <ModalCloseButton />
//           <form onSubmit={handleSubmit}>
//             <ModalBody>
//             <FormControl>
//             <FormLabel>Boss</FormLabel>
//             <Select onChange={(e) => alert(e.target.value)}>
//             {wipeFormProperties.map((boss) => (
//                 <option key={boss.id} value={boss.id}>
//                 {boss.name}
//                 </option>
//             ))}
//             </Select>
//             {}
//         </FormControl>
//             </ModalBody>
//             <ModalFooter>
//               <Button colorScheme='blue' mr={3} onClick={onClose}>
//                 Close
//               </Button>
//               <Button type="submit" colorScheme="blue">Create Session</Button>
//             </ModalFooter>
//           </form>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

export default CreateWipeForm;