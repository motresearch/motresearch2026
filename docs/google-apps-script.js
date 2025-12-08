// Google Apps Script - Deploy as Web App
// This script receives form data and saves it to Google Sheets and sends confirmation email

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Log received data
    Logger.log('Received data: ' + JSON.stringify(data));
    
    // Replace with your Google Sheet ID
    const SHEET_ID = '1ySDbBD7NsV5qQfLCQGwGE_6pj6Gh73sCYMD9tRvdEyA';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Add headers if first row is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Type', 'Name', 'Gender', 'Organization', 'Phone', 'Email']);
    }
    
    // Append the form data
    sheet.appendRow([
      new Date(),
      data.type || '',
      data.name || '',
      data.gender || '',
      data.organization || '',
      data.phone || '',
      data.email || ''
    ]);
    
    Logger.log('Data saved to sheet');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (optional - for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'API is working'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// For Google Forms: Send email when form is submitted directly to Google Sheets
// Set up a trigger: Triggers > Add Trigger > sendEmailOnSubmit > From spreadsheet > On form submit
function sendEmailOnSubmit(e) {
  try {
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get the last row with data
    var lastRow = sheet.getLastRow();
    
    Logger.log('Processing row: ' + lastRow);
    
    // Extract data from the sheet (adjust column numbers if needed)
    var timestamp = sheet.getRange(lastRow, 1).getValue();     // Column A
    var type = sheet.getRange(lastRow, 2).getValue();          // Column B
    var name = sheet.getRange(lastRow, 3).getValue();          // Column C
    var gender = sheet.getRange(lastRow, 4).getValue();        // Column D
    var organization = sheet.getRange(lastRow, 5).getValue();  // Column E
    var phone = sheet.getRange(lastRow, 6).getValue();         // Column F
    var email = sheet.getRange(lastRow, 7).getValue();         // Column G
    
    Logger.log('Name: ' + name + ', Email: ' + email);
    
    // Subject line
    var subject = "ការចុះឈ្មោះជោគជ័យ - Registration Successful";
    
    // HTML message body with clickable links + icons + phone number
    var htmlMessage = "<p>Hello " + name + ",</p>" +
                  "<p style='color:green; font-weight:bold;'>✅ ការចុះឈ្មោះជោគជ័យ - Successful Registration!</p>" +
                  "<p>Thank you for registering for the Competition Research. Your data has been received and recorded successfully.</p>" +
                  "<p>Here's a copy of your submission:<br>" +
                  "---------------------------------<br>" +
                  "Type: " + type + "<br>" +
                  "Name: " + name + "<br>" +
                  "Gender: " + gender + "<br>" +
                  "Organization: " + organization + "<br>" +
                  "Phone: " + phone + "<br>" +
                  "Email: " + email + "<br>" +
                  "---------------------------------</p>" +
                  "<p>More Information:<br>" +
                  "🔹 <img src='https://cdn-icons-png.flaticon.com/512/2111/2111646.png' width='12' height='12'> " +
                  "<a href='https://t.me/motresearchcompetiton'>Telegram Channel</a><br>" +
                  "🔹 <img src='https://cdn-icons-png.flaticon.com/512/733/733547.png' width='12' height='12'> " +
                  "<a href='https://www.facebook.com/share/1Bh4GkZFYR/'>Facebook Page</a><br>" +
                  "🔹 <img src='https://cdn-icons-png.flaticon.com/512/724/724664.png' width='12' height='12'> " +
                  "<a href='tel:095676763'>095676763</a></p>" +
                  "<p>We appreciate your interest in the Competition Research and will respond within 24-48 hours.</p>" +
                  "<p>Regards,<br>Ministry Of Tourism<br>Admin Team</p>";
    
    // Send email if email is not empty
    if (email && email.toString().trim() !== '') {
      Logger.log('Attempting to send email to: ' + email);
      
      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: htmlMessage
      });
      
      Logger.log('Email sent successfully to: ' + email);
    } else {
      Logger.log('Email is empty or invalid');
    }
    
  } catch (error) {
    Logger.log('Error in sendEmailOnSubmit: ' + error.toString());
  }
}
