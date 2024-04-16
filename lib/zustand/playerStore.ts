import { create } from 'zustand'

type Player = {
    name: string
    id: string
}

type SelectedPlayerStore = {
    selectedPlayer: Player | null,
    setSelectedPlayer: (player: Player) => void,
    clearSelectedPlayer: () => void,
}

export const useSelectedPlayerStore = create<SelectedPlayerStore>((set) => ({
    selectedPlayer: null,
    setSelectedPlayer: (player: Player) => set({selectedPlayer: player }),
    clearSelectedPlayer: () => set({selectedPlayer: null }),
}));