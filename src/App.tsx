import { useState } from "react";

import { DateTimePicker } from "./components/ui/date-time-picker";
import { Card } from "./components/ui/card";

import { ErrorBoundary } from "~lib/components";
import { useBroadcastChannel, useErrorListen } from "~lib/hooks";

function FallbackUI() {
  return <h2>Something went wrong. Please refresh.</h2>;
}

function App() {
  useErrorListen((error) => {
    const message = error instanceof Error ? error.message : error;
    console.log(message);
  });

  const [value, setValue] = useState(0);

  const { broadcast } = useBroadcastChannel<number>({
    channelName: "count-channel",
    messageHandler: (message: MessageEvent<number>) => {
      setValue(message.data);
    },
  });

  return (
    <ErrorBoundary fallback={FallbackUI}>
      <main className="flex w-full min-h-screen items-center justify-center">
        <Card className="w-fit p-4">
          <button
            className="border-2 border-red-500 rounded-sm text-black text-lg"
            onClick={() => {
              throw new Error("💥 This is a test error");
            }}
          >
            Trigger Error
          </button>
          <DateTimePicker />
          <div className="card">
            <button
              className="px-2 py-1 border border-black rounded-md hover:bg-gray-200 transition-all duration-300"
              onClick={() => broadcast(value + 1)}
            >
              count is {value}
            </button>
          </div>
        </Card>
      </main>
    </ErrorBoundary>
  );
}

export default App;
