import { Loader } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  text: string;
  className?: string;
};

const LoaderSpin = ({ text, className }: Props) => {
  return (
    <Button className={`${className}`}>
      <Loader className="h-4 w-4 mr-2 animate-spin" />
      {text}
    </Button>
  );
};

export default LoaderSpin;
