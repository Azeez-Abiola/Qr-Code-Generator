import React, { useState, useEffect } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { AlertCircle, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Label } from "./label";

const QrCodeGenerator = () => {
  const [input, setInput] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(200);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const generateQRCode = async () => {
    if (!input.trim()) {
      setError("Please enter a valid text or URL");
      setQRCode("");
      return;
    }

    setLoading(true);
    setError("");

    // Append UTM parameters to the URL
    const urlWithParams = `${input}?utm_source=qr_code&utm_medium=print&utm_campaign=campaign_name`;

    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=${encodeURIComponent(
          color.slice(1)
        )}&bgcolor=${encodeURIComponent(bgColor.slice(1))}&qzone=1&margin=0&data=${encodeURIComponent(
          urlWithParams
        )}&ecc=${errorCorrectionLevel}`
      );
      if (response.ok) {
        const newQRCode = response.url;
        setQRCode(newQRCode);
        setHistory((prev) => [newQRCode, ...prev.slice(0, 4)]);
      } else {
        throw new Error("Failed to generate QR code");
      }
    } catch (err) {
      setError("An error occurred while generating the QR code. Please try again.");
      setQRCode("");
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = async (format) => {
    if (!qrCode) return;

    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=${encodeURIComponent(
          color.slice(1)
        )}&bgcolor=${encodeURIComponent(bgColor.slice(1))}&qzone=1&margin=0&data=${encodeURIComponent(
          input
        )}&ecc=${errorCorrectionLevel}&format=${format}`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `qrcode.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(`Failed to download QR code as ${format.toUpperCase()}. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-end p-4">
        <Button onClick={toggleTheme}>
        </Button>
      </div>
      <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <CardHeader className="bg-blue-700 text-white">
          <CardTitle className="text-2xl font-bold text-center">QR Code Generator</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="input" className="text-lg font-semibold text-black">Text or URL</Label>
              <Input
                id="input"
                type="text"
                placeholder="Enter text or URL"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 text-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color" className="text-black">QR Code Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-12 p-1 rounded"
                  />
                  <span className="text-sm font-medium text-black">{color}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bgColor" className="text-black">Background Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 p-1 rounded"
                  />
                  <span className="text-sm font-medium text-black">{bgColor}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size" className="text-black">QR Code Size: {size}x{size}</Label>
              <input
                id="size"
                type="range"
                min={100}
                max={1000}
                step={10}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="errorCorrection" className="text-black">Error Correction Level</Label>
              <div className="relative">
                <select
                  id="errorCorrection"
                  value={errorCorrectionLevel}
                  onChange={(e) => setErrorCorrectionLevel(e.target.value)}
                  className="block appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
            <Button onClick={generateQRCode} className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
              Generate QR Code
            </Button>
            {loading && (
              <div className="flex justify-center mt-4">
                <div className="preloader"></div>
              </div>
            )}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {qrCode && (
              <div className="space-y-4 mt-4">
                <div className="flex justify-center">
                  <img src={qrCode} alt="Generated QR Code" className="border rounded-lg shadow-md" />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => downloadQRCode("png")} className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button onClick={() => downloadQRCode("svg")} className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    <Download className="w-4 h-4 mr-2" />
                    Download SVG
                  </Button>
                </div>
              </div>
            )}
            {history.length > 0 && (
              <div className="space-y-2 mt-4">
                <Label className="text-black">Recent QR Codes</Label>
                <div className="flex space-x-2 overflow-x-auto">
                  {history.map((url, index) => (
                    <img key={index} src={url} alt={`Recent QR Code ${index + 1}`} className="w-16 h-16 border rounded shadow-sm" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeGenerator;