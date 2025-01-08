import DBRef from '../db.js';

const eclRegisterTable = 'eclRegisters';


 const getUsers = async (req, res) => {
    let queryInput = 'SELECT * FROM users';
    let values = [];
    let response = {}
   try {
    const [result] = await DBRef.query(queryInput,values);
    response = {
        success: true,
        message: 'Users retrieved',
        data: result
    };
    res.status(200).json(response);
   

   } catch (error) {
    response = {
        success: false,
        message: error.message
    };
    res.status(500).json(response);
    
   }
};



const createUser = async (req, res) => {
    let response = {};

    // Extract parameters from the request body
    const { email, name, phone, paymentDone } = req.body;
    const id = req.body.id || uuidv4(); // Generate a unique ID if not provided
    const payment = paymentDone ? 1 : 0; // Convert paymentDone to 1 or 0

    // Validate required fields
    if (!email || !name || !phone) {
        return res.status(200).json({
            success: false,
            message: 'Email, name, and phone are required to create a user',
        });
    }

    // SQL query to insert user data
    const queryInput = `
        INSERT INTO ${eclRegisterTable} (
            id,
            email,
            name,
            phone,
            paymentDone,
            created_at
        ) VALUES (?, ?, ?, ?, ?, NOW())`;

    const values = [id, email, name, phone, payment];

    try {
        console.log('Creating user with email:', email);

        // Execute the query
        const [result] = await DBRef.query(queryInput, values);

        // Respond with success
        response = {
            success: true,
            message: `Congratulations! ${name} You have successfully registered`,
            name: result.insertId || name, // Return the newly created user name
        };
        return res.send(response);

    } catch (error) {
        console.error('Error creating user:', error);

        // Handle specific database errors
        if (error.code === 'ER_DUP_ENTRY') {
            response = {
                success: false,
                message: 'User with this email or phone already exists',
            };
            return res.send(response); // Conflict status code
        }

        // Generic error response
        response = {
            success: false,
            message: 'Failed to create user',
            error: error.message,
        };
        return res.status(500).json(response);
    }
};

const registersList = async (req, res) => {
    let queryInput = 'SELECT * FROM eclRegisters';
    let values = [];
    let response = {}
   try {
    const [result] = await DBRef.query(queryInput,values);
    response = {
        success: true,
        message: 'Users retrieved',
        data: result
    };
    res.send(response);
   

   } catch (error) {
    response = {
        success: false,
        message: error.message
    };
    res.send(response);
    
   }
}







const greetMessage = async (req, res) => {
    let response = {}
    try {
        response = {
            success: true,
            message: 'Welcome to the Express API'
        };
        res.status(200).json(response);
    } catch (error) {
        response = {
            success: false,
            message: error.message
        };
        res.status(500).json(response);
    }
}
export{
    getUsers,
    createUser,
    greetMessage,
    registersList

}


        
