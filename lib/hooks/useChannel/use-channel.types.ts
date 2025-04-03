type ChannelMessageHandler<TInput = any> = (
  message: MessageEvent<TInput>
) => void;

interface UseChannelProps<TInput> {
  channelName: string;
  messageHandler: ChannelMessageHandler<TInput>;
}

export type { UseChannelProps, ChannelMessageHandler };
