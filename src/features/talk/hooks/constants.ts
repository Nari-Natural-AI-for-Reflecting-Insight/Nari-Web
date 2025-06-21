export enum SessionStatus {
	Connecting = "CONNECTING",
	Connected = "CONNECTED", 
	Disconnected = "DISCONNECTED",
}

export enum SessionRole {
	User = "user",
	Assistant = "assistant",
}

export enum TranscriptItemStatus {
	InProgress = "IN_PROGRESS",
	Done = "DONE",
}

export enum ClientEventType {
	SessionUpdated = "client.session.update",
	InputAudioBufferAppend = "client.input_audio_buffer.append",
	ResponseCancel = "client.response.cancel",
	ConversationItemTruncate = "client.conversation.item.truncate",
}

export enum ServerEventType {
  ResponseCreated = 'server.response.created',
  ResponseOutputItemAdded = 'server.response.output_item.added',
  ResponseContentPartAdded = 'server.response.content_part.added',
  InputAudioBufferSpeechStarted = 'server.input_audio_buffer.speech_started',
  ConversationItemCreated = 'server.conversation.item.created',
  ConversationItemTruncated = 'server.conversation.item.truncated',
  ConversationItemDeleted = 'server.conversation.item.deleted',
  ConversationItemInputAudioTranscriptionDone = 'server.conversation.item.input_audio_transcription.completed',
  ResponseAudioTranscriptDelta = 'server.response.audio_transcript.delta',
  ResponseAudioDelta = 'server.response.audio.delta',
  ResponseTextDelta  = 'server.response.text.delta',
  ResponseFunctionCallArgumentsDelta = 'server.response.function_call_arguments.delta',
  ResponseOutputItemDone = 'server.response.output_item.done',
}

export enum TalkEventType {
	ResponseCancel = "response.cancel",
	SessionUpdated = "session.update",
	TalkUpdated= "talk.updated",
	TalkInterrupted = "talk.interrupted",
	TalkItemAppended = "talk.item.appended",
	TalkItemCompleted = "talk.item.completed",
}

export enum TalkItemStatus {
	completed = 'completed',
}

export enum TurnDetectionType {
	ServerVad = 'server_vad',
}

export enum AudioTransactionModel {
	Whisper1 = 'whisper-1',
}

export enum TalkSessionStatus {
	Idle = 'idle',
	Connecting = 'connecting',
	Connected = 'connected',
}

export enum ServerItemType {
	Message = 'message',
	FunctionCall = 'function_call',
	FunctionCallOutput = 'function_call_output',
}

export enum ItemStatus {
	InProgress = 'in_progress',
	Completed = 'completed',
}