import { useCallback, useReducer, useRef } from 'react';
import { RealtimeUtils } from '../utils/RealtimeUtils';
import { ItemStatus, ServerItemType, SessionRole } from './constants';
import { ItemContentDelta, ServerItem, RealtimeEventType } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConversationEventType = { type: RealtimeEventType; event_id: string; [k: string]: any }

export interface ResponseType {
  id: string;
  output: string[];
}

const useForceUpdate = () => useReducer((n) => n + 1, 0)[1];

export function useRealtimeConversation() {
  const defaultFrequency = 24_000; // 24 kHz

  const itemLookup = useRef<Record<string, ServerItem>>({});
  const items = useRef<ServerItem[]>([]);
  const responseLookup = useRef<Record<string, ResponseType>>({});
  const responses = useRef<ResponseType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queuedSpeechItems = useRef<Record<string, any>>({});
  const queuedTranscriptItems = useRef<Record<string, { transcript: string }>>({});
  const queuedInputAudio = useRef<Int16Array | null>(null);

  const forceUpdate = useForceUpdate();

  const clear = useCallback(() => {
    itemLookup.current = {};
    items.current = [];
    responseLookup.current = {};
    responses.current = [];
    queuedSpeechItems.current = {};
    queuedTranscriptItems.current = {};
    queuedInputAudio.current = null;
    forceUpdate();
  }, [forceUpdate]);

  const queueInputAudio = useCallback((audio: Int16Array) => {
    queuedInputAudio.current = audio;
    return audio;
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const EventProcessors: Record<RealtimeEventType, (event: any, inputAudioBuffer?: Int16Array) => { item: ServerItem | null; delta: ItemContentDelta | null }> = {
    [RealtimeEventType.ConversationItemCreated]: (event) => {
      const { item } = event;
      const newItem: ServerItem = JSON.parse(JSON.stringify(item));
      if (!itemLookup.current[newItem.id]) {
        itemLookup.current[newItem.id] = newItem;
        items.current.push(newItem);
      }
      newItem.formatted = {
        audio: new Int16Array(0),
        text: '',
        transcript: '',
      };
      if (queuedSpeechItems.current[newItem.id]) {
        newItem.formatted.audio = queuedSpeechItems.current[newItem.id].audio;
        delete queuedSpeechItems.current[newItem.id];
      }
      if (newItem.content) {
        newItem.content
          .filter((c) => ['text', 'input_text'].includes(c.type))
          .forEach((c) => (newItem.formatted.text += c.text ?? ''));
      }
      if (queuedTranscriptItems.current[newItem.id]) {
        newItem.formatted.transcript = queuedTranscriptItems.current[newItem.id].transcript;
        delete queuedTranscriptItems.current[newItem.id];
      }
      if (newItem.type === ServerItemType.Message) {
        if (newItem.role === SessionRole.User) {
          newItem.status = ItemStatus.Completed;
          if (queuedInputAudio.current) {
            newItem.formatted.audio = queuedInputAudio.current;
            queuedInputAudio.current = null;
          }
        } else {newItem.status = ItemStatus.InProgress;}
      } else if (newItem.type === ServerItemType.FunctionCall) {
        newItem.formatted.tool = {
          type: 'function',
          name: newItem.name!,
          call_id: newItem.call_id!,
          arguments: '',
        };
        newItem.status = ItemStatus.InProgress;
      } else if (newItem.type === ServerItemType.FunctionCallOutput) {
        newItem.status = ItemStatus.Completed;
        newItem.formatted.output = newItem.output;
      }
      return { item: newItem, delta: null };
    },

    [RealtimeEventType.ConversationItemTruncated]: (event) => {
      const { item_id, audio_end_ms } = event;
      const item = itemLookup.current[item_id];
      if (!item) {throw new Error(`item.truncated: Item "${item_id}" not found`);}
      const endIndex = Math.floor((audio_end_ms * defaultFrequency) / 1000);
      item.formatted.transcript = '';
      item.formatted.audio = item.formatted.audio.slice(0, endIndex);
      return { item, delta: null };
    },

    [RealtimeEventType.ConversationItemDeleted]: (event) => {
      const { item_id } = event;
      const item = itemLookup.current[item_id];
      if (!item) {throw new Error(`item.deleted: Item "${item_id}" not found`);}
      delete itemLookup.current[item.id];
      const idx = items.current.indexOf(item);
      if (idx > -1) {items.current.splice(idx, 1);}
      return { item, delta: null };
    },

    [RealtimeEventType.ConversationItemInputAudioTranscriptionCompleted]: (event) => {
      const { item_id, content_index, transcript } = event;
      const item = itemLookup.current[item_id];
      const formattedTranscript = transcript || ' ';
      if (!item) {
        queuedTranscriptItems.current[item_id] = { transcript: formattedTranscript };
        return { item: null, delta: null };
      }
      item.content[content_index].transcript = transcript;
      item.formatted.transcript = formattedTranscript;
      return { item, delta: { transcript } };
    },

    [RealtimeEventType.InputAudioBufferSpeechStarted]: (event) => {
      const { item_id, audio_start_ms } = event;
      queuedSpeechItems.current[item_id] = { audio_start_ms };
      return { item: null, delta: null };
    },

    [RealtimeEventType.InputAudioBufferSpeechStopped]: (event, inputAudioBuffer) => {
      const { item_id, audio_end_ms } = event;
      if (!queuedSpeechItems.current[item_id]) {
        queuedSpeechItems.current[item_id] = { audio_start_ms: audio_end_ms };
      }
      const speech = queuedSpeechItems.current[item_id];
      speech.audio_end_ms = audio_end_ms;
      if (inputAudioBuffer) {
        const sIdx = Math.floor((speech.audio_start_ms * defaultFrequency) / 1000);
        const eIdx = Math.floor((speech.audio_end_ms * defaultFrequency) / 1000);
        speech.audio = inputAudioBuffer.slice(sIdx, eIdx);
      }
      return { item: null, delta: null };
    },

    [RealtimeEventType.ResponseCreated]: (event) => {
      const { response } = event;
      if (!responseLookup.current[response.id]) {
        responseLookup.current[response.id] = response;
        responses.current.push(response);
      }
      return { item: null, delta: null };
    },

    [RealtimeEventType.ResponseOutputItemAdded]: (event) => {
      const { response_id, item } = event;
      const response = responseLookup.current[response_id];
      if (!response) {throw new Error(`response.output_item.added: Response "${response_id}" not found`);}
      response.output.push(item.id);
      return { item: null, delta: null };
    },

    [RealtimeEventType.ResponseOutputItemDone]: (event) => {
      const { item } = event;
      if (!item) {throw new Error('response.output_item.done: Missing "item"');}
      const found = itemLookup.current[item.id];
      if (!found) {throw new Error(`response.output_item.done: Item "${item.id}" not found`);}
      found.status = item.status;
      return { item: found, delta: null };
    },

    [RealtimeEventType.ResponseContentPartAdded]: (event) => {
      const { item_id, part } = event;
      const item = itemLookup.current[item_id];
      if (!item) {throw new Error(`response.content_part.added: Item "${item_id}" not found`);}
      item.content.push(part);
      return { item, delta: null };
    },

    [RealtimeEventType.ResponseAudioTranscriptDelta]: (event) => {
      const { item_id, content_index, delta } = event;
      const item = itemLookup.current[item_id];
      if (!item) {throw new Error(`response.audio_transcript.delta: Item "${item_id}" not found`);}
      item.content[content_index].transcript += delta;
      item.formatted.transcript += delta;
      return { item, delta: { transcript: delta } };
    },

    [RealtimeEventType.ResponseAudioDelta]: (event) => {
      const { item_id, delta } = event;
      const item = itemLookup.current[item_id];
      if (!item) {throw new Error(`response.audio.delta: Item "${item_id}" not found`);}
      const ab = RealtimeUtils.base64ToArrayBuffer(delta);
      const appendValues = new Int16Array(ab);
      item.formatted.audio = RealtimeUtils.mergeInt16Arrays(item.formatted.audio, appendValues);
      return { item, delta: { audio: appendValues } };
    },

    [RealtimeEventType.ResponseTextDelta]: (event) => {
      const { item_id, content_index, delta } = event;
      const item = itemLookup.current[item_id];
      if (!item) {throw new Error(`response.text.delta: Item "${item_id}" not found`);}
      item.content[content_index].text += delta;
      item.formatted.text += delta;
      return { item, delta: { text: delta } };
    },

    [RealtimeEventType.ResponseFunctionCallArgumentsDelta]: (event) => {
      const { item_id, delta } = event;
      const item = itemLookup.current[item_id];
      if (!item) {throw new Error(`response.function_call_arguments.delta: Item "${item_id}" not found`);}
      item.arguments = (item.arguments || '') + delta;
      item.formatted.tool!.arguments += delta;
      return { item, delta: { arguments: delta } };
    },
  } as const;

  const processEvent = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: ConversationEventType, ...args: any[]) => {
      const proc = EventProcessors[event.type];
      if (!proc) {throw new Error(`No processor for event type "${event.type}"`);}
      const { item, delta } = proc(event, ...args);
      if (item || delta) {forceUpdate();}
      return { item, delta };
    },
    [forceUpdate],
  );

  const getItem = useCallback((id: string) => itemLookup.current[id] ?? null, []);
  const getItems = useCallback(() => [...items.current], []);

  return {
    items: getItems(),
    processEvent,
    clear,
    queueInputAudio,
    getItem,
    getItems,
  };
}
