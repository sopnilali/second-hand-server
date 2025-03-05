

import nodemailer from 'nodemailer'
import config from '../config';

// Define TypeScript types for the sendMail function
interface MailOptions {
    image: string[];
    productName: string;
    productPrice: string;
    buyerName: string;
    sellerName: string;
    sellerEmail: string;
}

export const sendMail = async ({
    image,
    productName,
    productPrice,
    buyerName,
    sellerName,
    sellerEmail
}: MailOptions) => {




    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service: 'gmail',
        secure: config.node_env === 'production',
        auth: {
            user: "sopnilstar@gmail.com",
            pass: "zbgq npak wrsd khwv",
        },
    });


    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .email-container {
            max-height: 100vh;
            max-width: 600px;
            min-height: 100%;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 40px;
            font-weight: bold;
            color: #e5532a;
        }
        .product-image {
            text-align: center;
            margin-top: 20px;
        }
        .product-image img {
            max-width: 100%;
            border-radius: 8px;
        }
        .order-details {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
        }
        .order-details p {
            margin: 8px 0;
            font-size: 16px;
            color: #333;
        }
        .order-details span {
            font-weight: bold;
            color: #e5532a;
        }
        .buttons {
            text-align: center;
            margin-top: 20px;
            color: white;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 5px;
            color: white !important;
            font-size: 16px;
            text-decoration: none;
            border-radius: 5px;
        }
      .confirm-btn {
      background: linear-gradient(to right, #e5532a, #d1461cd2); 
      padding: 10px 30px;
      border-radius: 8px;
      font-weight: bold;
      text-decoration: none;
      transition: all 0.3s ease;
      }

.confirm-btn:hover {
background: linear-gradient(to right, #e5532a, #d1461cd2); 
cursor: pointer; 
color: white;
}
    </style>
</head>
<body>

<div class="email-container">
    <div class="header">
        Order Confirmation ✅
    </div>

    <div class="product-image">
        <img src="${image}" alt="Product Image">
    </div>

    <div class="order-details">
        <p><span>Product Name:</span> ${productName}</p>
        <p><span>Price:</span> ৳${productPrice}</p>
        <p><span>Buyer:</span> ${buyerName}</p>
        <p><span>Seller:</span> ${sellerName}</p>
    </div>

    <div class="buttons">
       <a target="_blank" rel="noopener noreferrer" href="${process.env.CLIENT_URL}/dashboard/sales-history" class="btn confirm-btn">
Confirm Order
</a>

    </div>
</div>

</body>
</html>
    `;
    await transporter.sendMail({
        from: 'sopnilstar@gmail.com', // sender address
        to: sellerEmail, // list of receivers
        subject: "No Replay: Your Order Confirmation ✅",
        html: emailHTML, // html body
    });

}