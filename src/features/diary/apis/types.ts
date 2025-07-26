import { ApiSuccessResponse } from '@/shared/types/api';

export type GetDiariesRequest = {
  year: number;
  month: number;
};

export type GetDiariesResponse = ApiSuccessResponse<{
  diaries: Diary[];
}>;

type Diary = {
  diaryDate: string;
  diaryId: 51;
  qnaList: DiaryQnaList[];
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
};

type DiaryQnaList = {
  qnaId: number;
  question: string;
  answer: string;
};
