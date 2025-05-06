"use client";

import { useState } from "react";
import { useBroadcastChannel } from "./use-broadcast-channel";

function BroadcastChannelExample() {
  const [value, setValue] = useState(0);

  const { broadcast } = useBroadcastChannel<number>({
    channelName: "count-channel",
    messageHandler: (message) => {
      setValue(message.data);
    },
  });

  return (
    <div>
      <button
        type="button"
        className="rounded-md border px-4 py-1"
        onClick={() => broadcast(value + 1)}
      >
        Broadcast {value}
      </button>
    </div>
  );
}

export { BroadcastChannelExample };
