# Network Assistance Management System 🌐

This project is a comprehensive solution for network management, designed to optimize the monitoring and maintenance of network infrastructure. Developed using **Next.js**, **TypeScript**, **Prisma**, and **PostgreSQL**, the system provides an intuitive and highly functional experience.

## Technologies Used 🛠️

- **Frontend:** Next.js, TypeScript, CSS.
- **Backend:** Prisma as ORM, REST API. Nextjs Server Actions.
- **Database:** PostgreSQL.

## Key Features ⚙️

### 1. Dashboard 📊
- Provides an overview of technical assistance and key metrics:
  - Total work time and trips.
  - Distribution of assistance by type: Corrective, Preventive, and Contingency Maintenance.
  - Assistance status (Completed, Pending).
  - Performance tracking for radio frequency analysts.

### 2. Node Management 📍
- Allows you to manage all registered nodes in the system:
  - Detailed information for each node: address, latitude, longitude, height, and status (Active, Inactive, Pending, Decommissioned).
  - Search and filter nodes by area or status.
  - Create new nodes.

### 3. Energy Systems by Node ⚡
- Displays energy systems associated with each node.

### 4. Equipment by Node ⚙️
- Provides information about equipment per node and models of equipment used.

### 5. Assistance Management 🛠️
- Register and track work orders (WO):
  - Classification by type: Corrective, Contingency, Preventive, etc.
  - Assignment of responsible persons for each assistance.
  - History of changes and real-time updates.

### 6. Crews and Vehicles 🚚
- Manage employees assigned to work crews and vehicles (trucks) for specific tasks.

### 7. Reports and Metrics 📈
- Generate detailed reports to evaluate system performance:
  - Analysis of assistance status.
  - Efficiency of response times.
  - Relevant data for decision-making.

### 8. Equipment Brands 🏷️
- Manage and track different brands of equipment used across the system.

### 9. City Zones 🗺️
- Manage and view the different zones of the city where the network infrastructure is located.

### 10. User Management 👥
- Manage system users and roles.

### 11. Configuration and Resource Management ⚙️
- Configure the system to fit the company's specific needs.
- Manage associated resources:
  - Employees responsible for assistances.
  - Vehicles assigned to specific tasks.

## Installation and Running 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/network-assistance-management-system.git
   cd network-assistance-management-system
   
2. Install dependencies:

   ```bash
    npm install

3. Configure environment variables in a .env file:
   ```bash
    env
    DATABASE_URL=postgresql://user:password@localhost:5432/your_database
   
4. Run migrations for the database:
   ```bash
    npx prisma migrate dev

5. Start the development server:
   ```bash
    npm run dev
   
6. Access the application at http://localhost:3000.

## Early Version Released as Community Contribution 🎉
An early version of the system has been uploaded as a contribution to the community. You can try it out, but please note that it may still be a work in progress.

---

## Images 📸

Below are some images showcasing the interface and key features of the **Network Assistance Management System**:
![capture](images/1.png)
![capture](images/2.png)
![capture](images/3.png)
![capture](images/4.png)
![capture](images/5.png)
![capture](images/6.png)
![capture](images/7.png)
![capture](images/8.png)
![capture](images/9.png)
![capture](images/10.png)
![capture](images/11.png)
![capture](images/12.png)
![capture](images/13.png)
![capture](images/01.png)
![capture](images/02.png)
![capture](images/03.png)
![capture](images/04.png)
![capture](images/05.png)


