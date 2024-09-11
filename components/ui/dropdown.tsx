// dropdown.tsx
import React, { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ children, open, onOpenChange }) => {
  return (
    <div className="relative">
      {React.cloneElement(children as React.ReactElement<any>, { open, onOpenChange })}
    </div>
  );
};

const DropdownButton = ({
  buttonText,
  DropdownContent,
}: {
  buttonText: string;
  DropdownContent?: React.ElementType;
}) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="relative w-fit h-fit">
      <button
        onClick={toggleDropdown}
        className="relative text-white bg-indigo-600 px-4 py-2 rounded-lg"
      >
        {buttonText}
      </button>
      <AnimatePresence>
        {open && DropdownContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 w-64 bg-white text-black shadow-xl rounded-lg"
            style={{ transform: "translateX(-50%)" }}
          >
            <DropdownContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default Dropdown;
