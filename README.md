# Blog using Laravel as Backend and React

React folder within this project holds the code require to render the fronend portion of the code code.

## Installation

Use the mentined code in gitbash
```bash
git clone https://github.com/munabhusal/Laravel_React.git
```

```bash
cd Laravel_React
```

## Rendering

To run the backend portion

### Laravel Portion

```bash
composer update
```

copy '.env.example' file and rename it to .env
- Manage DB_CONNECTION part as per the requirement, I am keeping it sqlite

```bash
php artisan migrate
php artisan db:seed
```

```bash
php artisan serve
```

### React Portion

To run the Frontend portion (on diffrent terminal)

```bash
cd react
npm install
```

```bash
npm run dev
```
