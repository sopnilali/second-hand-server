# 🎉 Welcome to My Stationary Shop !!
<h2>Secondhand Mart Server API</h2>
<p>Assalamu Alaikum! My Name is Md Abdul Adud. Project Name: Secondhand Mart. I am Develop an Express application with TypeScript, integrating MongoDB with Mongoose to manage a Secondhand Mart.</p>

<h2>Project Name: Secondhand Mart</h2>

<strong>GitHub Repository Link</strong> : https://github.com/sopnilali/second-hand-server

 <strong>Live: URL</strong> :h ttps://second-hand-server-two.vercel.app

 <strong>Video Explanation</strong>: https://drive.google.com/file/d/103mRsyOnl-NqT0TGyfVq3vFDQuWqjrNv/view?usp=drive_link

<h2>Technology Used ⚙️</h2>
<li>Node</li>
<li>Express</li>
<li>React</li>
<li>Mongoose</li>
<li>sslcommerz Payment Gateway</li>
<li>TypeScript</li>

# Folder Structure 📂
<p>I organized the project by creating this folder structure. The folders here are product, order and user. All of them are crated in different files, so that they can be controlled and handled very easily.</p>

<pre>
src/
├── modules/
│   ├── admin/
│   │   ├── admin.controller.ts
│   │   ├── admin.router.ts
│   │   ├── admin.service.ts
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.interface.ts
│   │   ├── auth.model.ts
│   │   ├── auth.router.ts
│   │   ├── auth.service.ts
│   │   ├── auth.utils.ts
│   │   ├── auth.validation.ts
│   ├── category/
│   │   ├── category.constant.ts
│   │   ├── category.controller.ts
│   │   ├── category.interface.ts
│   │   ├── category.model.ts
│   │   ├── category.router.ts
│   │   ├── category.service.ts
│   │   ├── category.validation.ts
│   ├── listing/
│   │   ├── listing.constant.ts
│   │   ├── listing.controller.ts
│   │   ├── listing.interface.ts
│   │   ├── listing.model.ts
│   │   ├── listing.router.ts
│   │   ├── listing.service.ts
│   │   ├── listing.validation.ts
│   ├── sslcommerz/
│   │   ├── sslcommerz.service.ts
│   ├── transaction/
│   │   ├── transaction.controller.ts
│   │   ├── transaction.interface.ts
│   │   ├── transaction.model.ts
│   │   ├── transaction.router.ts
│   │   ├── transaction.service.ts
│   │   ├── transaction.utils.ts
│   ├── user/
│   │   ├── user.constant.ts
│   │   ├── user.controller.ts
│   │   ├── user.interface.ts
│   │   ├── user.model.ts
│   │   ├── user.router.ts
│   │   ├── user.service.ts
│   │   ├── user.validation.ts
│   ├── wish/
│   │   ├── wish.controller.ts
│   │   ├── wish.interface.ts
│   │   ├── wish.model.ts
│   │   ├── wish.router.ts
│   │   ├── wish.service.ts
│   │   ├── wish.validation.ts
├── app.ts
├── server.ts
</pre>

# Listings Model 🚟
<p> I created the listings model.</p>
<pre>
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "category",
            required: true
        },
        images: {
            type: [String],
            required: true,
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        status: {                    // Status of the listing
            type: String,
            enum: ['available', 'sold'],
            default: 'available'
        },
</pre>
 
# Transactions Model 🚟
<p> I created the transactions model.</p>
<pre>
    itemID: {
        type: Schema.Types.ObjectId,
        ref: 'listings',
    },
    buyerID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    sellerID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {                    // Status of the listing
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
      },
    transactionId: { type: String, required: true, unique: true },
</pre>

# User Model 👥
<pre>
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: { type: String, required: true, default: "N/A" },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'], // user role admin or user
      default: 'user', // default user role
    },
    isBlocked: {
      type: Boolean,
      default: false,
    }
</pre>

# Wish Model

<pre>
    product: {
        type: Schema.Types.ObjectId,
        ref: 'listings',
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
</pre>

# Features of Listing ⚡
<li>Create Listing</li>
<li>Get All Listing by Search Terms (ex: title, description, price)</li>
<li>Update listing. To update listing, you need to update the listing using listingid.</li>
<li>Delete Listing. To delete listing, you need to delete the listing using listingid.</li>

# Features of Transaction 🕎
<li>Create Transaction from buyer</li>
<li>Get Sales History </li>
<li>Get Buyer History</li>
<li>Sellers can update item status after a sale. </li>

# Features of Wish 🕎
<li>Create Wish from user</li>
<li>Get All Wish</li>
<li>Update Wish. To update Wishs, you need to update the blog using wishid.</li>
<li>Delete Wish. To delete Wishs, you need to delete the blog using wishid.</li>

# Features of Users 👥
<li>Create Users (ex: name, email, phonenumber, role (default role --> user))</li>
<li>Get All Users</li>
<li>Update User route access only admin user. If user role to admin, then show error "Admin role cannot be updated". Because, user can not be access update User Route </li>

# Error Handling ⚠️
<li>I am implement error handling for invalid input, missing data, invalid email and insufficient stock.</li>
<pre>
     "errors": {
            "email": {
                "name": "ValidatorError",
                "message": "sopnilstar is not a valid email type",
                "properties": {
                    "message": "sopnilstar is not a valid email type",
                    "type": "user defined",
                    "path": "email",
                    "value": "sopnilstar"
                },
                "kind": "user defined",
                "path": "email",
                "value": "sopnilstar"
            },
            "quantity": {
                "name": "ValidatorError",
                "message": "Quantity must be a positive number",
                "properties": {
                    "message": "Quantity must be a positive number",
                    "type": "min",
                    "min": 0,
                    "path": "quantity",
                    "value": -50
                },
                "kind": "min",
                "path": "quantity",
                "value": -50
            }
        }
</pre>
<li><strong>Not Found:</strong> If you hit a wrong route, it will send a message and tell you your status, and which route you hit. </li>
<pre>
{
    "success": false,
    "message": "API Not Found /api/v1/transaction",
    "error": "Error: API Not Found /api/v1/transaction\n    at notFound (/var/task/dist/middlewares/notFound.js:10:19)\n
}
</pre>

# Thanks you Sir/Mam 💕




