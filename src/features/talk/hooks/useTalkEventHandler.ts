import { useContext } from 'react';
import { TalkEventHandlerContext } from '@/app/providers/TalkEventHandlerContext';

const useTalkEventHandler = () => {
  const ctx = useContext(TalkEventHandlerContext);
  if (!ctx) {throw new Error('useTalkEventHandler는 provider안에서 사용해야 합니다.');}
  return ctx;
};

export default useTalkEventHandler;