import { IActivity } from "../interface/models-interfaces/model.interface";
import { IActivityRepository } from "../interface/services-interface/IActivityRepository";
import Activity from "../models/activity.model";
import { BaseRepository } from "./base.respository";

class ActivityRepository extends BaseRepository<IActivity> implements IActivityRepository {
    constructor() {
        super(Activity);
    }
}

export default new ActivityRepository();