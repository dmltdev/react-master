"use client";

import { useEffect, useMemo } from "react";
import { UseBroadcastChannelProps } from "./use-broadcast-channel.types";

const useBroadcastChannel = <TInput = any>({
  channelName,
  messageHandler,
}: UseBroadcastChannelProps<TInput>) => {
  const channel = useMemo(
    () => new BroadcastChannel(channelName),
    [channelName]
  );
  const receiveChannel = useMemo(
    () => new BroadcastChannel(channelName),
    [channelName]
  );

  const broadcast = (message: TInput) => channel.postMessage(message);

  useEffect(() => {
    channel.addEventListener("message", messageHandler);
    receiveChannel.addEventListener("message", messageHandler);

    return () => {
      channel.removeEventListener("message", messageHandler);
      receiveChannel.removeEventListener("message", messageHandler);
    };
  }, [channel, receiveChannel, messageHandler]);

  return { broadcast };
};

export { useBroadcastChannel };
