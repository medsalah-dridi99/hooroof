import React ,{useState,useEffect} from "react";
import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import QuadBackground from "./QuadBackground";
import myImage from "../Data/image.png";
import Hexagon from "./Hexagon";
import textdef from "../Data/TexteDef";
import BoxSxColorCh from "../Styles/BoxSxColorCh";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check';
function Typewriter({ text, speed = 1000 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  const lines = displayedText.split('\n');

  return (
    <div 
    style={{marginTop:10}}
    >
    <p style={{ 
      color: 'white', 
      whiteSpace: 'pre-wrap', 
      margin: 0, 
      textAlign: 'center',
      direction: "rtl"
    }}>
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
    </div>
  );
}

const GameRow = () => {
  const [teamName, setTeamName] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [open, setOpen] = useState(false);
  const [showDiv1, setShowDiv1] = useState(false); 
const [showDiv2, setShowDiv2] = useState(true); 
const [selectedLetter,setSelectedLetter]=useState([]) ;
const[e,setE]=useState(0);
const[e1,setE1]=useState(0);
const[e2,setE2]=useState(0);
const[ne1,setNe1]=useState();
const[ne2,setNe2]=useState();
const[eqs,setEqs]=useState(true);
const[quest,setQuest]=useState();
const[rep,setRep]=useState();
const toggleDivs = (cell,index) => {
  if(showDiv2){
    setShowDiv1(true);   
  setShowDiv2(false); 
  }
setSelectedLetter([cell,index]);
   
};
const loadQuestionsFromStorage = () => {
  let list = [];

  for (let i = 1; i <= localStorage.length; i++) {
    const item = localStorage.getItem(`row-${i}`);
    if (item) {
      const parsed = JSON.parse(item);
      if (parsed.question && parsed.reponse && parsed.lettre) {
        list.push(parsed);
      }
    }
  }

  return list;
};
 const handleAddName = () => {
    if (teamName.trim() === "") return;

    if (editIndex !== null) {
      const updatedList = [...teamList];
      updatedList[editIndex] = teamName;
      setTeamList(updatedList);
      setEditIndex(null);
    } else {
      setTeamList([...teamList, teamName]);
    }
    setTeamName("");
  };

  const handleEditName = (index) => {
    setTeamName(teamList[index]);
    setEditIndex(index);
  };

  const handleDeleteName = (index) => {
    const updatedList = teamList.filter((_, i) => i !== index);
    setTeamList(updatedList);
  };
const questionsList = loadQuestionsFromStorage();


const arabicLetters = [
  "ا", "ب", "ت", "ث", "ج", "ح", "خ",
  "د", "ذ", "ر", "ز", "س", "ش", "ص",
  "ض", "ط", "ظ", "ع", "غ", "ف", "ق",
  "ك", "ل", "م", "ن", "ه", "و", "ي"
];
const getRandomArabicLetters = () => {
  const letters = [...arabicLetters]; // نسخة من المصفوفة الأصلية
  const selected = [];

  while (selected.length < 25) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    selected.push(letters[randomIndex]);
    letters.splice(randomIndex, 1); // نحذف الحرف المختار
  }

 return [...selected, ...letters];
};


async function changeQuest() {
  if (!selectedLetter[0]) return; // إذا ما تمش اختيار حرف
  const currentLetter = selectedLetter[0].letter;

  // فلترة الأسئلة اللي نفس الحرف
  let filteredQuestions = questionsList.filter(q => q.lettre === currentLetter);

  // جلب الأسئلة اللي تم طرحها مسبقًا من localStorage
  let asked = JSON.parse(localStorage.getItem("askedQuestions")) || [];

  // فلترة الأسئلة اللي ما ظهرتش بعد
  filteredQuestions = filteredQuestions.filter(q => !asked.includes(q.question));

  if (filteredQuestions.length === 0) {
    setQuest("لا يوجد سؤال جديد لهذا الحرف");
    setRep("");
    return;
  }

  // اختيار سؤال عشوائي
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  const randomQuestion = filteredQuestions[randomIndex];

  setQuest(randomQuestion.question);
  setRep(randomQuestion.reponse);

  // إضافة السؤال لليستة وحفظه في localStorage
  asked.push(randomQuestion.question);
  localStorage.setItem("askedQuestions", JSON.stringify(asked));
}



const [lettersGrid2,setLettersGrid2] = useState(() => {
  const arabicLettersUsed = getRandomArabicLetters();
  const withColor = arabicLettersUsed.map(letter => ({
    letter: letter,
    color: "#fff8dc"
  }));
  return withColor;
});

const changeColor = (col,nb) => {
  let newCells=[...lettersGrid2]
  if(nb==0){
    if(selectedLetter[0].color=="red"){
      setE2(e2-1);
    }else if(selectedLetter[0].color=="blue"){setE1(e1-1)};
  }else if((nb==1)&&(selectedLetter[0].color!="blue")){
    setE(e+1);
    if(selectedLetter[0].color=="red"){
      setE2(e2-1);
      setE1(e1+1);
    }else setE1(e1+1);
  }else if((nb==2)&&(selectedLetter[0].color!="red")) {
    setE(e+1);
    if(selectedLetter[0].color=="blue"){
      setE2(e2+1);
      setE1(e1-1);
    }else setE2(e2+1);
  }
  newCells[selectedLetter[1]].color=col
  setLettersGrid2(newCells)

};
const changePlace = (cell, index) => {
  setOpen(false)
  Swal.fire({
    title: `هل تريد حقا تغيير حرف "${selectedLetter[0]?.letter}" بحرف "${cell.letter}" ؟`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "تأكيد",
    cancelButtonText: "رفض",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      let selletter=[...selectedLetter]
      selletter[1]=index
      let newCells=[...lettersGrid2]
      newCells[selectedLetter[1]]=cell
      newCells[index]=selectedLetter[0]
      setSelectedLetter(selletter)
      setLettersGrid2(newCells)
    } else {
      setOpen(true)
    }
  });
};
const resetGrid = () => {
  setE(0)
  setE1(0)
  setE2(0)
  const arabicLettersUsed = getRandomArabicLetters();
  const withColor = arabicLettersUsed.map(letter => ({
    letter: letter,
    color: "#fff8dc"
  }));

  setSelectedLetter([]);
  setLettersGrid2(withColor)
  if(showDiv1){
    setShowDiv1(false);   
  setShowDiv2(true); 
  }
};

  return (
    <div 
    style={{
      display:"flex",
      flexDirection: "column",
       width: "1500px",
    height: "750px",
  }}
    >
   <div 
  style={{
    display: "flex",
    width: "1500px",
    height: "600px",
    background: "linear-gradient(to right, #000080, #00ffff)",
  }}
>
    <div style={{ position: "relative", width: 800, height: 200 }}>
    
      <QuadBackground />
      <div style={{margin:10}}>
     <button 
      style={{
       background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    width: 75,   // نفس العرض متاع Box
    height: 75,  // نفس الطول متاع Box
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
      }}
      onClick={resetGrid}
    >
  <BoxSxColorCh main={'#00ff00'} dark={'#32cd32'} text={'اعادة ترتيب'} Icon={ChangeCircleIcon} textCol={'black'}/>
  </button>
  <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        width: 180,
        height: 400,
        position: "absolute",
        background: "linear-gradient(to bottom, #808080, #000000)",
        borderRadius: 8,
        top: "40%",
        left: "1%",
        justifyContent: "space-around",
        padding: "10px",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.2)",
          textAlign: "center",
          padding: "4px 0",
          borderRadius: "5px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#800000",
          zIndex: 10,
        }}
      >
       {ne2}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
        }}
      >
       
        <input
          type="text"
          placeholder="اكتب الاسم..."
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          style={{
            padding: "4px 6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "120px",
            textAlign: "center",
            fontSize: "12px",
          }}
        />
        <button
          onClick={handleAddName}
          style={{
            padding: "4px 8px",
            backgroundColor: editIndex !== null ? "#28a745" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "11px",
            transition: "0.3s",
          }}
        >
          {editIndex !== null ? "تحديث" : "تم"}
        </button>
      </div>

      <div
        style={{
          width: "100%",
          height: "300px",
          overflowY: "auto",
        }}
      >
        {teamList.map((team, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "4px 6px",
              borderRadius: "5px",
              marginBottom: "4px",
              boxShadow: "0 0 2px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                maxWidth: "120px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "12px",
              }}
            >
              {team}
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                onClick={() => handleEditName(index)}
                style={{
                  padding: "2px 6px",
                  backgroundColor: "#ffc107",
                  color: "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "10px",
                }}
              >
                تعديل
              </button>
              <button
                onClick={() => handleDeleteName(index)}
                style={{
                  padding: "2px 6px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "10px",
                }}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
   <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        width: 180,
        height: 400,
        position: "absolute",
        background: "linear-gradient(to bottom, #808080, #000000)",
        borderRadius: 8,
        top: "40%",
        left: "99%",
        justifyContent: "space-around",
        padding: "10px",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.2)",
          textAlign: "center",
          padding: "4px 0",
          borderRadius: "5px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#0000cd",
          zIndex: 10,
        }}
      >
       {ne1}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
        }}
      >
       
        <input
          type="text"
          placeholder="اكتب الاسم..."
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          style={{
            padding: "4px 6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "120px",
            textAlign: "center",
            fontSize: "12px",
          }}
        />
        <button
          onClick={handleAddName}
          style={{
            padding: "4px 8px",
            backgroundColor: editIndex !== null ? "#28a745" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "11px",
            transition: "0.3s",
          }}
        >
          {editIndex !== null ? "تحديث" : "تم"}
        </button>
      </div>

      <div
        style={{
          width: "100%",
          height: "300px",
          overflowY: "auto",
        }}
      >
        {teamList.map((team, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "4px 6px",
              borderRadius: "5px",
              marginBottom: "4px",
              boxShadow: "0 0 2px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                maxWidth: "120px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "12px",
              }}
            >
              {team}
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                onClick={() => handleEditName(index)}
                style={{
                  padding: "2px 6px",
                  backgroundColor: "#ffc107",
                  color: "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "10px",
                }}
              >
                تعديل
              </button>
              <button
                onClick={() => handleDeleteName(index)}
                style={{
                  padding: "2px 6px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "10px",
                }}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
      {eqs ? (
     <div style={{
  display: "flex",
  flexDirection: "row-reverse",
  width: 400,
  height: 70,
  position: "absolute",
  backgroundColor: 'red',
  background: "linear-gradient(to bottom, #808080, #000000)",
  borderRadius: 10,
  top: "10%",
  left: "38%",
  justifyContent: "space-around",
  alignItems: "center"
}}>
  <input
    type="text"
    placeholder="الفريق الأول"
    value={ne1}
    onChange={(e) => setNe1(e.target.value)}
    style={{
      width: 150,
      borderRadius: 5,
      border: "1px solid white",
      textAlign: "center",
      color: "white",
      background: "transparent"
    }}
  />

  <span style={{ color: "white" }}>||</span>

  <input
    type="text"
    placeholder="الفريق الثاني"
    value={ne2}
    onChange={(e) => setNe2(e.target.value)}
    style={{
      width: 150,
      borderRadius: 5,
      border: "1px solid white",
      textAlign: "center",
      color: "white",
      background: "transparent"
    }}
  />
    <div
  style={{
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer" 
  }}
  onClick={() => setEqs(false)}
>
  <CheckIcon style={{ fontSize: 16, color: "green" }} />
</div>

</div> 
) : (
 <div style={{ display:"flex", width:400, height:70, position:"absolute", backgroundColor:'red', background: "linear-gradient(to bottom, #808080, #000000)", borderRadius:10, top:"10%",  left: "38%", justifyContent:"center" }}>
 
   <div
  style={{
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer" ,
    marginTop:20,
    marginRight:20
  }}
  onClick={() => setEqs(true)}
>
  <CheckIcon style={{ fontSize: 16, color: "green" }} />
</div>
   <h3 style={{ color: "white", direction: "rtl", textAlign: "right" }}> {ne1}: {e1} || {ne2}: {e2} </h3>
   </div>
)}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1px",
        position: "absolute",
        top: "75%",
        left: "72%",
        transform: "translate(-60%, -50%)",
       
      }}>
         {lettersGrid2.slice(0, 5).map((cell, index) => (
           <button 
      key={index} 
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer"
      }}
      onClick={() => toggleDivs(cell,index)}
    >
          <Hexagon letter={cell.letter} bg={cell.color}/>
          </button>
        ))}
      </div>
    <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1px",
        position: "absolute",
        top: "112.5%",
        left: "65.7%",
        transform: "translate(-60%, -50%)"
      }}>
        {lettersGrid2.slice(5, 10).map((cell, index) => (
          <button 
      key={index} 
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer"
      }}
      onClick={() => toggleDivs(cell,index+5)}
    >
          <Hexagon letter={cell.letter} bg={cell.color}/>
          </button>
        ))}
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1px",
        position: "absolute",
        top: "150%",
        left: "72%",
        transform: "translate(-60%, -50%)"
      }}>
        {lettersGrid2.slice(10, 15).map((cell, index) => (
          <button 
      key={index} 
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer"
      }}
      onClick={() => toggleDivs(cell,index+10)}
    >
          <Hexagon letter={cell.letter} bg={cell.color}/>
          </button>
        ))}
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1px",
        position: "absolute",
        top: "187.5%",
        left: "65.7%",
        transform: "translate(-60%, -50%)"
      }}>
        {lettersGrid2.slice(15, 20).map((cell, index) => (
         <button 
      key={index} 
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer"
      }}
      onClick={() => toggleDivs(cell,index+15)}
    >
          <Hexagon letter={cell.letter} bg={cell.color}/>
          </button>
        ))}
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1px",
        position: "absolute",
        top: "225%",
        left: "72%",
        transform: "translate(-60%, -50%)"
      }}>
        {lettersGrid2.slice(20, 25).map((cell, index) => (
          <button 
      key={index} 
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer"
      }}
      onClick={() => toggleDivs(cell,index+20)}
    >
          <Hexagon letter={cell.letter} bg={cell.color}/>
          </button>
        ))}
      </div>
    </div>
    
    <div style={{ margin: 10, display: showDiv1 ? "flex" : "none" ,textAlign: "right" ,width: "100%",flexDirection:"row-reverse"}}>
      <div style={{width :400,}}>
      <h1 style={{ color: "#8b0000", direction: "rtl", textAlign: "right" }}>
  قائمة الاختيارات : "{selectedLetter[0]?.letter}"
</h1>
<div
  style={{
    width: 400,
    height: 200,
    backgroundColor: 'red',
    background: 'linear-gradient(to bottom, #808080, #000000)',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  }}
>
 <h2 style={{ color: "white", direction: "rtl", textAlign: "right" }}>
  السؤال: "{quest}"
</h2>
<h3 style={{ color: "white", direction: "rtl", textAlign: "right" }}>
  الاجابة: "{rep}"
</h3>
</div>

</div>
<div 
 style={{
      display:"flex",
      flexDirection:"column",
      gap: "6px",
      justifyContent: "flex-end",
      height:500,
      width:80,
      paddingLeft:5
  }}
>
<button 
      style={{
       background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    width: 75,   // نفس العرض متاع Box
    height: 75,  // نفس الطول متاع Box
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
      }}
       onClick={changeQuest}
    >
  <BoxSxColorCh main={'#ba55d3'} dark={'#c71585'} text={'سؤال جديد'} Icon={QuestionMarkIcon} textCol={'black'}/>
  </button>
  <button 
      style={{
       background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    width: 75,   // نفس العرض متاع Box
    height: 75,  // نفس الطول متاع Box
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
      }}
      onClick={() => changeColor("blue",1)}
    >
   <BoxSxColorCh main={'#0066CC'} dark={'blue'} text={'تلوين بالازرق'} Icon={FormatColorFillIcon} textCol={'white'}/>
   </button>
   <button 
     style={{
       background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    width: 75,   // نفس العرض متاع Box
    height: 75,  // نفس الطول متاع Box
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
      }}
      onClick={() => changeColor("red",2)}
    >
  <BoxSxColorCh main={'#ef6868ff'} dark={'red'} text={'تلوين بالاحمر'} Icon={FormatColorFillIcon} textCol={'white'}/>
  </button>
   <button 
      style={{
       background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    width: 75,   // نفس العرض متاع Box
    height: 75,  // نفس الطول متاع Box
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
      }}
      onClick={() => changeColor("#fff8dc",0)}
    >
  <BoxSxColorCh main={'#fbfbfbff'} dark={'#fff8dc'} text={'حذف اللون'} Icon={ClearIcon} textCol={'black'}/>
  </button>
  <button 
      style={{
       background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    width: 75,   // نفس العرض متاع Box
    height: 75,  // نفس الطول متاع Box
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
      }}
      onClick={() => setOpen(true)}
    >
  <BoxSxColorCh main={'#2f2c2c'} dark={'#000'} text={'تغيير'} Icon={SyncAltIcon} textCol={'white'}/>
  </button>
  
 
</div>
</div>

<div style={{ margin: 10, display: showDiv2 ? "block" : "none",textAlign: "right" ,width: "100%"}}>
  <h1 style={{color:"#8b0000"}}>مرحبا بك في لعبة تقاطع الحروف </h1>
<h3>يجب عليك النقر على حرف لتظهر لك قائمة الاختيارات </h3>
<h3>كما يمكنك المشاركة في بثنا المباشر على منصة تيك توك</h3> 
  <h3>للتمتع بالالعاب الثقافية مع مجموعتنا </h3>

 <img 
    src={myImage}
    style={{ width: "400px", marginTop: "5px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }} 
  />
  <a 
  href="https://www.tiktok.com/@bayto_chi3r?is_from_webapp=1&sender_device=pc" 
  target="_blank"  
  rel="noopener noreferrer" 
  style={{ color: "#8b0000", textDecoration: "underline"}}
>
  رابط الصفحة 
</a>
</div>

    </div>
   <Drawer
  anchor="right"
  open={open}
  onClose={() => setOpen(false)}
  PaperProps={{
    sx: {
      background: "linear-gradient(to bottom, #808080, #000000)", 
      color: "white",
      width: 300,
      padding: 2,
    },
  }}
>
  <h2 style={{ color: "#fff", direction: "rtl", textAlign: "center" }}>
    تغيير حرف "{selectedLetter[0]?.letter}"
  </h2>

  {Array.from({ length: Math.ceil(lettersGrid2.length / 5) }).map((_, rowIndex) => (
    <div
      key={rowIndex}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
        padding: "10px",
      }}
    >
      {lettersGrid2
        .slice(rowIndex * 5, rowIndex * 5 + 5)
        .map((cell, index) => (
          <div
            key={index}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              backgroundColor: "white",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.3rem",
              boxShadow: "0 0 4px rgba(0,0,0,0.3)",
              cursor: "pointer",
            }}
            onClick={() => changePlace(cell, index + rowIndex * 5)}
          >
            {cell.letter}
          </div>
        ))}
    </div>
  ))}
</Drawer>



    <div
    style={{
    display: "flex",
    width: "1500px",
    height: "150px",
    background: "linear-gradient(to bottom, #808080, #000000)",
    justifyContent:"center"
  }}
    >
      <Typewriter text={textdef} speed={70} />
    </div>
    </div>
  );
};

export default GameRow;
