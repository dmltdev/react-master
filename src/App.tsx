import { Card } from "./components/ui/card";
import { ErrorBoundary } from "~lib/components";
import { useErrorListen } from "~lib/hooks";

import { RefMapExample } from "~lib/hooks/useRefMap/use-ref-map.example";

function FallbackUI() {
  return <h2>Something went wrong. Please refresh.</h2>;
}

function App() {
  useErrorListen((error) => {
    const message = error instanceof Error ? error.message : error;
    console.log(message);
  });

  return (
    <ErrorBoundary fallback={FallbackUI}>
      <main className="flex w-full min-h-screen items-center justify-center">
        <Card className="w-fit p-4">
          <div className="card">
            <RefMapExample />
          </div>
        </Card>
      </main>
    </ErrorBoundary>
  );
}

export default App;
