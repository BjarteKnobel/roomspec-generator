import { ISpace } from './interfaces/space'

/**
 * This function returns the space information from an array of space spaces. Recursively until found.
 * @param {string} spaceClassName - The name of the space
 * @param {ISpace[]} spaces - The array of spaces
 * @returns {ISpace|undefined}
 */
const findSpace = (spaceClassName: string, spaces: ISpace[]): ISpace|undefined => {  
  for (const space of spaces) {
    if (space.className === spaceClassName) {
      return space
    } else if (space.spaces) {
      const foundSpace = findSpace(spaceClassName, space.spaces)
      if (foundSpace) {
        return foundSpace
      }
    }
  }
  return undefined
}

export { findSpace }

/**
 * Find a space by its config className recursively
 * @param {string} className - The className field in config (e.g. "WorkTouchdown")
 * @param {ISpace[]} spaces - The array of spaces
 * @returns {ISpace|undefined}
 */
export const findSpaceByClassName = (className: string, spaces: ISpace[]): ISpace|undefined => {
  for (const space of spaces) {
    if (space.className === className) return space
    if (space.spaces && space.spaces.length) {
      const nested = findSpaceByClassName(className, space.spaces)
      if (nested) return nested
    }
  }
  return undefined
}
