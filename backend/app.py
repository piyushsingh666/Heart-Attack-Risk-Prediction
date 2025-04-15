from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow frontend requests

# Load the trained Random Forest model
model = joblib.load("model/heart_attack_model.joblib")
print(model)

# Define feature names (must match training data)
FEATURE_NAMES = [
    "age", "gender", "smoking", "alcohol_consumption", "physical_activity_level",
    "diabetes", "hypertension", "heart_rate", "family_history", "stress_level"
]

# Define risk level mapping
RISK_LEVELS = {0: "High", 1: "Low", 2: "Moderate"}

@app.route('/api/PredictHeartAttack/', methods=['POST'])
def predict_heart_attack():
    try:
        # Get JSON data from request
        data = request.get_json()
        print("Received Data:", data)  # Log incoming data for debugging

        # Check for missing fields
        missing_fields = [field for field in FEATURE_NAMES if field not in data]
        if missing_fields:
            print("Missing Fields:", missing_fields)
            return jsonify({"error": f"Missing fields: {missing_fields}"}), 400

        # Convert categorical values to numerical
        gender_map = {"Male": 1, "Female": 0}
        activity_map = {"High": 0, "Low": 1, "Moderate": 2}
        stress_map = {"High": 0, "Low": 1, "Moderate": 2}

        # Convert input values to numerical format
        input_data = np.array([[ 
            int(data["age"]),
            gender_map.get(data["gender"], 1),
            int(data["smoking"]),
            int(data["alcohol_consumption"]),
            activity_map.get(data["physical_activity_level"], 2),
            int(data["diabetes"]),
            int(data["hypertension"]),
            int(data["heart_rate"]),
            int(data["family_history"]),
            stress_map.get(data["stress_level"], 2)
        ]])

        # Predict heart attack risk
        prediction = model.predict(input_data)[0]

        # Convert prediction to risk level
        risk_prediction = RISK_LEVELS.get(prediction, "Unknown")

        return jsonify({"risk_prediction": risk_prediction})

    except Exception as e:
        print("Error:", str(e))  # Log error
        return jsonify({"error": str(e)}), 400

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=8000)
