import {ReleaseInfo} from './data.model';

export interface ReleaseDataResponse {
  releaseList: ReleaseInfo[];
}

export interface ModifyReleaseListResponse {
  message: string;
  weekData: object;
}
