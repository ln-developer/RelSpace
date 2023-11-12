export interface SelectedWeekData {
  year: Date | number;
  monthNumber: Date | number;
  weekIndex: number | null,
}

export interface DeletingReleaseInfo {
  releaseNumber: number | string;
}

export interface AddingReleaseInfo {
  releaseNumber: number | string;
  releaseTag: string;
}
