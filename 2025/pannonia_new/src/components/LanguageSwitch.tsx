import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "./Language";
import { Globe } from "lucide-react";

interface LanguageSwitchProps {
  isMobile?: boolean;
}

const LanguageSwitch = ({ isMobile = false }: LanguageSwitchProps) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLang: "ro" | "en" | "hu") => {
    setLanguage(newLang);
  };

  const getCurrentLanguageLabel = () => {
    switch (language) {
      case "ro":
        return "Română";
      case "en":
        return "English";
      case "hu":
        return "Magyar";
      default:
        return "Română";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-2 ${
            isMobile ? "w-full justify-start pl-4" : ""
          }`}
        >
          <Globe className="h-4 w-4" />
          <span className="capitalize">
            {getCurrentLanguageLabel()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isMobile ? "start" : "end"}>
        <DropdownMenuItem onClick={() => handleLanguageChange("ro")}>
          <img
            src="/flags/ro.svg"
            alt="Română"
            className="w-5 h-3 mr-2 rounded-sm object-cover"
          />
          {"Română"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          <svg
            viewBox="0 0 60 30"
            className="w-5 h-3 mr-2 rounded-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="60" height="30" fill="#012169" />
            <g stroke="#FFF" strokeWidth="6">
              <path d="m0,0 60,30 m0,-30 -60,30" />
            </g>
            <g stroke="#C8102E" strokeWidth="4">
              <path d="m0,0 60,30 m0,-30 -60,30" />
            </g>
            <path stroke="#FFF" strokeWidth="10" d="M30,0 v30 M0,15 h60" />
            <path stroke="#C8102E" strokeWidth="6" d="M30,0 v30 M0,15 h60" />
          </svg>
          {"English"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("hu")}>
          <svg
            viewBox="0 0 60 30"
            className="w-5 h-3 mr-2 rounded-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="60" height="10" fill="#CE2939" />
            <rect width="60" height="10" y="10" fill="#FFFFFF" />
            <rect width="60" height="10" y="20" fill="#436F4D" />
          </svg>
          {"Magyar"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitch;