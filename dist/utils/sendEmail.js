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
    yield transporter.sendMail({
        from: 'sopnilstar@gmail.com', // sender address
        to: sellerEmail, // list of receivers
        subject: "No Replay: Your Order Confirmation ✅",
        html: emailHTML, // html body
    });
});
exports.sendMail = sendMail;
