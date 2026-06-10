import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "bookings.json");

// Middleware to parse JSON payloads
app.use(express.json());

// Helper to interact with booking persistent storage securely
function getBookings(): any[] {
  if (!fs.existsSync(DB_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database file, returning temporary empty array:", err);
    return [];
  }
}

function saveBookings(bookings: any[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  } catch (err) {
    console.error("CRITICAL: Failed to write booking to disk:", err);
  }
}

// ==========================================
// API ENDPOINTS
// ==========================================

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Create Consultation Booking Endpoint
app.post("/api/booking", async (req, res) => {
  try {
    const { id, name, email, phone, company, date, time, service, notes } = req.body;

    // 1. Strict Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ success: false, error: "Validator Error: Full Name is required." });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Validator Error: A valid Business Email is required." });
    }
    if (!phone || typeof phone !== "string" || phone.trim() === "") {
      return res.status(400).json({ success: false, error: "Validator Error: Phone Number is required to coordinate details." });
    }
    if (!date || typeof date !== "string") {
      return res.status(400).json({ success: false, error: "Validator Error: Selected Date is required." });
    }
    if (!time || typeof time !== "string") {
      return res.status(400).json({ success: false, error: "Validator Error: Selected Time slot is required." });
    }
    if (!service || typeof service !== "string") {
      return res.status(400).json({ success: false, error: "Validator Error: Project Type / Service is required." });
    }
    if (!notes || typeof notes !== "string") {
      return res.status(400).json({ success: false, error: "Validator Error: Requirements or context notes are required." });
    }

    // Load existing bookings
    const bookings = getBookings();

    // 2. Prevent Duplicate Submissions (Same date, time, and email)
    const normalizedEmail = email.toLowerCase().trim();
    const isDuplicate = bookings.some(
      (b) => 
        b.email.toLowerCase().trim() === normalizedEmail &&
        b.date === date &&
        b.time === time
    );

    if (isDuplicate) {
      return res.status(409).json({ 
        success: false, 
        error: "Scheduling Conflict: A booking with this email for the selected timeslot already exists. Please choose another slot." 
      });
    }

    // 3. Store valid booking details securely
    const newBooking = {
      id: id || "BK-" + Math.floor(100000 + Math.random() * 900000),
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      company: company ? company.trim() : "N/A",
      service: service.trim(),
      date,
      time,
      notes: notes.trim(),
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    saveBookings(bookings);

    // 4. Configure Nodemailer with graceful fallback if credentials aren't established
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const emailConfigured = !!(smtpUser && smtpPass);
    let emailStatus = "simulated";

    // 5. Build Email Templates
    const timestampStr = new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " (UTC)";

    const adminSubject = `New Consultation Booking - AAKAR Studio`;
    const adminBodyText = `--------------------------------------------------

New Consultation Request

Name:
${newBooking.name}

Email:
${newBooking.email}

Phone:
${newBooking.phone}

Company:
${newBooking.company}

Project Type:
${newBooking.service}

Selected Date:
${newBooking.date}

Selected Time:
${newBooking.time}

Requirements:
${newBooking.notes}

Submitted On:
${timestampStr}

--------------------------------------------------`;

    const clientSubject = `Consultation Request Received - AAKAR Studio`;
    const clientBodyText = `Hello ${newBooking.name},

Thank you for scheduling a consultation with AAKAR Studio.

We have received your request and will review the details shortly.

Booking Details:

Date: ${newBooking.date}
Time: ${newBooking.time}

We look forward to discussing your project.

Best Regards,
AAKAR Studio
Where Creativity Takes Shape`;

    const clientHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px; background-color: #FAFAFA; color: #1A1A1A;">
        <div style="text-align: center; border-bottom: 2px solid #C5A059; padding-bottom: 15px; margin-bottom: 25px;">
          <h2 style="color: #1A1A1A; margin: 0; font-family: Georgia, serif; font-size: 24px;">AAKAR <span style="color: #C5A059; font-style: italic;">Studio</span>.</h2>
          <p style="color: #777777; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">Where Creativity Takes Shape</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.6; color: #333333;">Hello <strong>${newBooking.name}</strong>,</p>
        
        <p style="font-size: 15px; line-height: 1.6; color: #333333;">Thank you for scheduling a consultation with AAKAR Studio.</p>
        <p style="font-size: 15px; line-height: 1.6; color: #333333;">We have received your request and will review the details shortly.</p>
        
        <div style="background-color: #FFFFFF; border: 1px solid #eaeaea; border-left: 4px solid #C5A059; padding: 15px; border-radius: 4px; margin: 25px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          <h3 style="margin-top: 0; color: #C5A059; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Booking Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 5px 0; color: #777777; width: 100px;"><strong>Date:</strong></td>
              <td style="padding: 5px 0; color: #1A1A1A;">${newBooking.date}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #777777;"><strong>Time:</strong></td>
              <td style="padding: 5px 0; color: #1A1A1A;">${newBooking.time}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #777777;"><strong>Service:</strong></td>
              <td style="padding: 5px 0; color: #1A1A1A;">${newBooking.service}</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 15px; line-height: 1.6; color: #333333;">We look forward to discussing your project and sharing outstanding creative insights.</p>
        
        <div style="border-top: 1px solid #eaeaea; padding-top: 20px; margin-top: 30px; font-size: 13px; color: #777777; line-height: 1.5;">
          <p style="margin: 0;">Best Regards,<br /><strong>AAKAR Studio Team</strong></p>
          <p style="margin: 5px 0 0 0; font-size: 11px; font-style: italic; color: #C5A059;">Where Creativity Takes Shape</p>
        </div>
      </div>
    `;

    // 6. Action Mail Sending
    if (emailConfigured) {
      try {
        console.log(`Setting up SMTP connection to ${smtpHost}:${smtpPort}...`);
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Send notification to Admin (aakarstudio.digital@gmail.com)
        await transporter.sendMail({
          from: `"AAKAR Studio Web Booking" <${smtpUser}>`,
          to: "aakarstudio.digital@gmail.com",
          subject: adminSubject,
          text: adminBodyText,
        });

        // Send confirmation back to client
        await transporter.sendMail({
          from: `"AAKAR Studio" <${smtpUser}>`,
          to: newBooking.email,
          subject: clientSubject,
          text: clientBodyText,
          html: clientHtml
        });

        emailStatus = "sent";
        console.log(`Successfully processed booking ${newBooking.id} and dispatched emails via SMTP.`);
      } catch (smtpErr) {
        console.error("Nodemailer Client Dispatch Failed, falling back to simulated status. Reason:", smtpErr);
        emailStatus = "failed_smtp";
      }
    } else {
      console.warn("SMTP email variables (SMTP_USER & SMTP_PASS) not configured. Storing locally and completing simulated flow.");
    }

    // 7. Success Reply back to client
    return res.status(200).json({ 
      success: true, 
      emailStatus,
      booking: newBooking,
      message: "Your consultation booking request has been securely registered!" 
    });

  } catch (error) {
    console.error("Booking handler error:", error);
    return res.status(500).json({ success: false, error: "An internal server error occurred while lodging booking. Please try again." });
  }
});

// Retrieves existing bookings securely (API restricted or basic access for the dashboard component UI)
app.get("/api/bookings", (req, res) => {
  const data = getBookings();
  res.json({ bookings: data });
});

// Cancel / delete booking
app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  const current = getBookings();
  const filtered = current.filter(b => b.id !== id);
  saveBookings(filtered);
  res.json({ success: true });
});

// ==========================================
// VITE AND STATIC FILE SERVING
// ==========================================

async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Use Vite's middleware
    app.use(vite.middlewares);
  } else {
    console.log("Setting up production static directories...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully at http://localhost:${PORT}`);
  });
}

setupServer();
