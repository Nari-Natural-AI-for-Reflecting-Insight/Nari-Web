import { createContext } from 'react';
import { Emitter } from 'mitt';
import { TalkEvent } from '@/features/talk/hooks/types';

export const TalkEventHandlerContext = createContext<Emitter<TalkEvent> | null>(null);
