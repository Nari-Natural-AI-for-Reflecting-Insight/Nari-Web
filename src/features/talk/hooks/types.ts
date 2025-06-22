import { ItemStatus, ServerItemType, SessionRole, TalkEventType } from "./constants";

export type TalkUpdatedEvent =  {
  item: {
    id: string;
  };
  delta: ItemContentDelta | null;
}

export type ServerEvent = {
  type: string;
  event_id?: string;
  item_id?: string;
  transcript?: string;
  delta?: string;
  data?: unknown;
  session?: {
    id?: string;
  };
  item?: ServerItem;
  response?: {
    output?: {
      type?: string;
      name?: string;
      arguments?: unknown;
      call_id?: string;
    }[];
    status_details?: {
      error?: unknown;
    };
  };
}

export type TalkEvent = {
  [TalkEventType.TalkUpdated]: TalkUpdatedEvent;

  [event: string]: unknown,
}

export enum RealtimeEventType {
  ConversationItemCreated = 'conversation.item.created',
  ConversationItemTruncated = 'conversation.item.truncated',
  ConversationItemDeleted = 'conversation.item.deleted',
  ConversationItemInputAudioTranscriptionCompleted = 'conversation.item.input_audio_transcription.completed',
  InputAudioBufferSpeechStarted = 'input_audio_buffer.speech_started',
  InputAudioBufferSpeechStopped = 'input_audio_buffer.speech_stopped',
  ResponseCreated = 'response.created',
  ResponseOutputItemAdded = 'response.output_item.added',
  ResponseOutputItemDone = 'response.output_item.done',
  ResponseContentPartAdded = 'response.content_part.added',
  ResponseAudioTranscriptDelta = 'response.audio_transcript.delta',
  ResponseAudioDelta = 'response.audio.delta',
  ResponseTextDelta = 'response.text.delta',
  ResponseFunctionCallArgumentsDelta = 'response.function_call_arguments.delta',
}

export type ItemContentDelta = {
  text?: string;
  audio?: Int16Array;
  arguments?: string;
  transcript?: string;
}

export type ServerItem = {
  id: string;
  type: ServerItemType;
  role?: SessionRole;
  name?: string;
  call_id?: string;
  arguments?: string;
  output?: unknown;
  status?: ItemStatus;
  content: { type: string; text?: string; transcript?: string }[];
  formatted: {
    audio: Int16Array;
    text: string;
    transcript: string;
    tool?: { type: 'function'; name: string; call_id: string; arguments: string };
    output?: unknown;
  };
}
