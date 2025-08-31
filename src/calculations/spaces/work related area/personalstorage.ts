import MainSpace from '../main_space_class'
import WorkTouchdown from './touchdown'
import WorkDockin from './dockin'
import Focusroom from './focusroom'
import Quietzone from './quietzone'
import SharedPersonalStorage from '../shared area/personalstorage'
import { findSpaceByClassName } from '../../helpers'

export default class WorkPersonalStorage extends MainSpace {
  /**
   * Calculates the area of the personal storage
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    const workTouchdown = new WorkTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants, findSpaceByClassName('WorkTouchdown', this.config.spaces))
    const workDockin = new WorkDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants, findSpaceByClassName('WorkDockin', this.config.spaces))
    const focusroom = new Focusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, findSpaceByClassName('Focusroom', this.config.spaces))
    const quietzone = new Quietzone(this.variables, this.config, this.customSpaceConstants, this.customConstants, findSpaceByClassName('Quietzone', this.config.spaces))
    const sharedPersonalStorage = new SharedPersonalStorage(this.variables, this.config, this.customSpaceConstants, this.customConstants, findSpaceByClassName('SharedPersonalStorage', this.config.spaces))
    const addedPeakAreaSum = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() + workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted()
    return addedPeakAreaSum * this.areaPerPersonExcludingCorridor() - sharedPersonalStorage.calculateAreaExclCompensation()
  }
}
