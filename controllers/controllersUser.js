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
    const { email, name, phone, paymentDone,role } = req.body;
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
            rigestered_as,
            created_at
        ) VALUES (?, ?, ?, ?, ?,?, NOW())`;

    const values = [id, email, name, phone, payment,role];

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
    let response = {};
    try {
        // Get page and limit from query parameters with default values
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page

        // Calculate offset
        const offset = (page - 1) * limit;

        // Query with pagination
        const queryInput = 'SELECT * FROM eclRegisters LIMIT ? OFFSET ?';
        const values = [limit, offset];

        const [result] = await DBRef.query(queryInput, values);

        // Query to get the total count of users
        const [countResult] = await DBRef.query('SELECT COUNT(*) AS total FROM eclRegisters');
        const totalUsers = countResult[0].total;

        response = {
            success: true,
            message: 'Users retrieved',
            data: result,
            pagination: {
                totalUsers,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                limit,
            },
        };

        res.send(response);
    } catch (error) {
        response = {
            success: false,
            message: error.message,
        };
        res.send(response);
    }
};


const localData = async (req,res) => {
    var response = {}
    try{
        response = {
            message:'success',
            data:data
        }
        res.status(200).json(response)
        
    }catch(error){
        response = {
            message:'failur',
            data:"somthing wrong"
        }
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
    registersList,
    localData

}


        
