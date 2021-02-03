//proceso principal
const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("./database");

let window;
function createWindow()  {
window = new BrowserWindow ({
width:800,
height:600,
  webPreferences: {
    nodeIntegration: true
  }

})
  window.loadFile("src/ui/index.html");
}


const createClient= async (client) => {
  try {
    const conn = await getConnection();

    const result = await conn.query("INSERT INTO client SET ?", client);


    // Notify the User
    new Notification({
      title: "Gym DaviForce",
      body: "New Client Saved Successfully",
    }).show();

    // Return the created Client
    return client;
  } catch (error) {
    console.log(error);
  }
};
const getClients = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM client");
  return results;
};

const deleteClient= async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM client WHERE id = ?", id);
  return result;
};

module.exports = {
  createWindow,
  createClient, 
  
  getClients,
  deleteClient,


};

