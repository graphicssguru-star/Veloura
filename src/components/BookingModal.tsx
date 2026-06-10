import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Sparkles, 
  DollarSign, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Video,
  Check,
  MessageSquare,
  Mail
} from 'lucide-react';
import { whatsappLink } from '../App';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Booking {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  notes: string;
  createdAt: string;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState<'book' | 'my-bookings'>('book');
  
  // Form States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('Branding & Identity');
  const [selectedBudget, setSelectedBudget] = useState<string>('$5,000 - $15,000');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  
  // Calendar Navigate States
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Bookings list state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  // Load existing bookings
  useEffect(() => {
    const stored = localStorage.getItem('aakar_bookings');
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calendar construction helper
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysCount };
  };

  const { firstDay, daysCount } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    const today = new Date();
    // Allow booking up to 3 months in advance
    const limitDate = new Date(today.getFullYear(), today.getMonth() + 3, 1);
    if (currentMonth < limitDate) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    }
  };

  const selectDateHandler = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (clickedDate >= today) {
      setSelectedDate(clickedDate);
      setSelectedTime(''); // Reset time selection on new date
    }
  };

  const timeSlots = [
    "09:30 AM",
    "11:00 AM",
    "01:30 PM",
    "03:00 PM",
    "04:30 PM",
    "06:00 PM"
  ];

  const handleNextStep = () => {
    if (step === 1 && (!selectedDate || !selectedTime)) return;
    if (step === 2 && !selectedService) return;
    if (step === 3 && (!name || !email)) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleFinishBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !email) return;

    const formattedDate = selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const newBooking: Booking = {
      id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
      date: formattedDate,
      time: selectedTime,
      name,
      email,
      company: company || 'N/A',
      service: selectedService,
      budget: selectedBudget,
      notes: notes || 'No extra notes provided.',
      createdAt: new Date().toLocaleDateString(),
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('aakar_bookings', JSON.stringify(updatedBookings));
    setLatestBooking(newBooking);

    // Generate and trigger prefilled mailto draft to aakarstudio.digital@gmail.com
    const mailtoSubject = encodeURIComponent(`New Consultation Booking - ${newBooking.id} (${newBooking.name})`);
    const mailtoBody = encodeURIComponent(
`Hello AAKAR Studio,

I have scheduled a creative consultation through your website portal.

Here are my project and booking details:
-------------------------------------------
- Booking ID: ${newBooking.id}
- Preferred Date: ${newBooking.date}
- Preferred Time Slot: ${newBooking.time}

My Service Focus:
- Service Required: ${newBooking.service}
- Estimated Budget Range: ${newBooking.budget}

My Contact & Project Info:
- Name: ${newBooking.name}
- Business Email: ${newBooking.email}
- Brand / Company Name: ${newBooking.company}

Additional Objectives & Scope Notes:
${newBooking.notes}
-------------------------------------------

Looking forward to our session!`
    );

    const mailtoUrl = `mailto:aakarstudio.digital@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Automatically attempts to open native/web email client safely and reliably
    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_self';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to trigger mail client automatically:", err);
      window.location.href = mailtoUrl;
    }

    setStep(4); // Advance to elegant success state
  };

  const handleDeleteBooking = (id: string) => {
    const filtered = bookings.filter(b => b.id !== id);
    setBookings(filtered);
    localStorage.setItem('aakar_bookings', JSON.stringify(filtered));
  };

  const resetFormAndContinue = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime('');
    setName('');
    setEmail('');
    setCompany('');
    setNotes('');
    setLatestBooking(null);
  };

  // Generate calendar grid days
  const calendarDays = [];
  // Empty paddings
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
  }
  // Days of month
  const todayDate = new Date();
  todayDate.setHours(0,0,0,0);

  for (let d = 1; d <= daysCount; d++) {
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    const isPast = dateToCheck < todayDate;
    const isSelected = selectedDate && 
      selectedDate.getDate() === d && 
      selectedDate.getMonth() === currentMonth.getMonth() && 
      selectedDate.getFullYear() === currentMonth.getFullYear();

    calendarDays.push(
      <button
        key={`day-${d}`}
        type="button"
        disabled={isPast}
        onClick={() => selectDateHandler(d)}
        className={`h-10 w-10 mx-auto rounded-full text-xs font-medium flex items-center justify-center transition-all cursor-pointer border-none
          ${isPast ? 'text-brand-muted/30 cursor-not-allowed bg-transparent' : ''}
          ${!isPast && !isSelected ? 'text-brand-ink bg-transparent hover:bg-brand-accent/10 hover:text-brand-accent' : ''}
          ${isSelected ? 'bg-brand-accent text-white shadow-md font-bold' : ''}
        `}
      >
        {d}
      </button>
    );
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      {/* Absolute overlay backing (backdrop-blur-sm for high-end aesthetic) */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      {/* Main Container Wrapper */}
      <div className="relative bg-brand-paper w-full max-w-4xl min-h-[640px] shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row md:rounded-xl border border-brand-ink/10 select-none">
        
        {/* Left Informative Column (Visual Theme Sidebar) */}
        <div className="md:w-1/3 bg-brand-ink text-brand-paper p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle design accent patterns */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C5A059_2px,transparent_2px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10">
            <span className="font-serif text-xl font-bold tracking-tighter block mb-1">
              AAKAR<span className="text-brand-accent">.</span> STUDIO
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-brand-muted block font-mono">
              Creative Strategy Unit
            </span>

            <div className="mt-16 space-y-6">
              <h3 className="text-2xl md:text-3xl font-light font-serif italic text-brand-accent leading-tight">
                Let's scope your next breakthrough.
              </h3>
              <p className="text-xs text-brand-paper/50 font-light leading-relaxed">
                Connect deeply with AAKAR Studio. Choose a tailored slot to share your vision, examine objectives, and orchestrate immediate execution guidelines.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-4 pt-10 border-t border-brand-paper/10">
            <div className="flex items-center gap-3 text-xs text-brand-paper/60 font-light">
              <div className="w-6 h-6 flex items-center justify-center border border-brand-paper/10 rounded-full text-brand-accent text-[10px] font-mono">
                <Video size={12} />
              </div>
              <span>Google Meet / Zoom Session</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-brand-paper/60 font-light">
              <div className="w-6 h-6 flex items-center justify-center border border-brand-paper/10 rounded-full text-brand-accent text-[10px] font-mono">
                30
              </div>
              <span>30-minute immersive strategy check</span>
            </div>
          </div>
        </div>

        {/* Right Active Interactive Area (Stepper Container) */}
        <div className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-brand-paper relative">
          
          {/* Header Controls */}
          <div className="flex justify-between items-center pb-4 border-b border-brand-ink/5 mb-6">
            <div className="flex gap-4">
              <button
                id="tab-book-call"
                onClick={() => { setActiveTab('book'); resetFormAndContinue(); }}
                className={`text-[11px] uppercase tracking-wider font-semibold cursor-pointer pb-2 border-b bg-transparent transition-all border-none
                  ${activeTab === 'book' ? 'text-brand-ink border-brand-accent font-bold' : 'text-brand-muted opacity-60 border-transparent'}
                `}
              >
                Schedule Consultation
              </button>
              <button
                id="tab-my-bookings"
                onClick={() => { setActiveTab('my-bookings'); setStep(5); }}
                className={`text-[11px] uppercase tracking-wider font-semibold cursor-pointer pb-2 border-b bg-transparent transition-all border-none relative
                  ${activeTab === 'my-bookings' ? 'text-brand-ink border-brand-accent font-bold' : 'text-brand-muted opacity-60 border-transparent'}
                `}
              >
                My Consultations
                {bookings.length > 0 && (
                  <span className="absolute -top-1 -right-4 w-4 h-4 bg-brand-accent text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                    {bookings.length}
                  </span>
                )}
              </button>
            </div>

            <button 
              id="btn-close-booking"
              onClick={onClose} 
              className="p-1 hover:bg-brand-ink/5 rounded-full text-brand-ink transition-colors cursor-pointer border-none bg-transparent"
            >
              <X size={20} />
            </button>
          </div>

          {/* Stepper Content rendering based on state */}
          <div className="flex-1 flex flex-col justify-center">
            
            {activeTab === 'book' && (
              <>
                {/* 1. DATE & TIME STEP */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-mono text-brand-accent block mb-1">STEP 1 OF 3</span>
                      <h4 className="text-xl md:text-2xl font-light text-brand-ink">Select Date & Time</h4>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left Side: Interactive Custom Calendar */}
                      <div className="p-4 border border-brand-ink/5 bg-[#FDFCF7]/60 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-semibold font-serif text-brand-ink">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                          </span>
                          <div className="flex gap-2">
                            <button 
                              type="button" 
                              onClick={prevMonth} 
                              className="p-1 hover:bg-brand-ink/5 rounded text-brand-ink border-none bg-transparent cursor-pointer"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button 
                              type="button" 
                              onClick={nextMonth} 
                              className="p-1 hover:bg-brand-ink/5 rounded text-brand-ink border-none bg-transparent cursor-pointer"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Calendar Day Titles */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                            <div key={day} className="text-[10px] uppercase font-bold text-brand-muted font-mono">{day}</div>
                          ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {calendarDays}
                        </div>
                      </div>

                      {/* Right Side: Radio Time Slots Selection */}
                      <div className="space-y-4">
                        <span className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block">
                          {selectedDate ? `${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })} Slots` : 'Select a date first'}
                        </span>

                        {selectedDate ? (
                          <div className="grid grid-cols-2 gap-3">
                            {timeSlots.map((time) => {
                              const isSelected = selectedTime === time;
                              return (
                                <button
                                  type="button"
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`p-3 border text-xs font-semibold uppercase tracking-widest text-center transition-all cursor-pointer rounded
                                    ${isSelected 
                                      ? 'bg-brand-accent text-white border-brand-accent shadow-md' 
                                      : 'bg-white text-brand-muted border-brand-ink/10 hover:border-brand-accent'
                                    }
                                  `}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="h-44 border border-dashed border-brand-ink/10 flex flex-col items-center justify-center text-center p-4 rounded bg-[#FDFCF7]">
                            <CalendarIcon size={24} className="text-brand-accent/40 mb-2 animate-bounce" />
                            <p className="text-xs text-brand-muted max-w-[200px]">
                              Select an upcoming date on the left to reveal dynamic timeslots.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-brand-ink/5 flex justify-end">
                      <button
                        id="btn-step1-next"
                        disabled={!selectedDate || !selectedTime}
                        onClick={handleNextStep}
                        className={`px-6 py-3 text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all rounded shadow border-none cursor-pointer
                          ${(selectedDate && selectedTime) 
                            ? 'bg-brand-ink text-brand-paper hover:bg-brand-accent' 
                            : 'bg-brand-muted/10 text-brand-muted/40 cursor-not-allowed'
                          }
                        `}
                      >
                        <span>Next Step</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2. SERVICES & BUDGET SELECTION */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-mono text-brand-accent block mb-1">STEP 2 OF 3</span>
                      <h4 className="text-xl md:text-2xl font-light text-brand-ink">Project Focus & scope</h4>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <span className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block">Primary Service Required</span>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Branding & Identity",
                            "UI/UX Design",
                            "Website Development",
                            "Digital Strategy",
                            "Creative Direction",
                            "Marketing Communication"
                          ].map(service => {
                            const isSelected = selectedService === service;
                            return (
                              <button
                                type="button"
                                key={service}
                                onClick={() => setSelectedService(service)}
                                className={`p-3 border text-[11px] font-semibold text-left transition-all cursor-pointer rounded flex items-center justify-between
                                  ${isSelected 
                                    ? 'bg-brand-accent/5 text-brand-accent border-brand-accent' 
                                    : 'bg-white text-brand-muted border-brand-ink/10 hover:border-brand-accent'
                                  }
                                `}
                              >
                                <span>{service}</span>
                                {isSelected && <Check size={12} className="text-brand-accent flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block">Estimated Launch Budget range</span>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            "Under $5k",
                            "$5k - $15k",
                            "$15k - $30k",
                            "$30k+"
                          ].map(budget => {
                            const isSelected = selectedBudget === budget;
                            return (
                              <button
                                type="button"
                                key={budget}
                                onClick={() => setSelectedBudget(budget)}
                                className={`p-3 border text-xs font-semibold text-center transition-all cursor-pointer rounded
                                  ${isSelected 
                                    ? 'bg-brand-ink text-brand-paper border-brand-ink shadow-md font-bold' 
                                    : 'bg-white text-brand-muted border-brand-ink/10 hover:border-brand-accent'
                                  }
                                `}
                              >
                                {budget}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-brand-ink/5 flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-6 py-3 text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-brand-ink/5 transition-all text-brand-ink rounded border-none bg-transparent cursor-pointer"
                      >
                        <ArrowLeft size={14} />
                        <span>Previous</span>
                      </button>
                      <button
                        id="btn-step2-next"
                        onClick={handleNextStep}
                        className="px-6 py-3 bg-brand-ink text-brand-paper hover:bg-brand-accent text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all rounded shadow border-none cursor-pointer"
                      >
                        <span>Confirm Info</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 3. CONTACT INFO */}
                {step === 3 && (
                  <form onSubmit={handleFinishBooking} className="space-y-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-mono text-brand-accent block mb-1">STEP 3 OF 3</span>
                      <h4 className="text-xl md:text-2xl font-light text-brand-ink">Brief Overview & Details</h4>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5Col">
                        <label className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block">Your Name *</label>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Aaditi Malhotra"
                          className="w-full px-4 py-3 bg-white border border-brand-ink/10 rounded focus:border-brand-accent focus:outline-none text-sm text-brand-ink placeholder:text-brand-muted/40 font-light"
                        />
                      </div>

                      <div className="space-y-1.5Col">
                        <label className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block">Business Email *</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="aaditi@vegdelivery.com"
                          className="w-full px-4 py-3 bg-white border border-brand-ink/10 rounded focus:border-brand-accent focus:outline-none text-sm text-brand-ink placeholder:text-brand-muted/40 font-light"
                        />
                      </div>

                      <div className="space-y-1.5Col md:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block">Brand / Company Name (Optional)</label>
                        <input 
                          type="text" 
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Aaditi Veg Delight Group"
                          className="w-full px-4 py-3 bg-white border border-brand-ink/10 rounded focus:border-brand-accent focus:outline-none text-sm text-brand-ink placeholder:text-brand-muted/40 font-light"
                        />
                      </div>

                      <div className="space-y-1.5Col md:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block">Tell Us About Your Objectives & Scope</label>
                        <textarea 
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Launch a high conversion restaurant website and establish a premium brand strategy to scale foot traffic across retail sectors..."
                          className="w-full px-4 py-3 bg-white border border-brand-ink/10 rounded focus:border-brand-accent focus:outline-none text-sm text-brand-ink placeholder:text-brand-muted/40 font-light resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-brand-ink/5 flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-6 py-3 text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-brand-ink/5 transition-all text-brand-ink rounded border-none bg-transparent cursor-pointer"
                      >
                        <ArrowLeft size={14} />
                        <span>Previous</span>
                      </button>
                      
                      <button
                        id="btn-submit-booking"
                        type="submit"
                        className="px-8 py-3 bg-brand-accent text-white hover:bg-brand-ink hover:text-brand-paper text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all rounded shadow-lg border-none cursor-pointer"
                      >
                        <span>Schedule Call</span>
                        <Sparkles size={14} />
                      </button>
                    </div>
                  </form>
                )}

                {/* 4. SUCCESS STATE (Ticket / Receipt layout) */}
                {step === 4 && latestBooking && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center"
                  >
                    <div className="max-w-md mx-auto bg-white border border-brand-ink/10 p-6 rounded-lg relative overflow-hidden shadow-xl text-left border-t-4 border-t-brand-accent">
                      {/* Ticket top decorative notch */}
                      <div className="absolute top-0 left-12 w-8 h-4 bg-brand-paper rounded-b-full px-4 border border-brand-ink/10 border-t-0"></div>
                      
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                            <CheckCircle size={20} />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-accent">CONFIRMED APPOINTMENT</span>
                            <h4 className="text-lg font-serif font-semibold text-brand-ink">{latestBooking.id}</h4>
                          </div>
                        </div>

                        <div className="space-y-2 border-t border-b border-brand-ink/10 py-4 font-mono text-[11px] uppercase text-brand-muted">
                          <div className="flex justify-between">
                            <span>Client Name:</span>
                            <span className="text-brand-ink font-bold">{latestBooking.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Email:</span>
                            <span className="text-brand-ink font-bold lowercase">{latestBooking.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Focus Area:</span>
                            <span className="text-brand-ink font-bold">{latestBooking.service}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Budget Scope:</span>
                            <span className="text-brand-accent font-bold">{latestBooking.budget}</span>
                          </div>
                          <div className="flex justify-between border-t border-brand-ink/5 pt-2">
                            <span>Date:</span>
                            <span className="text-brand-ink font-bold">{latestBooking.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time Slot:</span>
                            <span className="text-brand-ink font-bold">{latestBooking.time}</span>
                          </div>
                        </div>

                        <div className="bg-brand-accent/[0.03] p-4 text-xs font-light text-brand-muted rounded border-l-2 border-brand-accent mb-3">
                          <span className="font-semibold text-brand-ink block mb-1">📨 Email Dispatch:</span>
                          We have formulated an email draft with your booking specifications destined for <strong className="font-semibold text-[#C5A059]">aakarstudio.digital@gmail.com</strong>. Please check and send the draft that was triggered. If it did not open automatically, click <strong>Email Details</strong> below.
                        </div>

                        <div className="bg-brand-ink/[0.02] p-4 text-xs font-light text-brand-muted rounded border-l-2 border-brand-ink/40">
                          <span className="font-semibold text-brand-ink block mb-1">💡 Preparation Tip:</span>
                          Please prepare some current visual references, budget outlines, or mood boards to share directly in our meeting. You will receive a calendar invite from AAKAR Studio shortly.
                        </div>

                        <div className="pt-4 border-t border-brand-ink/5 mt-4 text-center">
                          <div className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-muted mb-2">Prefer instant messaging or email?</div>
                          <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <a 
                              href={whatsappLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#25D366] hover:text-[#128C7E] transition-colors bg-[#25D366]/5 hover:bg-[#25D366]/10 px-4 py-2.5 rounded border border-[#25D366]/20 cursor-pointer decoration-none"
                            >
                              <MessageSquare size={14} />
                              <span>WhatsApp Us</span>
                            </a>
                            <a 
                              href={`mailto:aakarstudio.digital@gmail.com?subject=${encodeURIComponent(`New Consultation Booking - ${latestBooking.id} (${latestBooking.name})`)}&body=${encodeURIComponent(
`Hello AAKAR Studio,

I have scheduled a creative consultation through your website portal.

Here are my project and booking details:
-------------------------------------------
- Booking ID: ${latestBooking.id}
- Preferred Date: ${latestBooking.date}
- Preferred Time Slot: ${latestBooking.time}

My Service Focus:
- Service Required: ${latestBooking.service}
- Estimated Budget Range: ${latestBooking.budget}

My Contact & Project Info:
- Name: ${latestBooking.name}
- Business Email: ${latestBooking.email}
- Brand / Company Name: ${latestBooking.company}

Additional Objectives & Scope Notes:
${latestBooking.notes}
-------------------------------------------

Looking forward to our session!`
                              )}`}
                              className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#C5A059] hover:text-[#AA843D] transition-colors bg-[#C5A059]/5 hover:bg-[#C5A059]/10 px-4 py-2.5 rounded border border-[#C5A059]/20 cursor-pointer decoration-none"
                            >
                              <Mail size={14} />
                              <span>Email Details</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-center gap-4">
                      <button
                        type="button"
                        onClick={resetFormAndContinue}
                        className="px-6 py-3 border border-brand-ink/10 text-xs uppercase tracking-widest font-bold hover:bg-brand-ink/5 transition-all rounded bg-transparent cursor-pointer"
                      >
                        Book Another
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 bg-brand-ink text-brand-paper hover:bg-brand-accent text-xs uppercase tracking-widest font-bold transition-all rounded shadow border-none cursor-pointer"
                      >
                        Close Portal
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* 5. "MY BOOKINGS" VIEW PORTAL */}
            {activeTab === 'my-bookings' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-brand-accent block mb-1">CLIENT PORTAL</span>
                  <h4 className="text-xl md:text-2xl font-light text-brand-ink">Your Consultations</h4>
                </div>

                {bookings.length > 0 ? (
                  <div className="max-h-[380px] overflow-y-auto space-y-4 pr-2">
                    {bookings.map((bk) => (
                      <div 
                        key={bk.id}
                        className="p-5 border border-brand-ink/10 bg-white hover:border-brand-accent/40 rounded-lg group transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs uppercase font-mono tracking-widest text-brand-accent font-bold">
                              {bk.id}
                            </span>
                            <span className="text-[10px] uppercase px-2 py-0.5 bg-brand-ink/5 text-brand-muted font-mono rounded">
                              {bk.service}
                            </span>
                          </div>
                          <h5 className="text-base font-serif font-medium text-brand-ink">
                            {bk.date} at <span className="font-sans text-brand-accent font-semibold">{bk.time}</span>
                          </h5>
                          <p className="text-xs text-brand-muted font-light">
                            Registered to <strong className="font-medium">{bk.name}</strong> ({bk.email})
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteBooking(bk.id)}
                          className="p-2 bg-transparent text-brand-muted hover:text-red-500 hover:bg-red-50 transition-colors border-none cursor-pointer rounded"
                          title="Cancel Call Booking"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4 border border-dashed border-brand-ink/10 bg-[#FDFCF7]/60 rounded-lg">
                    <Clock size={36} className="text-brand-accent/30 mx-auto mb-4" />
                    <h5 className="text-lg font-serif mb-2">No Active Bookings</h5>
                    <p className="text-xs text-brand-muted font-light max-w-sm mx-auto leading-relaxed">
                      You haven’t scheduled any active consultations yet. Toggle above to "Schedule Consultation" to book an live design scope session.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-brand-ink/5 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-brand-ink text-brand-paper hover:bg-brand-accent text-xs uppercase tracking-widest font-bold transition-all rounded shadow border-none cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
