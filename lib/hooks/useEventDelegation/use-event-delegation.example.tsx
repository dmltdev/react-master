import React from "react";
import useEventDelegation from "./use-event-delegation";

/**
 * Example component using useEventDelegation to handle clicks on list items.
 */
const EventDelegationExample: React.FC = () => {
  const handleItemClick = (event: Event, target: Element) => {
    alert(`Clicked on: ${(target as HTMLElement).textContent}`);
  };

  const listRef = useEventDelegation<HTMLUListElement>(
    ".item",
    handleItemClick,
    "click"
  );

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md my-4">
      <h2 className="text-lg font-bold">Event Delegation Example</h2>
      <ul ref={listRef}>
        <li className="item">Apple</li>
        <li className="item">Banana</li>
        <li className="item">Cherry</li>
        <li>Not clickable</li>
      </ul>
    </div>
  );
};

export { EventDelegationExample };
