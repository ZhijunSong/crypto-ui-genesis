
import React, { useState, useRef, useEffect } from "react";

type VerificationCodeInputProps = {
  digits: number;
  onComplete: (code: string) => void;
};

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  digits = 6,
  onComplete,
}) => {
  const [code, setCode] = useState<string[]>(Array(digits).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-advance to next input
    if (value && index < digits - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if code is complete
    if (newCode.every(val => val !== "") && !newCode.includes("")) {
      onComplete(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < digits - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, digits).split("");
    
    if (pastedData) {
      const newCode = [...code];
      for (let i = 0; i < pastedData.length && i < digits; i++) {
        if (/^\d$/.test(pastedData[i])) {
          newCode[i] = pastedData[i];
        }
      }
      setCode(newCode);
      
      // Focus on the next empty input or last input
      const nextEmptyIndex = newCode.findIndex(val => !val);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[digits - 1]?.focus();
      }

      if (!newCode.includes("")) {
        onComplete(newCode.join(""));
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full gap-2 mb-4">
        {Array.from({ length: digits }).map((_, index) => (
          <div
            key={index}
            className="relative w-full aspect-square border border-gmgn-green rounded-lg overflow-hidden"
          >
            <input
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              value={code[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-full h-full text-center text-xl font-bold bg-gmgn-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gmgn-green`}
              maxLength={1}
              inputMode="numeric"
              autoFocus={index === 0}
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-end w-full">
        <button 
          className="text-gray-400 hover:text-gmgn-green"
          disabled={timer > 0}
        >
          Resend ({timer > 0 ? `${timer} seconds` : "Resend"})
        </button>
      </div>
      
      <button 
        className="w-full py-3 bg-white text-black font-bold text-xl rounded-lg mt-6"
        onClick={() => onComplete(code.join(""))}
      >
        Next
      </button>
      
      <p className="text-gray-400 mt-4 text-center">
        Verification code is valid for 5 minutes. Haven't received it? Click 'Resend'
      </p>
    </div>
  );
};

export default VerificationCodeInput;
