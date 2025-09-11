import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ExpanseButton = ({ className, onClick,children }) => {
  return (
    <Button className={`bg-gradient-to-br from-[#0dd1b7] to-[#177aec]  ${className}`} onClick={onClick}>
      <span>
        <Plus />
      </span>
      {children}
    </Button>
  );
};

export default ExpanseButton;
