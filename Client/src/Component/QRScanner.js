// QRScanner.js
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = ({ onScan }) => {
  const [scanResult, setScanResult] = useState('');

  // Function to handle successful scanning
  const handleResult = (result, error) => {
    if (!!result) {
      setScanResult(result?.text);
      onScan(result?.text); // Call the function passed via props with the scanned data
    }

    if (!!error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Scan QR Code</h2>
      <QrReader
        constraints={{ facingMode: 'environment' }} // Use the rear camera (if available)
        onResult={handleResult} // Updated event handler
        style={{ width: '100%' }}
      />
      <p>Scan Result: {scanResult}</p>
    </div>
  );
};

export default QRScanner;
