from app import app, db, Company, Question, QuestionCompanyTag

with app.app_context():
    # Optional: clear existing data to avoid duplicates
    QuestionCompanyTag.query.delete()
    Question.query.delete()
    Company.query.delete()

    # Sample companies
    c1 = Company(name="C3.ai")
    c2 = Company(name="Amazon")
    db.session.add_all([c1, c2])
    db.session.commit()

    # Sample questions
    q1 = Question(
        title="Find top customers by order count",
        description="Write a SQL query to return customers who made more than 3 orders.",
        difficulty="Medium"
    )
    q2 = Question(
        title="Get total sales per month",
        description="Write a SQL query to return total sales grouped by month and year.",
        difficulty="Easy"
    )
    db.session.add_all([q1, q2])
    db.session.commit()

    # Tagging questions to companies
    db.session.add(QuestionCompanyTag(question_id=q1.id, company_id=c1.id))
    db.session.add(QuestionCompanyTag(question_id=q2.id, company_id=c2.id))
    db.session.commit()

    print(" Seeded sample data.")

