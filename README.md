This API project build on nodeJS that tends to be fast, non blocking execution code and support for asynchronous. 
That makes nodeJS capable to handle thousands of concurrent connections with a single server. 
And this project demonstrated the understanding of clean code architecture by Bob Martin, implementing a dependency injection 
and an isolation between entity, controller, and services. By using this architecture, this project is expected to be more 
resilient about changes and gives simplicity for scale up in the future.
It doesn't support microservices yet, but it gives the foundation to transform into microservices later. 

What is used in this project:
- Use .env file to keep static settings
- Use firebase as a non-relational database
- JWT token as authentication access
- API rate limitter (30 rpm)
- REST API (supported API client: thunder client VScode, see importable API endpoint at thunder-collection_Rav REST.json 
  file in the root folder)
