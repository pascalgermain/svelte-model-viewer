import type { ValueOf } from './types'

export const objectEntries = <T extends { [key: string | number | symbol]: unknown }>(o: T) =>
	Object.entries(o) as [keyof T, ValueOf<T>][]
