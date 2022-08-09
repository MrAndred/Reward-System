# Guide

## Dataset

**1 NOTE:** Before use this app, you should create local database with following structure

``` bash
CREATE TABLE customers (
    id uuid DEFAULT gen_random_uuid(),
    name character varying
);

CREATE TABLE customer_transactions (
    customer_id uuid,
    price integer,
    created_at date
);

ALTER TABLE customers
  ADD PRIMARY KEY (id);

ALTER TABLE customer_transactions ADD CONSTRAINT customer_to_transactions_fk
  FOREIGN KEY (customer_id) REFERENCES customers(id);
```

**2 NOTE** change variables in database module with your values

### Customers

| id                                        | name          |
| ----------------------------------------- |:-------------:|
| 8a77436a-b10a-4f5a-b7c3-78d2a96d3070      | Michael       |
| daa99672-9fb8-42d2-a74f-bbde29fe87c3      | Drake         |
| 1c561be8-214e-42ad-85f8-e788d7607740      | Andrew        |
| ce54d83d-bcfe-445e-8084-566f256805b8      | David         |

### Customer Transactions

| customer_id                               | price | created_at |
| ----------------------------------------- |:-----:|:----------:|
| 8a77436a-b10a-4f5a-b7c3-78d2a96d3070      | 120   | 2022-08-08 |
| 8a77436a-b10a-4f5a-b7c3-78d2a96d3070      | 60    | 2022-08-08 |
| daa99672-9fb8-42d2-a74f-bbde29fe87c3      | 60    | 2022-07-08 |
| 1c561be8-214e-42ad-85f8-e788d7607740      | 70    | 2022-07-08 |
| 1c561be8-214e-42ad-85f8-e788d7607740      | 200   | 2022-06-08 |
| ce54d83d-bcfe-445e-8084-566f256805b8      | 100   | 2022-06-08 |
| 8a77436a-b10a-4f5a-b7c3-78d2a96d3070      | 150   | 2022-05-08 |
| 8a77436a-b10a-4f5a-b7c3-78d2a96d3070      | 320   | 2022-03-08 |

### Customers Total points and Last Three monthes

| customer_id                               | Total | August | July| June|
| ----------------------------------------- |:-----:|:------:|:---:|:---:|
| 8a77436a-b10a-4f5a-b7c3-78d2a96d3070      | 100   | 100    | 0   | 0   |
| daa99672-9fb8-42d2-a74f-bbde29fe87c3      | 10    | 0      | 10  | 0   |
| 1c561be8-214e-42ad-85f8-e788d7607740      | 270   | 0      | 20  | 250 |
| ce54d83d-bcfe-445e-8084-566f256805b8      | 50    | 0      | 0   | 50  |

### Image Data

Customers
>
![image](https://user-images.githubusercontent.com/62703508/183447625-fda416e0-61ca-4d4d-806d-0fb64889ba81.png)

Customer Transactions
>
![image](https://user-images.githubusercontent.com/62703508/183420055-1b5e4ad3-68fa-4982-a06f-dcb11bc78d67.png)

Results
>
![image](https://user-images.githubusercontent.com/62703508/183447288-1e6bc1e6-0754-4f43-98a0-998a639c78db.png)

## Installation

Before run this application use

```bash
npm install
```

## Running the app

To start app use following commands

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

To run tests use following commands

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Endpoints

### GET /api/v1/customers-info-by-three-monthes

Returns info about customers points

Request

```bash
no parameters
```

Response

```bash
Array: [{
    customerId: 'some customer id';
    totalPoints: 'total customer`s points';
    lastMonth: 'customer`s point in last month';
    secondMonth: 'customer`s point in month ago';
    thirdMonth: 'customer`s point in 2 month ago';
}]
```

### GET /api/v1/health

Shows service status

Request

```bash
no parameters
```

Response

```bash
{
  "status": "ok",
  "info": {
    "Basic Check": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "Basic Check": {
      "status": "up"
    }
  }
}
```

## Docker

To run app in docker use

``` bash
docker build -t reward-system .
docker run -p 3000:3000 reward-system
```

**NOTE:**
Containerized Docker app will not work because does not connected  with DB
