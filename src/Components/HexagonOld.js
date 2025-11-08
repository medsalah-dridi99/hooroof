import React, { useState } from "react";
import { ButtonBase, Typography } from "@mui/material";
import Swal from "sweetalert2";

const Hexagon = ({ letter }) => {
  const [bgColor, setBgColor] = useState("#fff8dc");
  const [usedQuestions, setUsedQuestions] = useState([]);

  
  const questions = [
    " ما هو أكبر كوكب في المجموعة الشمسية؟",
    "من هو مخترع الهاتف؟",
    " في أي سنة وُلد الرسول ﷺ؟",
    " ما هي عاصمة اليابان؟",
    " ما هو عدد سور القرآن الكريم؟",
    "من كتب رواية البؤساء؟",
    " ما هو البحر الذي يفصل بين آسيا وأفريقيا؟",
    "كم عدد ألوان قوس قزح؟",
    "من أول من صعد إلى القمر؟",
    "ما هو أصغر قارة في العالم؟",
  ];

  const getRandomQuestion = () => {
    const remaining = questions.filter((_, i) => !usedQuestions.includes(i));
    if (remaining.length === 0) {
    }
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const selectedQuestion = remaining[randomIndex];
    const selectedIndex = questions.indexOf(selectedQuestion);

    setUsedQuestions([...usedQuestions, selectedIndex]);

    Swal.fire({
      title: "سؤال جديد",
      text: selectedQuestion,
      confirmButtonText: "تمام",
    });
  };

  const handleClick = () => {
    Swal.fire({
      title: "اختر ما تريد فعله مع الحرف",
      html: `<div style="
        width: 60px;
        height: 60px;
        line-height: 60px;
        border-radius: 50%;
        background-color: #1976d2;
        color: white;
        font-size: 30px;
        font-weight: bold;
        margin: 0 auto;
      ">${letter}</div>`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "تلوين أزرق",
      denyButtonText: "تلوين أحمر",
      cancelButtonText: "خيارات أخرى",
    }).then((result) => {
      if (result.isConfirmed) {
        setBgColor("blue");
      } else if (result.isDenied) {
        setBgColor("red");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "خيارات إضافية",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "حذف اللون",
          denyButtonText: "سؤال جديد",
          cancelButtonText: "إلغاء",
        }).then((res2) => {
          if (res2.isConfirmed) {
            setBgColor("#fff8dc");
          } else if (res2.isDenied) {
            getRandomQuestion();
          }
        });
      }
    });
  };

  return (
    <ButtonBase
      onClick={handleClick}
      sx={{
        width: 100,
        height: 100,
        backgroundColor: bgColor,
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        cursor: "pointer",
        border: "none",
        outline: "none",
        "&:hover": {
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        },
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: 50, color: "black" }}>
        {letter}
      </Typography>
    </ButtonBase>
  );
};

export default Hexagon;
