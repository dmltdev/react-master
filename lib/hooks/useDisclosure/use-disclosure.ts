"use client";

import { useState, useCallback } from "react";

/**
 * React hook to manage the open/close state of a disclosure component.
 *
 * @param {Object} [options]
 * @param {boolean} [options.defaultIsOpen=false] - Whether the disclosure is open by default.
 * @returns {{
 *   isOpen: boolean,
 *   onOpen: () => void,
 *   onClose: () => void,
 *   onToggle: () => void
 * }} State and handlers for controlling the disclosure.
 */
function useDisclosure({
  defaultIsOpen = false,
}: { defaultIsOpen?: boolean } = {}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(
    () => setIsOpen((currentValue) => !currentValue),
    []
  );

  return { onOpen, onClose, isOpen, onToggle };
}

export { useDisclosure };
