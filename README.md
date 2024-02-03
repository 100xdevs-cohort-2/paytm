## Payments App

  
Welcome to our Payments App, a robust and user-friendly platform designed for seamless financial transactions. Developed with ReactJS and Express, this application offers a secure and intuitive experience for users to manage their payments efficiently.

## Features:
- **User-friendly Interface:** Navigate through sign-in, sign-up, dashboard, and money transfer pages with ease.
- **Zod Authorization:** Implemented Zod for robust and secure user authorization.
- **Modern Design:** Enjoy a modern and visually appealing design for an enhanced user experience.
- **Flexible Deployment:** Utilized Docker for streamlined installation, ensuring a hassle-free setup.
## How to install locally?
1. Fork and Clone this repository or Clone it using HTTPS/SSH
   ```
   git clone https://github.com/sreya22-git/paytm.git
  ```

2. Install Mongodb or build using Docker locally
    ```
     docker build ./ -t mongodb:4.7-replset
     docker run --name mongodb -replset22 -p 27017:27017 -d mongodb:4.7-replset

```
3. Connect to the mongod compass
4. Install required dependencies
   ```
   cd backend
   npm i
   node index.js
  
   ```
   ```
    cd frontend
    npm i
    npm run dev
   ```


Webpages made:
<div style="display:flex; justify-content:center;">
  <div style="display:flex; flex-wrap:wrap; ">
    <img width="300" alt="image" src="https://github.com/sreya22-git/paytm/assets/134381727/efc2c40a-b465-498c-98c6-075cb771cdc8">
    <img width="300" alt="image" src="https://github.com/sreya22-git/paytm/assets/134381727/e5a7c48a-b7d3-4247-861c-f8aa87762bd2">
  </div>
  <div style="display:flex; flex-wrap:wrap; ">
    <img width="300" alt="image" src="https://github.com/sreya22-git/paytm/assets/134381727/e4bcdd47-6e13-4ca9-9650-cea2922a9b5f">
    <img width="300" alt="image" src="https://github.com/sreya22-git/paytm/assets/134381727/202894f4-31f6-405e-a943-627bc8088dfd">
  </div>
</div>

   

