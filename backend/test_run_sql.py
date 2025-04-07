import requests

payload = {
    "query": "SELECT * FROM orders;",
    "schema_description": "id INT, customer_id INT, order_date DATE",
    "sample_data": """
        INSERT INTO orders VALUES (1, 101, '2024-01-01');
        INSERT INTO orders VALUES (2, 101, '2024-01-10');
        INSERT INTO orders VALUES (3, 101, '2024-02-05');
        INSERT INTO orders VALUES (4, 102, '2024-01-20');
        INSERT INTO orders VALUES (5, 101, '2024-02-20');
    """,
    "table_name": "orders"
}

res = requests.post("http://localhost:5000/run-sql", json=payload)

print("Status:", res.status_code)
print("Response:", res.json())
