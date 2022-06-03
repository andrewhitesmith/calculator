import './App.scss';
import { useEffect, useState } from "react";

function App() {
    const [number, setNumber] = useState('0'); // цифра ничего
    const [firstNumber, setFirstNumber] = useState(0);
    const [isPlusActive, setIsPlusActive] = useState(false);
    const [isMinusActive, setIsMinusActive] = useState(false);
    const [isMultActive, setIsMultActive] = useState(false);
    const [isDivActive, setIsDivActive] = useState(false);
    const [action, setAction] = useState('');
    const [pointChecker, setPointChecker] = useState(false);

    useEffect(() => {
        if (number.toString().includes(".")) {
            setPointChecker(true);
        } else {
            setPointChecker(false);
        }
        if (number.toString().length > 10) {
            setNumber(number.toString().slice(0, -1));
        }
        if (number.toString() === "NaN" || number.toString() === "Infinity") {
            setNumber("Error");
        }
        if (number.toString()[0] === "0" && number.toString().length > 1) {
            setNumber(number.toString().slice(1, number.toString().length));
            if (number.toString().includes(".")) {
                setNumber(number);
            }
        }
        let resStr = number.toString();
        if (resStr.length > 11) {
            setNumber(number.toExponential(2));
        }
    }, [number]);

    useEffect(() => {
        if (isMinusActive) {
            setIsMultActive(false);
            setIsDivActive(false);
            setIsPlusActive(false);
        }
    }, [isMinusActive]);

    useEffect(() => {
        if (isMultActive) {
            setIsMinusActive(false);
            setIsDivActive(false);
            setIsPlusActive(false);
        }
    }, [isMultActive]);

    useEffect(() => {
        if (isDivActive) {
            setIsMinusActive(false);
            setIsMultActive(false);
            setIsPlusActive(false);
        }
    }, [isDivActive]);

    useEffect(() => {
        if (isPlusActive) {
            setIsMinusActive(false);
            setIsMultActive(false);
            setIsDivActive(false);
        }
    }, [isPlusActive]);

    function typeNumber(event) {
        let newNumber = number + event.target.innerText;

        if (number === "0") {
            newNumber = event.target.innerText;
        }

        if (isPlusActive) {
            setNumber(event.target.innerText);
            setIsPlusActive(false);
        } else if (isMinusActive) {
            setNumber(event.target.innerText);
            setIsMinusActive(false);
        } else if (isMultActive) {
            setNumber(event.target.innerText);
            setIsMultActive(false);
        } else if (isDivActive) {
            setNumber(event.target.innerText);
            setIsDivActive(false);
        } else {
            setNumber(newNumber);
        }
    }

    function doSomeMath(actionSymbol, actionButton, setActionButton) {
        if (action === actionSymbol && !actionButton) {
            let resultNumber = parseInt(firstNumber) + parseInt(number);
            setNumber(resultNumber);
            setFirstNumber(resultNumber);
        } else if (action !== "") {
            result();
        } else {
            setFirstNumber(number);
        }
        setAction(actionSymbol);
        setActionButton(true);
    }
    function percentage() {
        let perc = number / 100;
        setNumber(perc);
    }
    function change(event) {
        if  (number.toString().includes("-")) {
            setNumber(number.toString().slice(1, number.toString().length));
        } else {
            setNumber("-" + number);
        }
        if (number.toString() === "0") {
            setNumber(number);
        }
    }
    function coma() {
        let point = ".";
        if (!pointChecker) {
            setNumber(number + point);
            setPointChecker(true);
        }
    }
    function clear() {
        setNumber("0");
        setIsPlusActive(false);
        setIsMinusActive(false);
        setIsMultActive(false);
        setIsDivActive(false);
        setAction("");
    }

    function result() {
        let resultNumber = 0;
        if (action === "+") {
            resultNumber = parseFloat(firstNumber) + parseFloat(number);
            setIsPlusActive(false);
        } else if (action === "-") {
            resultNumber = parseFloat(firstNumber) - parseFloat(number);
            setIsMinusActive(false);
        } else if (action === "&#215;") {
            resultNumber = parseFloat(firstNumber) * parseFloat(number);
            setIsMultActive(false);
        } else if (action === "÷") {
            resultNumber = parseFloat(firstNumber) / parseFloat(number);
            setIsDivActive(false);
        } else if (action === "") {
            resultNumber = number;
        }

        let resStr = resultNumber.toString();
        if (resStr.length > 11) {
            resultNumber = resultNumber.toExponential(2);
        }
        setNumber(resultNumber);
        setFirstNumber(resultNumber);
        setAction("");
        // Придумал велосипед, вместо вверхних трёх строчек полностью написал логику T-T
        // if (resStr.includes("e")) {
        //     let indexE = resStr.indexOf("e");
        //     let indexDot = resStr.indexOf(".");
        //     if (resStr[indexDot + 1] === "0") {
        //         resultNumber = resStr.slice(0, indexDot) + resStr.slice(indexE, resStr.length);
        //     } else {
        //         resultNumber = resStr.slice(0, indexDot + 2) + resStr.slice(indexE, resStr.length);
        //     }
        // } else {
        //     if (Number(resultNumber) === resultNumber && resultNumber % 1 !== 0) {
        //         resultNumber = parseFloat(resultNumber).toFixed(6);
        //     }
        //     while (resultNumber.toString()[resultNumber.toString().length - 1] === "0") {
        //         resultNumber = resultNumber.toString().slice(0, -1);
        //     }
        // }

    }
  return (
    <div className="calculator-body">
        <div className="result">{number}</div>
        <div className="calculator-row">
            <span onClick={clear} className="additional-button">C</span>
            <span onClick={change} className="additional-button">+/-</span>
            <span onClick={percentage} className="additional-button">%</span>
            <span onClick={() => doSomeMath("÷", isDivActive, setIsDivActive)} className={`calculate-button ${isDivActive ? 'active' : ''}`}>÷</span>
        </div>
        <div className="calculator-row">
            <span onClick={typeNumber} className="number-button">7</span>
            <span onClick={typeNumber} className="number-button">8</span>
            <span onClick={typeNumber} className="number-button">9</span>
            <span onClick={() => doSomeMath("&#215;", isMultActive, setIsMultActive)} className={`calculate-button ${isMultActive ? 'active' : ''}`}>&#215;</span>
        </div>
        <div className="calculator-row">
            <span onClick={typeNumber} className="number-button">4</span>
            <span onClick={typeNumber} className="number-button">5</span>
            <span onClick={typeNumber} className="number-button">6</span>
            <span onClick={() => doSomeMath("-", isMinusActive, setIsMinusActive)} className={`calculate-button ${isMinusActive ? 'active' : ''}`}>-</span>
        </div>
        <div className="calculator-row">
            <span onClick={typeNumber} className="number-button">1</span>
            <span onClick={typeNumber} className="number-button">2</span>
            <span onClick={typeNumber} className="number-button">3</span>
            <span onClick={() => doSomeMath("+", isPlusActive, setIsPlusActive)} className={`calculate-button ${isPlusActive ? 'active' : ''}`}>+</span>
        </div>
        <div className="calculator-row">
            <span onClick={typeNumber} className="zero-button">0</span>
            <span onClick={coma} className="coma-button">.</span>
            <span onClick={result} className="calculate-button">=</span>
        </div>
    </div>
  );
}

export default App;
