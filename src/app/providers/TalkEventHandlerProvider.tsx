export type Events = Record<string, unknown>;

import React from 'react';
import mitt, { Emitter } from 'mitt';
import { TalkEvent } from '@/features/talk/hooks/types';
import { TalkEventHandlerContext } from './TalkEventHandlerContext';

const emitter: Emitter<TalkEvent> = mitt<TalkEvent>();

const TalkEventHandlerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<TalkEventHandlerContext.Provider value={emitter}>
			{children}
		</TalkEventHandlerContext.Provider>
	);
};

export default TalkEventHandlerProvider;
