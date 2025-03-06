

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
        .confirm-btn {
            background: linear-gradient(to right, #e5532a, #d1461cd2);
            padding: 10px 30px;
            border-radius: 8px;
            font-weight: bold;
            text-decoration: none;
            transition: all 0.3s ease;
            color: white;
        }

        .confirm-btn:hover {
            background: linear-gradient(to right, #e5532a, #d1461cd2);
            cursor: pointer;
            color: white;
        }
    </style>
</head>
<body class="bg-gray-100 flex justify-center items-center min-h-screen p-4">
    <div class="email-container bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
        <div class="header text-center text-4xl font-bold text-orange-600 mb-6">
            Order Confirmation ✅
        </div>

        <div class="product-image text-center mb-6">
            <img src="${image}" alt="Product Image" class="rounded-lg w-full max-w-md mx-auto">
        </div>

        <div class="order-details bg-gray-50 rounded-lg p-4 mb-6">
            <p class="text-gray-700 text-lg mb-2"><span class="font-bold text-orange-600">Product Name:</span> ${productName}</p>
            <p class="text-gray-700 text-lg mb-2"><span class="font-bold text-orange-600">Price:</span> ৳${productPrice}</p>
            <p class="text-gray-700 text-lg mb-2"><span class="font-bold text-orange-600">Buyer:</span> ${buyerName}</p>
            <p class="text-gray-700 text-lg"><span class="font-bold text-orange-600">Seller:</span> ${sellerName}</p>
        </div>

        <div class="buttons text-center">
            <a target="_blank" rel="noopener noreferrer" href="${process.env.CLIENT_URL}/dashboard/sales-history" class="confirm-btn">
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