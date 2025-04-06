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
    questions = [
        Question(title="Find top customers by order count", description="Write a SQL query to return customers who made more than 3 orders.", difficulty="Medium"),
        Question(title="Get total sales per month", description="Write a SQL query to return total sales grouped by month and year.", difficulty="Easy"),
        Question(title="Find customers with no orders", description="List customers who haven't placed any orders.", difficulty="Easy"),
        Question(title="Top 5 selling products", description="Get the 5 products with the highest number of sales.", difficulty="Medium"),
        Question(title="Monthly revenue growth", description="Calculate month-over-month revenue growth.", difficulty="Hard"),
        Question(title="List repeat customers", description="Identify customers who have placed more than one order.", difficulty="Easy"),
        Question(title="Orders with delayed shipments", description="Find orders where the shipment was delayed.", difficulty="Medium"),
        Question(title="Customer retention rate", description="Calculate customer retention rate over 3 months.", difficulty="Hard"),
        Question(title="Cancelled orders ratio", description="Get the percentage of cancelled orders.", difficulty="Easy"),
        Question(title="Revenue by product category", description="Show total revenue grouped by product category.", difficulty="Medium")
    ]
    db.session.add_all(questions)
    db.session.commit()

    # Tag questions to companies
    tags = [
        QuestionCompanyTag(question_id=questions[0].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[1].id, company_id=c2.id),
        QuestionCompanyTag(question_id=questions[2].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[3].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[4].id, company_id=c2.id),
        QuestionCompanyTag(question_id=questions[5].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[6].id, company_id=c2.id),
        QuestionCompanyTag(question_id=questions[7].id, company_id=c2.id),
        QuestionCompanyTag(question_id=questions[8].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[9].id, company_id=c2.id)
    ]
    db.session.add_all(tags)
    db.session.commit()

    print("Seeded 10 sample questions across 2 companies")


