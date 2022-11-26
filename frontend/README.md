# PAPDEL 

- [] Allow diferent users.
- [] Get diferent courts according id.
- [] Enable book

## Endpoings
Endpoint | params | response 
:---: | :---: | :---: 
/login | user, pass | id, token 
/courts | id, token | courts(class) 
/book | id, token, court_id | ok(class) 
