from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
import sqlite3

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Config PostgreSQL connection
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    def to_dict(self):
        return {"id": self.id, "name": self.name}


class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    difficulty = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    # New fields
    table_name = db.Column(db.String(100))
    schema_description = db.Column(db.Text)
    sample_data = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "difficulty": self.difficulty,
            "created_at": self.created_at,
            "table_name": self.table_name,
            "schema_description": self.schema_description,
            "sample_data": self.sample_data,
        }


class QuestionCompanyTag(db.Model):
    __tablename__ = 'question_company_tags'
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))


# Routes
@app.route("/")
def home():
    return jsonify({"message": "SQL Prep API is running"})


@app.route("/companies", methods=["GET"])
def get_companies():
    companies = Company.query.all()
    return jsonify([c.to_dict() for c in companies])


@app.route("/questions", methods=["GET"])
def get_questions():
    company_name = request.args.get('company')
    difficulty = request.args.get('difficulty')
    search = request.args.get('search')

    query = Question.query

    if company_name and company_name != "All Companies":
        company = Company.query.filter_by(name=company_name).first()
        if company:
            question_ids = [
                qid for (qid,) in db.session.query(QuestionCompanyTag.question_id).filter_by(company_id=company.id)
            ]
            query = query.filter(Question.id.in_(question_ids))
        else:
            return jsonify([])

    if difficulty and difficulty != "All Difficulties":
        query = query.filter_by(difficulty=difficulty)

    if search:
        query = query.filter(Question.title.ilike(f"%{search}%"))

    questions = query.all()
    return jsonify([q.to_dict() for q in questions])


@app.route("/questions/<int:question_id>", methods=["GET"])
def get_question_detail(question_id):
    question = Question.query.get_or_404(question_id)
    return jsonify(question.to_dict())

@app.route("/run-sql", methods=["POST"])
def run_sql():
    data = request.get_json()
    query = data.get("query", "")
    schema_description = data.get("schema_description", "")
    sample_data = data.get("sample_data", "")

    if not query.strip():
        return jsonify({"success": False, "error": "Empty query."})

    try:
        conn = sqlite3.connect(":memory:")
        cursor = conn.cursor()

        # Create tables from schema
        if schema_description:
            tables = schema_description.split(")")
            for table_def in tables:
                table_def = table_def.strip()
                if not table_def:
                    continue
                if not table_def.endswith(")"):
                    table_def += ")"
                cursor.execute(f"CREATE TABLE {table_def}")

        # Insert sample data
        if sample_data:
            cursor.executescript(sample_data)

        # Execute user query
        cursor.execute(query)

        if query.strip().lower().startswith("select"):
            cols = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [dict(zip(cols, row)) for row in rows]
            return jsonify({"success": True, "rows": results})
        else:
            conn.commit()
            return jsonify({"success": True, "message": "✅ Query executed successfully."})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})
    finally:
        conn.close()


# Entry point
if __name__ == "__main__":
    app.run(debug=True)
