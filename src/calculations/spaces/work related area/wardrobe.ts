import MainSpace from '../main_space_class'
import SharedWardrobe from '../shared area/wardrobe'
import { findSpaceByClassName } from '../../helpers'

export default class WorkWardrobe extends MainSpace {
  /**
   * Calculates the area of the personal storage
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    const sharedSpace = findSpaceByClassName('SharedWardrobe', this.config.spaces)
    const sharedWardrobe = new SharedWardrobe(this.variables, this.config, this.customSpaceConstants, this.customConstants, sharedSpace)
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() - sharedWardrobe.calculateAreaExclCompensation()
  }
}
