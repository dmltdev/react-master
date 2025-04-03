import { useState } from "react";

import { DateTimePicker } from "./components/ui/date-time-picker";
import { Card } from "./components/ui/card";

import { useChannel } from "~lib/hooks";

function App() {
  const [value, setValue] = useState(0);

  const { broadcast } = useChannel<number>({
    channelName: "count-channel",
    messageHandler: (message: MessageEvent<number>) => {
      setValue(message.data);
    },
  });

  return (
    <main className="flex w-full min-h-screen items-center justify-center">
      <Card className="w-fit p-4">
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
  );
}

export default App;
