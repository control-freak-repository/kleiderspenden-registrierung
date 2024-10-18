function handleDonationTypeChange() {
    const donationType = document.getElementById('donationType').value;
    const pickupAddressField = document.getElementById('pickupAddress');
  
    if (donationType === 'pickup') {
      pickupAddressField.style.display = 'block'; // Show address fields
    } else {
      pickupAddressField.style.display = 'none'; // Hide address fields
    }
  }
  
  function validateForm() {
    const name = document.getElementById('donorName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const donationType = document.getElementById('donationType').value;
    const clothingType = document.getElementById('clothingType').value;
    const crisisRegion = document.getElementById('crisisRegion').value;
  
    // PLZ comparison
    const businessPLZ = '12345'; // our postal code
    const anonymous = document.getElementById('anonymous').checked;
  
    // the fields should be filled
    if (!email || !phone || !donationType || !clothingType || !crisisRegion) {
      alert('Please fill in all required fields.');
      return false; // Prevent form submission
    }
  
    // If Pickup then address should be filled
    let pickupLocation = '';
    if (donationType === 'pickup') {
      const street = document.getElementById('street').value;
      const houseNumber = document.getElementById('houseNumber').value;
      const plz = document.getElementById('plz').value;
      const city = document.getElementById('city').value;
  
      // are the first two digits the same as our business
      if (!plz.startsWith(businessPLZ.substring(0, 2))) {
        alert('Abholung ist nur möglich, wenn die ersten zwei Zahlen Ihrer Postleitzahl mit unseren übereinstimmen');
        return false;
      }
  
      if (!street || !houseNumber || !plz || !city) {
        alert('Bitte alle Felder ausfüllen');
        return false;
      }
  
      // the pickup location string
      pickupLocation = `${street}, ${houseNumber}, ${plz}, ${city}`;
    }
  
    // Thank you message
    document.getElementById('donationForm').style.display = 'none';
    
    // Confirmation details
    const confirmationDetails = `
      <p><strong>Name</strong> ${anonymous ? "Anonym" : name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefonnummer: </strong> ${phone}</p>
      <p><strong>Typ der Kleidung: </strong> ${clothingType}</p>
      <p><strong>Krisengebiet: </strong> ${crisisRegion}</p>
      <p><strong>Datum:</strong> ${new Date().toLocaleDateString()}</p>
      <p><strong>Uhrzeit:</strong> ${new Date().toLocaleTimeString()}</p>
      ${donationType === 'pickup' ? `
        <p><strong>Ort:</strong> ${pickupLocation}</p>
      ` : '<p><strong>Drop-off Ort:</strong> Our Headquarters</p>'}
    `;
  
    // Display confirmation details
    document.getElementById('confirmationDetails').innerHTML = confirmationDetails;
    document.getElementById('thankYouMessage').style.display = 'block';
  
    return false; 
  }
  