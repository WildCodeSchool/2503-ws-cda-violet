# Authentification

## Backend:

- User + Role
  - email
  - hashedPassword
  - roles
- UserResolver
  - createJwt
  - setCookie
  - signup
    - NewUserInput
    - hash password
    - createJwt()
    - setCookie()
  - login
    - UserInput
    - verify password
    - createJwt()
    - setCookie()
  - logout
    - setCookie()
- context()
  - extraire le jwt
  - verifier jwt
  - si valide: enregistrer user dans le contexte
- authChecker()
  - comparer les roles du user courant à ceux necessaires pour la methode appelée
- @Authorized()

## Frontend:

- stocker cookie
