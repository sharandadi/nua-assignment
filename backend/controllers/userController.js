const axios = require('axios');
const db = require('../db');

// Helper function to pause execution
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Recursive fetch with retry logic (Exactly as requested)
const fetchPageWithRetry = async (url, attempt = 1, maxAttempts = 3) => {
  try {
    const response = await axios.get(url);
    const users = response.data.results || [];
    
    if (users.length > 0) {
      return users; // Success
    }
    
    // Got 0 results, retry
    if (attempt < maxAttempts) {
      console.log(`Got 0 users. Retrying (Attempt ${attempt}/${maxAttempts})...`);
      await sleep(1500);
      return fetchPageWithRetry(url, attempt + 1, maxAttempts); // Recursive retry
    }
    
    return []; // Failed after all attempts
    
  } catch (error) {
    console.error(`Attempt ${attempt} failed: ${error.message}`);
    
    if (attempt < maxAttempts) {
      await sleep(1500);
      return fetchPageWithRetry(url, attempt + 1, maxAttempts); // Recursive retry
    }
    
    return []; // Failed after all attempts
  }
};

// 1. Fetch and Store Users
exports.fetchAndStoreUsers = async (req, res) => {
  try {
    console.log("Fetching.....");
    
    const pages = 50;
    const RESULTS_PER_PAGE = 20;
    
    let fetchedusers = [];

    for (let page = 1; page <= pages; page++) {
      const url = `https://randomuser.me/api/?results=${RESULTS_PER_PAGE}&page=${page}`;
      const userperpage = await fetchPageWithRetry(url);
      
      if(userperpage.length > 0) {
        fetchedusers.push(...userperpage);
        console.log(`Page ${page}: Fetched ${userperpage.length} users.`);
      } else {
        console.error(`Page ${page}: Failed to fetch users after multiple attempts.`);
      }

      // Standard pause between successful pages (Prevent rate limiting)
      await sleep(300); 
    }

    console.log(`Total Fetched: ${fetchedusers.length}`);

    // 3. Prepare for DB
    const values = fetchedusers.map(user => [
      user.login.uuid,                        
      `${user.name.first} ${user.name.last}`, 
      user.email,                             
      user.location.city                      
    ]);

    // 4. Bulk Insert
    let insertedCount = 0;
    if (values.length > 0) {
      const sql = `
        INSERT IGNORE INTO users 
        (uuid, name, email, city) 
        VALUES ?
      `;
      
      const [result] = await db.query(sql, [values]);
      insertedCount = result.affectedRows;
      console.log(`Database Result: ${insertedCount} rows inserted.`);
    } else {
      console.warn("WARNING: No values to insert!");
    }

    res.json({ 
      message: 'Fetch complete', 
      fetchedCount: values.length,
      insertedCount: insertedCount 
    });
    
  } catch (error) {
    console.error('Critical Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

// 2. Get All Users
exports.getAllUsers = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM users");
        res.status(200).json(rows);
    }
    catch(error){
        res.status(500).json({error: error.message});   
    }
};

// 3. Update User (Supports Partial Updates)
exports.updateUser = async (req, res) => {
    const { uuid } = req.params;
    const { name, email, city } = req.body;

    // 1. Validation: Ensure at least one field is sent
    if (!name && !email && !city) {
        return res.status(400).json({ error: 'At least one field (name, email, or city) is required' });
    }

    try {
        // 2. Build Query Dynamically
        let fields = [];
        let values = [];

        if (name) {
            fields.push('name=?');
            values.push(name);
        }
        if (email) {
            fields.push('email=?');
            values.push(email);
        }
        if (city) {
            fields.push('city=?');
            values.push(city);
        }

        // Add UUID last (for the WHERE clause)
        values.push(uuid);

        // Join fields with commas -> "name=?, city=?"
        const sql = `UPDATE users SET ${fields.join(', ')} WHERE uuid=?`;

        const [result] = await db.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};