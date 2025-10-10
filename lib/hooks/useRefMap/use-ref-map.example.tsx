import React from "react";
import { useRefMap } from "./use-ref-map";

/**
 * Example component demonstrating the useRefMap hook
 *
 * This component renders a list of input fields and allows accessing
 * each input element by its ID using the useRefMap hook.
 */
export const RefMapExample: React.FC = () => {
  const [inputRefs, setInputRef] = useRefMap<HTMLInputElement>();

  const items = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
  ];

  const focusInput = (id: string) => {
    if (inputRefs.current[id]) {
      inputRefs.current[id]?.focus();
    }
  };

  const logAllValues = () => {
    const values: Record<string, string> = {};

    Object.entries(inputRefs.current).forEach(([id, element]) => {
      if (element) {
        values[id] = element.value;
      }
    });

    console.log("Current input values:", values);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">useRefMap Example</h2>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-row items-center gap-2">
            <label className="w-20" htmlFor={item.id}>{item.label}:</label>
            <input
              id={item.id}
              type="text"
              ref={setInputRef(item.id)}
              className="p-2 border rounded-md"
              placeholder={`Enter ${item.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h3>Actions</h3>
        <div className="flex flex-row gap-2">
          {items.map((item) => (
            <button
              key={`focus-${item.id}`}
              className="px-4 py-2 border rounded-md bg-gray-50 cursor-pointer"
              onClick={() => focusInput(item.id)}
            >
              Focus {item.label}
            </button>
          ))}
          <button className="px-4 py-2 border rounded-md bg-gray-50" onClick={logAllValues}>Log All Values</button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">How It Works</h3>
        <p>
          The <code className="text-blue-500">useRefMap</code> hook provides a way to manage multiple refs
          using a key-based approach. This is particularly useful when working
          with dynamic lists or when you need to access multiple DOM elements.
        </p>
        <p>In this example:</p>
        <ul>
          <li>
            We create refs for multiple input fields using their IDs as keys
          </li>
          <li>
            We can access any input element using{" "}
            <code>inputRefs.current[id]</code>
          </li>
          <li>
            The <code>setInputRef</code> function creates a ref callback for
            each element
          </li>
          <li>
            We demonstrate practical usage with focus and value extraction
            functions
          </li>
        </ul>
      </div>
    </div>
  );
};
