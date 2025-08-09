import { IActivityController } from "../interface/controllers-interfaces/IActivityController";
import { IActivityService } from "../interface/services-interface/IActivityService";

export class ActivityController implements IActivityController {
    constructor(private activityService: IActivityService) { }
}