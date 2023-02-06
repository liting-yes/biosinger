import type { DbinfoItem } from '../api'
import { atom } from 'jotai'

export interface DbInfoStore {
  [key: string]: DbinfoItem
}

export const dbInfoAtom = atom<DbInfoStore>({})
dbInfoAtom.debugLabel = 'dbInfoAtom'
