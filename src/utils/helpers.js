export const formatPhoneNumber = (phoneNumber) => {
    // Format the phone number
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  };
  