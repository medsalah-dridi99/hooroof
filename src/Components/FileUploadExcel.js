import React, { useState } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { useLocation } from "wouter";
const FileUploadExcel = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [jsonData, setJsonData] = useState([]); // نخزّن بيانات الملف
const [location, setLocation] = useLocation();
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const dataJson = XLSX.utils.sheet_to_json(worksheet, { header: ["question","reponse","lettre"], defval: "" });

      setJsonData(dataJson); // نخزّن البيانات
      setFileUploaded(true);
      setFileName(file.name);

      Swal.fire({
        icon: 'success',
        title: 'تم تحميل الملف بنجاح',
        text: `تم تحميل ${file.name}`,
        confirmButtonColor: '#3085d6',
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const startGame = () => {
    // 1. نفضي localStorage
    localStorage.clear();

    // 2. نحط البيانات من السطر 1 فما بعد (نتجاهل السطر 0)
    jsonData.slice(1).forEach((row, index) => {
      // نخزّن كل سطر كمفتاح "row-X"
      localStorage.setItem(`row-${index + 1}`, JSON.stringify(row));
    });

    setLocation("/gamerow");
  };

  const resetFile = () => {
    setFileUploaded(false);
    setFileName("");
    setJsonData([]);
  };

  return (
    <div style={{
      padding: 30,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to right, #6a11cb, #2575fc)",
      borderRadius: 15,
      width: "400px",
      margin: "50px auto",
      boxShadow: "0 8px 16px rgba(0,0,0,0.3)"
    }}>
      <h2 style={{ color: "white", marginBottom: 30 }}>تحميل ملف Excel</h2>

      {!fileUploaded && (
        <>
          <label 
            htmlFor="fileUpload" 
            style={{
              display: "inline-block",
              padding: "12px 25px",
              backgroundColor: "#fff",
              color: "#2575fc",
              fontWeight: "bold",
              borderRadius: 10,
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              textAlign: "center"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
          >
            اختر ملف Excel
          </label>
          <input 
            id="fileUpload"
            type="file" 
            accept=".xlsx, .xls" 
            onChange={handleFileUpload} 
            style={{ display: "none" }}
          />
        </>
      )}

      {fileUploaded && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <p style={{ color: "white", fontWeight: "bold" }}>تم تحميل: {fileName}</p>
          <button
            onClick={resetFile}
            style={{
              padding: "10px 20px",
              backgroundColor: "#fff",
              color: "#2575fc",
              fontWeight: "bold",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
          >
            تحميل ملف آخر
          </button>

          <button
            onClick={startGame}
            style={{
              padding: "10px 20px",
              backgroundColor: "#00ff00",
              color: "#000",
              fontWeight: "bold",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#32cd32"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#00ff00"}
          >
            ابدأ اللعبة
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadExcel;
