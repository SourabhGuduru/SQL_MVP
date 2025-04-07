from app import app, db, Company, Question, QuestionCompanyTag

with app.app_context():
    # Clear existing data
    QuestionCompanyTag.query.delete()
    Question.query.delete()
    Company.query.delete()

    # Sample companies
    c1 = Company(name="C3.ai")
    c2 = Company(name="Amazon")
    db.session.add_all([c1, c2])
    db.session.commit()

    # Sample questions with schema details
    questions = [
        Question(
            title="Find top customers by order count",
            description="Write a SQL query to return customers who made more than 3 orders.",
            difficulty="Medium",
            table_name="orders",
            schema_description="orders(id INT, customer_id INT, order_date DATE)"
        ),
        Question(
            title="Get total sales per month",
            description="Write a SQL query to return total sales grouped by month and year.",
            difficulty="Easy",
            table_name="sales",
            schema_description="sales(id INT, amount DECIMAL, sale_date DATE)"
        ),
        Question(
            title="Find customers with no orders",
            description="List customers who haven't placed any orders.",
            difficulty="Easy",
            table_name="customers, orders",
            schema_description="customers(id INT, name TEXT), orders(id INT, customer_id INT)"
        ),
        Question(
            title="Top 5 selling products",
            description="Get the 5 products with the highest number of sales.",
            difficulty="Medium",
            table_name="products, sales",
            schema_description="products(id INT, name TEXT), sales(id INT, product_id INT)"
        ),
        Question(
            title="Monthly revenue growth",
            description="Calculate month-over-month revenue growth.",
            difficulty="Hard",
            table_name="revenue",
            schema_description="revenue(month TEXT, total DECIMAL)"
        ),
        Question(
            title="List repeat customers",
            description="Identify customers who have placed more than one order.",
            difficulty="Easy",
            table_name="orders",
            schema_description="orders(id INT, customer_id INT)"
        ),
        Question(
            title="Orders with delayed shipments",
            description="Find orders where the shipment was delayed.",
            difficulty="Medium",
            table_name="orders",
            schema_description="orders(id INT, ship_date DATE, expected_date DATE)"
        ),
        Question(
            title="Customer retention rate",
            description="Calculate customer retention rate over 3 months.",
            difficulty="Hard",
            table_name="retention",
            schema_description="retention(customer_id INT, signup_date DATE, last_active_date DATE)"
        ),
        Question(
            title="Cancelled orders ratio",
            description="Get the percentage of cancelled orders.",
            difficulty="Easy",
            table_name="orders",
            schema_description="orders(id INT, status TEXT)"
        ),
        Question(
            title="Revenue by product category",
            description="Show total revenue grouped by product category.",
            difficulty="Medium",
            table_name="products, sales",
            schema_description="products(id INT, category TEXT), sales(id INT, product_id INT, amount DECIMAL)"
        )
    ]

    db.session.add_all(questions)
    db.session.commit()

    # Associate questions to companies
    tags = [
        QuestionCompanyTag(question_id=questions[0].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[1].id, company_id=c2.id),
        QuestionCompanyTag(question_id=questions[2].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[3].id, company_id=c2.id),
        QuestionCompanyTag(question_id=questions[4].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[5].id, company_id=c2.id),
        QuestionCompanyTag(question_id=questions[6].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[7].id, company_id=c2.id),
        QuestionCompanyTag(question_id=questions[8].id, company_id=c1.id),
        QuestionCompanyTag(question_id=questions[9].id, company_id=c2.id)
    ]

    db.session.add_all(tags)
    db.session.commit()

    print("✅ Seeded 10 questions with schema and table names.")
