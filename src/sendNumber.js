import React, { useState, useEffect } from "react";
import { database } from "./firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  count,
} from "firebase/firestore";
import CheckBoxList from "./CheckBoxList";

function SendToFirestore() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  // trying to save checkbox number
  const [totalChecks, setTotalChecks] = useState("");
  const [id, setId] = useState("");

  const value = collection(database, "numbers");

  const [val, setVal] = useState([]);

  const [show, setShow] = useState(false);

  //making the list items
  const checkBoxes = ["Asked for directions in Japanese", 
	"Engaged in a full business transaction in Japanese",
	"Spoke aloud in a Japanese classroom",
	"Gave up your seat on a train or bus for an elderly, disabled or pregnant person",
	"Got lost and successfully used your name badge to get back",
	"Tried speaking in Japanese and had a very amusing fail",
	"Helped your host family cook a meal",
	"Went to an Izakaya",
	"Slept on a futon",
	"Used a squat toilet",
	"Pet a Shiba dog (ask first!)",
	"Pet an Akita dog (ask first!)",
	"Ride the subway or a public bus (just with your host-family)",
	"Watch a movie in Japanese",
	"Take a photo of a sign with very strange English",]; 

  //building the checkboxes
  const [checkedState, setCheckedState] = useState(
    new Array(checkBoxes.length).fill(false)
  );

  //counting checkboxes
  const countCheckedCheckboxes = () => {
    return [checkedState.filter(Boolean).length];
  };

  
  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );

    console.log(countCheckedCheckboxes())
    
    setCheckedState(updatedCheckedState);
  


  };

  // Tells computer that it needs to do something after render
  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  });

  // When 'create' button is pressed
  const handleCreate = async () => {
    
    await addDoc(value, {
      number1: firstNumber,
      number2: secondNumber,
      boxes: countCheckedCheckboxes(),
    });
    
    // just clears the submission area

    
    setFirstNumber(" ");
    setSecondNumber(" ");
  };

  // When 'delete' button is pressed it will do this
  const handleDelete = async (id) => {
    const deleteVal = doc(database, "numbers", id);
    await deleteDoc(deleteVal);
  };

  // When the edit button is pressed, just put the numbers that you're editing back into the spot that they were
  const handleEdit = async (id, number1, number2, boxes) => {
    setFirstNumber(number1);
    setSecondNumber(number2);
    setId(id);
    // setTotalChecks(boxes);
    setShow(true);

    handleUpdate();
  };

  const handleUpdate = async () => {
    const updateData = doc(database, "numbers", id);

    
    //HERE: SET TOTALCHECKS TO THE NUMBER
    
    await updateDoc(updateData, {
      number1: firstNumber,
      number2: secondNumber,
      boxes: totalChecks,
    });

    setShow(false);
    setFirstNumber(" ");
    setSecondNumber(" ");
  };

  return (

    

    <div>
    <div className="container">
      <strong>You've completed {countCheckedCheckboxes()}</strong>
      <CheckBoxList
        checkboxes={checkBoxes}
        checkedState={checkedState}
        handleCheckboxChange={handleCheckboxChange}
      />

      {/* <button onClick={console.log(countCheckedCheckboxes())}> click me </button> */}

      {/* <input
        value={firstNumber}
        onChange={(e) => setFirstNumber(e.target.value)}
      />
      <input
        value={secondNumber}
        onChange={(e) => setSecondNumber(e.target.value)}
      /> */}
      {/* <input 
        value={totalChecks}
        onChange={(e) => setTotalChecks(e.target.value)}
      /> */}

      {/* <button onChange={setTotalChecks(totalChecks)}>Update checks</button> */}

      


      {!show ? (
        <button onClick={handleCreate}>Create</button>
      ) : (
        <button onClick={handleUpdate}>Update</button>
      )}

      

     

      {val.map((values) => (
        <div>
          <h1>{values.number1}</h1>
          <h1>{values.number2}</h1>

          <button onClick={() => handleDelete(values.id)}>Delete</button>
          
          {/* <button
            onClick={() =>
              handleEdit(values.id, values.number1, values.number2, values.boxes)
            }
          >
            Submit Current Score
          </button> */}
        </div>
      ))}
    </div>

    </div>
  );
}

export default SendToFirestore;
