import MainSpace from '../main_space_class'
import SharedTouchdown from '../shared area/touchdown'
import { findSpaceByClassName } from '../../helpers'

export default class WorkTouchdown extends MainSpace {
  /**
   * This method computes the share of this workspace type
   * @returns {number}
   */
  sharePerWorkspaceType (): number {
    // We need the shared touchdown share for the calculation of the work touchdown share
    const sharedSpace = findSpaceByClassName('SharedTouchdown', this.config.spaces)
    const sharedTouchdown = new SharedTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants, sharedSpace)
    return this.variables.touchdownShare - sharedTouchdown.sharePerWorkspaceType()
  }

  /**
   * Calculates the area of touchdown. 0 if there is no need.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() * this.sharePerWorkspaceType() + this.addedPeakArea()
  }
}
