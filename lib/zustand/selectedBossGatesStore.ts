import { create } from 'zustand'

function toggleBossGates(gate, selectedBossGates) {
    var array = [...selectedBossGates]; // make a separate copy of the array
    var index = array.indexOf(gate)
    if (index !== -1) {
      array.splice(index, 1);
    } else {
        array.push(gate);
    }
    return array;
}
export const useSelectedBossGatesStore = create((set) => ({
    selectedBossGates: [],
    toggleSelectedBossGates: (bossGate) => set((state) => ({selectedBossGates:toggleBossGates(bossGate, state.selectedBossGates)})),
    clearSelectedBossGates: () => set({selectedBossGates: [] }),
}));