import MainSpace from '../main_space_class'
import SharedWaitingZone from '../shared area/waitingzone'
import { findSpaceByClassName } from '../../helpers'

export default class WorkWaitingZone extends MainSpace {
  /**
   * Calculates the area of the reception.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToReception) {
      const sharedSpace = findSpaceByClassName('SharedWaitingZone', this.config.spaces)
      const sharedWaitingZone = new SharedWaitingZone(this.variables, this.config, this.customSpaceConstants, this.customConstants, sharedSpace)
      return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() - sharedWaitingZone.calculateAreaExclCompensation()
    }
    return 0
  }
}
