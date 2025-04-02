import React from "react";

import {} from "~lib/utils/intl-date";
import { DateTimePicker } from "./components/ui/date-time-picker";
import { Card } from "./components/ui/card";

function App() {
  return (
    <main className="flex w-full min-h-screen items-center justify-center">
      <Card className="w-fit p-4">
        <DateTimePicker />
      </Card>
    </main>
  );
}

export default App;
