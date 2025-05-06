type BroadcastChannelMessageHandler<TInput = any> = (
  message: MessageEvent<TInput>
) => void;

interface UseBroadcastChannelProps<TInput> {
  channelName: string;
  messageHandler: BroadcastChannelMessageHandler<TInput>;
}

export type { UseBroadcastChannelProps, BroadcastChannelMessageHandler };
