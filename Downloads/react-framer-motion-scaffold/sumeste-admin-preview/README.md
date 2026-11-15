# SumEste Portal

A barangay management web portal for **Barangay Sumacab Este, Cabanatuan City**. It lets residents and non-residents access barangay services online, and gives barangay staff an admin dashboard to manage users, announcements, and listings.

**Live site:** https://sum-este-portal.digital/

## Features

- Separate landing pages and accounts for residents, non-residents, and admins
- Resident registration with ID verification and PSGC-backed Province, City/Municipality, and Barangay dropdowns
- Admin dashboard with four core modules and Excel export of resident records
- Role-based staff permissions (super admin, barangay secretary, barangay treasurer)
- Announcements and business listings
- Customizable site settings: logo, theme colors, and hero image slider
- Map integration with OpenStreetMap, Leaflet, and Nominatim address search
- Email-based password reset

## Tech Stack

| Layer | Technology |
| --- | --- |
| Backend | PHP (MySQLi) |
| Database | MySQL / MariaDB |
| Frontend | Tailwind CSS, vanilla JavaScript |
| Email | Brevo (SMTP) |
| Spreadsheets | PhpSpreadsheet |
| Deployment | Docker, Apache |

## Project Structure

```
admin/          Admin pages and tools
resident/       Resident-facing pages
nonResident/    Non-resident-facing pages
signup/         Registration and ID verification flow
config/         Database connection and configuration
includes/       Shared PHP components
assets/         Images, CSS, and JavaScript
tailwind/       Tailwind source files
uploads/        User-uploaded files (not tracked in git)
```

## Getting Started

### Requirements

- PHP 8.x with the `mysqli` extension
- MySQL or MariaDB
- Composer
- Node.js and npm (only to rebuild Tailwind CSS)

### Run locally with XAMPP

1. Clone the repository into your XAMPP `htdocs` folder:
   ```bash
   git clone https://github.com/envydoes/SumEste-Portal.git
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Start **Apache** and **MySQL** from the XAMPP control panel.
4. Create a database in phpMyAdmin and import the SQL schema.
5. Set your database and email (SMTP) credentials in a `.env` file. Never commit this file.
6. Open `http://localhost/SumEste-Portal/` in your browser.

### Rebuild Tailwind CSS (optional)

```bash
npm install
npx tailwindcss -i ./tailwind/input.css -o ./dist/output.css --watch
```

Adjust the input and output paths to match your setup.

### Run with Docker

```bash
docker compose up -d --build
```

## Security Notes

- Credentials live in environment variables or `.env`, never in committed code.
- `uploads/` contains resident ID images and must stay out of version control.

## Author

**Joshua M. Madulid
  Kurt M. Arguelles
  Lush Cielo A. Valera
  John Patrick A. Macapagal
**


