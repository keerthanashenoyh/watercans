const extractUserDetails = (message) => {
    const nameMatch = message.match(/Name:\s*([^\n]+)/i);
    const mobileMatch = message.match(/Mobile:\s*(\d{10,15})/i);
    const addressMatch = message.match(/Address:\s*([^\n]+)/i);
  
    return {
      name: nameMatch ? nameMatch[1].trim() : null,
      mobile: mobileMatch ? mobileMatch[1].trim() : null,
      address: addressMatch ? addressMatch[1].trim() : null
    };
  };
  
  module.exports = extractUserDetails;
  