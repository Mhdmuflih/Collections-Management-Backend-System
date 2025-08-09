import { IActivityRepository } from "../interface/services-interface/IActivityRepository";
import { IActivityService } from "../interface/services-interface/IActivityService";

export class ActivityService implements IActivityService {
    constructor(private activityRepository: IActivityRepository) { }
}