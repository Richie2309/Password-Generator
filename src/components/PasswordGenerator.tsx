import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

const generatePassword = (
  length: number,
  options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }
) => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;':,.<>?";
  
  let characters = "";
  if (options.uppercase) characters += uppercase;
  if (options.lowercase) characters += lowercase;
  if (options.numbers) characters += numbers;
  if (options.symbols) characters += symbols;
  
  if (!characters) return ""; // No options selected

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};

const getStrength = (length: number) => {
  if (length < 8) return "Weak";
  if (length < 12) return "Moderate";
  return "Very strong";
};

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>("1incFureqsNyejw");
  const [length, setLength] = useState<number>(15);
  const [isCopied, setIsCopied] = useState(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const strength = getStrength(length);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center p-8 font-sans text-gray-800">
      <h1 className="text-4xl font-bold mb-2">Random Password Generator</h1>
      <p className="mb-6 text-gray-500">Create strong and secure passwords to keep your account safe online.</p>
      
      <div className="w-full max-w-md mb-8">
        {/* Password Display */}
        <div className="flex items-center bg-gray-100 p-4 rounded-lg">
          <input
            type="text"
            readOnly
            value={password}
            className="flex-grow bg-gray-100 text-lg outline-none text-gray-800"
          />
          <span className={`px-3 py-1 text-sm font-semibold rounded-md ml-4 ${
            strength === "Very strong" 
              ? "bg-green-200 text-green-800" 
              : strength === "Moderate" 
                ? "bg-yellow-200 text-yellow-800" 
                : "bg-red-200 text-red-800"
          }`}>
            {strength}
          </span>
          <button
            onClick={handleGeneratePassword}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            🔄
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`mt-4 w-full flex items-center justify-center py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
            isCopied 
              ? "bg-green-500 hover:bg-green-600 text-white" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isCopied ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 mr-2" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Password Length Slider */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <label className="text-lg">Password length:</label>
        <span className="text-lg font-semibold">{length}</span>
      </div>
      <div className="flex items-center w-full max-w-md mb-8">
        <button
          onClick={() => setLength(length > 4 ? length - 1 : 4)}
          className="bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-400 font-bold"
        >
          -
        </button>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="flex-grow mx-4"
        />
        <button
          onClick={() => setLength(length < 20 ? length + 1 : 20)}
          className="bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-400 font-bold"
        >
          +
        </button>
      </div>

      {/* Character Options */}
      <div className="flex justify-between w-full max-w-md mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
            className="mr-2"
          />
          <span className="font-semibold">ABC</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.lowercase}
            onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
            className="mr-2"
          />
          <span className="font-semibold">abc</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.numbers}
            onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
            className="mr-2"
          />
          <span className="font-semibold">123</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.symbols}
            onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
            className="mr-2"
          />
          <span className="font-semibold">#$&</span>
        </label>
      </div>
    </div>
  );
};

export default PasswordGenerator;