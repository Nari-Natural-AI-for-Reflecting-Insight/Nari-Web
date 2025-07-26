import { z } from 'zod';

export const changeNicknameSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요.' })
    .max(20, { message: '닉네임은 20자 이하로 입력해주세요.' }),
});
