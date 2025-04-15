import React, { useState } from 'react';
import axios from 'axios';
import styles from './heartattack.module.css';

function HeartAttackInput() {
  const [inputData, setInputData] = useState({
    age: '',
    gender: 'Male',
    smoking: false,
    alcohol_consumption: false,
    physical_activity_level: 'Moderate',
    diabetes: false,
    hypertension: false,
    heart_rate: '',
    family_history: false,
    stress_level: 'Moderate'
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.checked });
  };

  const predictHeartAttack = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await axios.post('http://localhost:8000/api/PredictHeartAttack/', inputData);
        setResult(response.data.risk_prediction);
      } catch (error) {
        console.error('Error predicting heart attack risk:', error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const isFormValid = () => {
    return inputData.age !== '' && inputData.heart_rate !== '';
  };

  return (
    <div className={styles.container}>
      <h1 style={{ color: 'white' }}>Heart Attack Risk Prediction</h1>
      <div className={styles.flexcontainer}>
        <div className={styles.item}>
          <form className={styles.form}>
            <div>
              <label>Age:</label>
              <input type="number" name="age" value={inputData.age} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Gender:</label>
              <select name="gender" value={inputData.gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label>Heart Rate:</label>
              <input type="number" name="heart_rate" value={inputData.heart_rate} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Physical Activity Level:</label>
              <select name="physical_activity_level" value={inputData.physical_activity_level} onChange={handleInputChange}>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label>Stress Level:</label>
              <select name="stress_level" value={inputData.stress_level} onChange={handleInputChange}>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label>Smoking:</label>
              <input type="checkbox" name="smoking" checked={inputData.smoking} onChange={handleCheckboxChange} />
            </div>
            <div>
              <label>Alcohol Consumption:</label>
              <input type="checkbox" name="alcohol_consumption" checked={inputData.alcohol_consumption} onChange={handleCheckboxChange} />
            </div>
            <div>
              <label>Diabetes:</label>
              <input type="checkbox" name="diabetes" checked={inputData.diabetes} onChange={handleCheckboxChange} />
            </div>
            <div>
              <label>Hypertension:</label>
              <input type="checkbox" name="hypertension" checked={inputData.hypertension} onChange={handleCheckboxChange} />
            </div>
            <div>
              <label>Family History:</label>
              <input type="checkbox" name="family_history" checked={inputData.family_history} onChange={handleCheckboxChange} />
            </div>
            <button onClick={predictHeartAttack}>Predict Risk</button>
          </form>
        </div>
        <div className={styles.item2}>
          <h2 style={{ color: 'yellow' }}>Result Of Prediction:</h2>
          {result !== null ? (
            <p>
              Heart Attack Risk: <strong>{result}</strong>
            </p>
          ) : (
            <p>Result will be shown here</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeartAttackInput;