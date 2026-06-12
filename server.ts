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

// 1. Request Logging Middleware (Prints details of every incoming request to console log)
app.use((req, res, next) => {
  console.log(`[Backend-Request Log] Time: ${new Date().toISOString()} | Method: ${req.method} | URL: ${req.originalUrl || req.url} | Content-Type: ${req.headers['content-type']}`);
  next();
});

// 2. CORS / Preflight options middleware (Ensures that cross-domain or preflight requests do not return 404 or page HTML)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  if (req.method === "OPTIONS") {
    console.log(`[CORS-Preflight] Handled OPTIONS preflight request for: ${req.originalUrl || req.url}`);
    return res.status(200).end();
  }
  next();
});

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

// Create Consultation Booking Endpoint (POST /api/book-consultation)
app.post("/api/book-consultation", async (req, res) => {
  console.log(`[Backend-Server] Incoming Request - POST /api/book-consultation at ${new Date().toISOString()}`);
  console.log("[Backend-Server] Payload body:", JSON.stringify(req.body, null, 2));

  try {
    const { id, name, email, phone, company, date, time, service, budget, notes } = req.body;

    // 1. Strict Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      console.error("[Backend-Server] Validation failed - Name is missing or invalid");
      return res.status(400).json({ success: false, error: "Failed to process booking" });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      console.error("[Backend-Server] Validation failed - Email is missing or invalid");
      return res.status(400).json({ success: false, error: "Failed to process booking" });
    }
    if (!phone || typeof phone !== "string" || phone.trim() === "") {
      console.error("[Backend-Server] Validation failed - Phone is missing or invalid");
      return res.status(400).json({ success: false, error: "Failed to process booking" });
    }
    if (!date || typeof date !== "string") {
      console.error("[Backend-Server] Validation failed - Date is missing or invalid");
      return res.status(400).json({ success: false, error: "Failed to process booking" });
    }
    if (!time || typeof time !== "string") {
      console.error("[Backend-Server] Validation failed - Time is missing or invalid");
      return res.status(400).json({ success: false, error: "Failed to process booking" });
    }
    if (!service || typeof service !== "string") {
      console.error("[Backend-Server] Validation failed - Service is missing or invalid");
      return res.status(400).json({ success: false, error: "Failed to process booking" });
    }
    if (!budget || typeof budget !== "string") {
      console.error("[Backend-Server] Validation failed - Budget is missing or invalid");
      return res.status(400).json({ success: false, error: "Failed to process booking" });
    }
    if (!notes || typeof notes !== "string") {
      console.error("[Backend-Server] Validation failed - Notes is missing or invalid");
      return res.status(400).json({ success: false, error: "Failed to process booking" });
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
      console.warn(`[Backend-Server] Duplicate booking attempt registered for ${normalizedEmail} on ${date} at ${time}`);
      return res.status(409).json({ 
        success: false, 
        error: "Failed to process booking" 
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
      budget: budget.trim(),
      date,
      time,
      notes: notes.trim(),
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    saveBookings(bookings);

    // 4. Configure Email Client (Resend or SMTP Nodemailer)
    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const emailConfigured = !!(resendApiKey || (smtpUser && smtpPass));
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

    const adminHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e5e5e5; border-radius: 8px; background-color: #ffffff; color: #1a1a1a;">
        <div style="text-align: center; border-bottom: 2px solid #C5A059; padding-bottom: 15px; margin-bottom: 25px;">
          <h2 style="color: #1a1a1a; margin: 0; font-family: Georgia, serif; font-size: 24px;">AAKAR <span style="color: #C5A059; font-style: italic;">Studio</span>.</h2>
          <p style="color: #777777; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">New Consultation Request</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 10px; color: #777777; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 10px; color: #1a1a1a;">${newBooking.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 10px; color: #777777; font-weight: bold;">Email:</td>
            <td style="padding: 10px; color: #1a1a1a;"><a href="mailto:${newBooking.email}" style="color: #C5A059; text-decoration: none;">${newBooking.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 10px; color: #777777; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; color: #1a1a1a;">${newBooking.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 10px; color: #777777; font-weight: bold;">Company:</td>
            <td style="padding: 10px; color: #1a1a1a;">${newBooking.company}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 10px; color: #777777; font-weight: bold;">Project Type:</td>
            <td style="padding: 10px; color: #1a1a1a;"><span style="background-color: #f7f7f7; padding: 4px 8px; border-radius: 4px; font-weight: 500;">${newBooking.service}</span></td>
          </tr>
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 10px; color: #777777; font-weight: bold;">Budget Range:</td>
            <td style="padding: 10px; color: #1a1a1a;">${newBooking.budget}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 10px; color: #777777; font-weight: bold;">Selected Date:</td>
            <td style="padding: 10px; color: #1a1a1a; font-weight: bold;">${newBooking.date}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 10px; color: #777777; font-weight: bold;">Selected Time:</td>
            <td style="padding: 10px; color: #1a1a1a; font-weight: bold;">${newBooking.time}</td>
          </tr>
        </table>
        
        <div style="background-color: #fafafa; border: 1px solid #eaeaea; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
          <h4 style="margin-top: 0; color: #333333; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #eaeaea; padding-bottom: 5px;">Requirements / Notes</h4>
          <p style="font-size: 14px; line-height: 1.6; color: #333333; margin: 5px 0 0 0; white-space: pre-wrap;">${newBooking.notes}</p>
        </div>
        
        <p style="font-size: 11px; color: #999999; text-align: center; margin-top: 30px;">Submitted On: ${timestampStr}</p>
      </div>
    `;

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
    if (resendApiKey) {
      try {
        console.log("Attempting to send email via Resend API...");
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: "AAKAR Studio <onboarding@resend.dev>",
            to: "aakarstudio.digital@gmail.com",
            subject: adminSubject,
            text: adminBodyText,
            html: adminHtml
          })
        });

        if (resendResponse.ok) {
          console.log("Successfully sent notification to admin via Resend.");
          emailStatus = "sent";

          // Send confirmation back to client via Resend
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
              from: "AAKAR Studio <onboarding@resend.dev>",
              to: newBooking.email,
              subject: clientSubject,
              text: clientBodyText,
              html: clientHtml
            })
          });
        } else {
          const resendErrorText = await resendResponse.text();
          console.error("Resend API failed:", resendErrorText);
        }
      } catch (resendErr) {
        console.error("Resend delivery failed, seeking SMTP fallback:", resendErr);
      }
    }

    // Fallback to SMTP Nodemailer if required
    if (emailStatus !== "sent" && smtpUser && smtpPass) {
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
          html: adminHtml
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
    } else if (emailStatus !== "sent") {
      console.warn("SMTP / Resend credentials not established. Completing simulated dispatch.");
    }

    // 7. Success Reply back to client matching criteria format exactly
    return res.status(200).json({ 
      success: true, 
      message: "Booking submitted successfully",
      emailStatus,
      booking: newBooking
    });

  } catch (error) {
    console.error("Booking handler error:", error);
    // Requirement 8: return standard strict error message
    return res.status(500).json({ success: false, error: "Failed to process booking" });
  }
});

// Redirect /api/booking POST fallback for absolute backward compatibility
app.post("/api/booking", async (req, res) => {
  res.redirect(307, "/api/book-consultation");
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

// JSON fallback handler for non-existent API routes
app.all("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `Target API Endpoint "${req.method} ${req.baseUrl || req.originalUrl}" does not exist.`
  });
});

// Global Express error catch-all handler inside the API context
app.use((err: any, req: any, res: any, next: any) => {
  const isApi = (req.originalUrl && req.originalUrl.includes("/api")) || 
                (req.path && req.path.includes("/api")) || 
                (req.url && req.url.includes("/api"));
  if (isApi) {
    console.error("Logged API Error Boundary:", err);
    return res.status(err.status || 500).json({
      success: false,
      error: "Failed to process booking"
    });
  }
  next(err);
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
