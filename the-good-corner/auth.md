# Authentification

## Backend:

- ✅ User + Role
  - ✅ email
  - ✅ hashedPassword
  - roles
- ✅ UserResolver
  - ✅ createJwt
    - ajouter les roles au Profile
  - ✅ setCookie
  - ✅ signup
    - ✅ NewUserInput
    - ✅ hash password
    - ✅ createJwt()
    - ✅ setCookie()
    - droits par defaut
  - ✅ login
    - ✅ UserInput
    - ✅ verify password
    - ✅ createJwt()
    - ✅ setCookie()
  - ✅ logout
    - ✅ setCookie()
- ✅ context()
  - ✅ extraire le jwt
  - ✅ verifier jwt
  - ✅ si valide: enregistrer user dans le contexte
- authChecker()
  - comparer les roles du user courant à ceux necessaires pour la methode appelée
- @Authorized()

## Frontend:

- ❌ stocker cookie
- formulaires login/signup

# Autorisation

## Backend

- ✅ entities/User.ts
  - ajouter les Roles
- ## resolvers/UserResolver.ts
