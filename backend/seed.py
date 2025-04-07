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

    # Sample questions with sample_data
    questions = [
        Question(
            title="Find top customers by order count",
            description="Write a SQL query to return customers who made more than 3 orders.",
            difficulty="Medium",
            table_name="orders",
            schema_description="id INT, customer_id INT, order_date DATE",
            sample_data="""
                INSERT INTO orders VALUES (1, 101, '2024-01-01');
                INSERT INTO orders VALUES (2, 101, '2024-01-10');
                INSERT INTO orders VALUES (3, 101, '2024-02-05');
                INSERT INTO orders VALUES (4, 102, '2024-01-20');
                INSERT INTO orders VALUES (5, 101, '2024-02-20');
            """
        ),
        Question(
            title="Get total sales per month",
            description="Write a SQL query to return total sales grouped by month and year.",
            difficulty="Easy",
            table_name="sales",
            schema_description="id INT, amount DECIMAL, sale_date DATE",
            sample_data="""
                INSERT INTO sales VALUES (1, 100.0, '2024-01-15');
                INSERT INTO sales VALUES (2, 150.0, '2024-01-25');
                INSERT INTO sales VALUES (3, 200.0, '2024-02-10');
            """
        ),
        Question(
            title="Find customers with no orders",
            description="List customers who haven't placed any orders.",
            difficulty="Easy",
            table_name="customers, orders",
            schema_description="customers_id INT, name TEXT, orders_id INT, customer_id INT",
            sample_data="""
                INSERT INTO customers VALUES (1, 'Alice');
                INSERT INTO customers VALUES (2, 'Bob');
                INSERT INTO orders VALUES (1, 2);
            """
        ),
        Question(
            title="Top 5 selling products",
            description="Get the 5 products with the highest number of sales.",
            difficulty="Medium",
            table_name="products, sales",
            schema_description="products_id INT, name TEXT, sales_id INT, product_id INT",
            sample_data="""
                INSERT INTO products VALUES (1, 'Widget A');
                INSERT INTO products VALUES (2, 'Widget B');
                INSERT INTO sales VALUES (1, 1);
                INSERT INTO sales VALUES (2, 1);
                INSERT INTO sales VALUES (3, 2);
            """
        ),
        Question(
            title="Monthly revenue growth",
            description="Calculate month-over-month revenue growth.",
            difficulty="Hard",
            table_name="revenue",
            schema_description="month TEXT, total DECIMAL",
            sample_data="""
                INSERT INTO revenue VALUES ('2024-01', 500);
                INSERT INTO revenue VALUES ('2024-02', 800);
            """
        ),
        Question(
            title="List repeat customers",
            description="Identify customers who have placed more than one order.",
            difficulty="Easy",
            table_name="orders",
            schema_description="id INT, customer_id INT",
            sample_data="""
                INSERT INTO orders VALUES (1, 101);
                INSERT INTO orders VALUES (2, 102);
                INSERT INTO orders VALUES (3, 101);
            """
        ),
        Question(
            title="Orders with delayed shipments",
            description="Find orders where the shipment was delayed.",
            difficulty="Medium",
            table_name="orders",
            schema_description="id INT, ship_date DATE, expected_date DATE",
            sample_data="""
                INSERT INTO orders VALUES (1, '2024-01-05', '2024-01-01');
                INSERT INTO orders VALUES (2, '2024-01-03', '2024-01-05');
            """
        ),
        Question(
            title="Customer retention rate",
            description="Calculate customer retention rate over 3 months.",
            difficulty="Hard",
            table_name="retention",
            schema_description="customer_id INT, signup_date DATE, last_active_date DATE",
            sample_data="""
                INSERT INTO retention VALUES (101, '2024-01-01', '2024-03-01');
                INSERT INTO retention VALUES (102, '2024-01-01', '2024-01-15');
            """
        ),
        Question(
            title="Cancelled orders ratio",
            description="Get the percentage of cancelled orders.",
            difficulty="Easy",
            table_name="orders",
            schema_description="id INT, status TEXT",
            sample_data="""
                INSERT INTO orders VALUES (1, 'completed');
                INSERT INTO orders VALUES (2, 'cancelled');
                INSERT INTO orders VALUES (3, 'cancelled');
            """
        ),
        Question(
            title="Revenue by product category",
            description="Show total revenue grouped by product category.",
            difficulty="Medium",
            table_name="products, sales",
            schema_description="products_id INT, category TEXT, sales_id INT, product_id INT, amount DECIMAL",
            sample_data="""
                INSERT INTO products VALUES (1, 'Electronics');
                INSERT INTO products VALUES (2, 'Books');
                INSERT INTO sales VALUES (1, 1, 150.0);
                INSERT INTO sales VALUES (2, 2, 90.0);
                INSERT INTO sales VALUES (3, 1, 300.0);
            """
        )
    ]

    db.session.add_all(questions)
    db.session.commit()

    # Tags
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

    print("Seeded 10 questions with schema + sample data.")
