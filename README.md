xenus

Xenus is a typescript web framework

# Goals

- Search for `*.controller.ts` files to create endpoints
- Use the file path to the `*.controller.ts` to create URI
- Use decorators to specify http method expected
- Build a module system
- Build a custom logger module
- Build a ORM module
- Build a Swagger Module

# Structure

controller - Controllers files route requests and call services when a request is successfully routed

service - Services are the logic that makes changes to the system, database, or contact external services

repo - Repos are code that runs the processes against the database (queries, inserts, updates, and deletes)

dto - Data Transfer Object are special kind of type file that is used to specify external data structures that the system is prepared to work with

type - Type files are to specify internal objects
