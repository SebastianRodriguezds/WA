# W&A - Experiences in Potrerillos, Mendoza

This is a web project for a tourism business in Mendoza, Argentina, where users can explore and book **cabins and experiences** in Potrerillos, including wine tastings, BBQs, excursions, and more.

## Technologies Used

- **Frontend:** Next.js 15 + TypeScript + TailwindCSS + Turbopack  
- **Backend:** Node.js 20 + Express + TypeScript + Prisma  
- **Database:** PostgreSQL  
- **Payment gateways:** Stripe, MercadoPago  
- **Version control:** Git, GitHub  
- **Other tools:** VS Code, Postman

## Project Structure

WA/
|_frontend/# Next.js + TailwindCSS
|_backend/ # Node.js + Express + Prisma

## Installation Instructions
### 1. Install dependencies in both frontend and backend:
```bash
cd frontend
npm install

cd ../backend
npm install
```
### 2. Run the development servers:
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev

### 3. Open http://localhost:3000 in your browser to see the web app.

## Environments Variables

* Frontend: .env.local (backend URL, payments key)
* Backend: .env.local (DB connection, payments key)

Important: These files are not committed to GitHub.

## Deployment

* Frontend: Vercel
* Backend: Render

## Contact Information

For questions, feedback, or collaboration, you can reach out to the project maintainer:
- Email: sebastianrodriguezds@gmail.com
- GitHub: [GitHub](https://github.com/SebastianRodriguezds)
