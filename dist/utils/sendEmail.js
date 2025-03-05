"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ image, productName, productPrice, buyerName, sellerName, sellerEmail }) {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service: 'gmail',
        secure: config_1.default.node_env === 'production',
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
            color: #ff8e00;
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
            color: #ff8e00;
        }
        .buttons {
            text-align: center;
            margin-top: 20px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 5px;
            font-size: 16px;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
      .confirm-btn {
background: linear-gradient(to right, blue, green); /* Gradient background */
padding: 10px 30px;
border-radius: 8px;
color: #fff;
font-weight: bold;
text-decoration: none;
transition: all 0.3s ease;
}

.confirm-btn:hover {
background: linear-gradient(to right, #3d04c2, #59e209); /* Hover gradient */
cursor: pointer; /* Optional: Change cursor to pointer on hover */
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
    yield transporter.sendMail({
        from: 'sopnilstar@gmail.com', // sender address
        to: sellerEmail, // list of receivers
        subject: "Order Confirmation ✅",
        html: emailHTML, // html body
    });
});
exports.sendMail = sendMail;
