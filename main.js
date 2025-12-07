/* main.js
   Handles:
   - Simulated authentication (hardcoded credential + optional registration)
   - Page protection (redirect to login if not authenticated)
   - Populate rooms & bookings tables with sample data
   - Build donut chart for booking sources (Chart.js)
   - Simple filter for bookings page
   - Rooms page cards + availability
*/

/* ---------- Configuration / Sample Data ---------- */

// Default demo credential (hardcoded)
const DEMO_USER = { username: 'admin', password: '123456' };

// Room data: 30 rooms, 4 types
const roomsData = [
  // Standard (12)
  { id: 101, type: 'Standard', price: 100, occupancy: 2, status: 'Available', image: 'images/standard.jpeg' },
  { id: 102, type: 'Standard', price: 100, occupancy: 2, status: 'Occupied', guest: 'Nurul Farah Hana', image: 'images/standard.jpeg' },
  { id: 103, type: 'Standard', price: 100, occupancy: 2, status: 'Available', image: 'images/standard.jpeg' },
  { id: 104, type: 'Standard', price: 100, occupancy: 2, status: 'Occupied', guest: 'Jia Hao', image: 'images/standard.jpeg' },
  { id: 105, type: 'Standard', price: 100, occupancy: 2, status: 'Available', image: 'images/standard.jpeg' },
  { id: 106, type: 'Standard', price: 100, occupancy: 2, status: 'Available', image: 'images/standard.jpeg' },
  { id: 107, type: 'Standard', price: 100, occupancy: 2, status: 'Occupied', guest: 'Arjun Kumar', image: 'images/standard.jpeg' },
  { id: 108, type: 'Standard', price: 100, occupancy: 2, status: 'Available', image: 'images/standard.jpeg' },
  { id: 109, type: 'Standard', price: 100, occupancy: 2, status: 'Available', image: 'images/standard.jpeg' },
  { id: 110, type: 'Standard', price: 100, occupancy: 2, status: 'Occupied', guest: 'Aina Sofea', image: 'images/standard.jpeg' },  
  { id: 111, type: 'Standard', price: 100, occupancy: 2, status: 'Available', image: 'images/standard.jpeg' },
  { id: 112, type: 'Standard', price: 100, occupancy: 2, status: 'Available', image: 'images/standard.jpeg' },

  // Deluxe (8)
  { id: 201, type: 'Deluxe', price: 150, occupancy: 2, status: 'Available', image: 'images/deluxe.jpeg' },
  { id: 202, type: 'Deluxe', price: 150, occupancy: 2, status: 'Occupied', guest: 'Adam Faris', image: 'images/deluxe.jpeg' },
  { id: 203, type: 'Deluxe', price: 150, occupancy: 2, status: 'Available', image: 'images/deluxe.jpeg' },
  { id: 204, type: 'Deluxe', price: 150, occupancy: 2, status: 'Available', image: 'images/deluxe.jpeg' },
  { id: 205, type: 'Deluxe', price: 150, occupancy: 2, status: 'Occupied', guest: 'Ai Lin', image: 'images/deluxe.jpeg' },
  { id: 206, type: 'Deluxe', price: 150, occupancy: 2, status: 'Available', image: 'images/deluxe.jpeg' },
  { id: 207, type: 'Deluxe', price: 150, occupancy: 2, status: 'Occupied', guest: 'Ravi Anand', image: 'images/deluxe.jpeg' },
  { id: 208, type: 'Deluxe', price: 150, occupancy: 2, status: 'Available', image: 'images/deluxe.jpeg' },

  // Suite (5)
  { id: 301, type: 'Suite', price: 200, occupancy: 4, status: 'Available', image: 'images/suite.jpeg' },
  { id: 302, type: 'Suite', price: 200, occupancy: 4, status: 'Occupied', guest: 'Xiu Ying', image: 'images/suite.jpeg' },
  { id: 303, type: 'Suite', price: 200, occupancy: 4, status: 'Available', image: 'images/suite.jpeg' },
  { id: 304, type: 'Suite', price: 200, occupancy: 4, status: 'Occupied', guest: 'Wei Jun', image: 'images/suite.jpeg' },
  { id: 305, type: 'Suite', price: 200, occupancy: 4, status: 'Available', image: 'images/suite.jpeg' },

  // Family (5)
  { id: 401, type: 'Family', price: 250, occupancy: 5, status: 'Available', image: 'images/family.jpeg' },
  { id: 402, type: 'Family', price: 250, occupancy: 5, status: 'Occupied', guest: 'Muhammad Danial', image: 'images/family.jpeg' },
  { id: 403, type: 'Family', price: 250, occupancy: 5, status: 'Available', image: 'images/family.jpeg' },
  { id: 404, type: 'Family', price: 250, occupancy: 5, status: 'Occupied', guest: 'Sanya Meera', image: 'images/family.jpeg' },
  { id: 405, type: 'Family', price: 250, occupancy: 5, status: 'Available', image: 'images/family.jpeg' }
];


const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD

const bookingsData = [
  // Standard Rooms (12)
  { guest: 'Nurul Farah Hana', room: 'Standard (102)', source: 'Website Direct', checkin: today, checkout: '2025-12-12', status: 'Checked-in' },
  { guest: 'Jia Hao', room: 'Standard (104)', source: 'Booking.com', checkin: '2025-11-28', checkout: today, status: 'Checked-out' },
  { guest: 'Arjun Kumar', room: 'Standard (107)', source: 'Walk-in', checkin: '2025-12-08', checkout: '2025-12-15', status: 'Reserved' },
  { guest: 'Aina Sofea', room: 'Standard (110)', source: 'Travel Agent', checkin: today, checkout: '2025-12-11', status: 'Checked-in' },

  // Deluxe Rooms (8)
  { guest: 'Adam Faris', room: 'Deluxe (202)', source: 'Website Direct', checkin: '2025-11-30', checkout: today, status: 'Checked-out' },
  { guest: 'Ai Lin', room: 'Deluxe (205)', source: 'Booking.com', checkin: today, checkout: '2025-12-04', status: 'Checked-in' },
  { guest: 'Ravi Anand', room: 'Deluxe (207)', source: 'Walk-in', checkin: '2025-12-02', checkout: '2025-12-06', status: 'Reserved' },

  // Suite Rooms (5)
  { guest: 'Xiu Ying', room: 'Suite (302)', source: 'Mobile App', checkin: today, checkout: '2025-12-05', status: 'Checked-in' },
  { guest: 'Wei Jun', room: 'Suite (304)', source: 'Website Direct', checkin: '2025-12-01', checkout: '2025-12-03', status: 'Reserved' },

  // Family Rooms (5)
  { guest: 'Muhammad Danial', room: 'Family (402)', source: 'Travel Agent', checkin: '2025-11-29', checkout: today, status: 'Checked-out' },
  { guest: 'Sanya Meera', room: 'Family (404)', source: 'Walk-in', checkin: today, checkout: '2025-12-06', status: 'Checked-in' }
];

// Booking source categories
const bookingSources = ['Website Direct', 'Mobile App', 'Walk-in', 'Travel Agent', 'Booking.com'];

/* ---------- Utility / Auth ---------- */

function saveRegisteredUser(username, password) {
  localStorage.setItem('registeredUser', JSON.stringify({ username, password }));
}

function getRegisteredUser() {
  const raw = localStorage.getItem('registeredUser');
  return raw ? JSON.parse(raw) : null;
}

function isAuthenticated() {
  return sessionStorage.getItem('hotel_logged_in') === 'true';
}

function requireAuth() {
  const protectedPages = ['dashboard.html', 'room.html', 'bookings.html'];
  const current = window.location.pathname.split('/').pop();
  if (protectedPages.includes(current) && !isAuthenticated()) {
    window.location.href = 'index.html';
  }
}

/* ---------- Login / Register ---------- */

function setupAuthForms() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // Auto-fill admin credentials when on login page
if (loginForm) {
    document.getElementById('username').value = DEMO_USER.username;
    document.getElementById('password').value = DEMO_USER.password;
}
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const registered = getRegisteredUser();
      const valid =
        (username === DEMO_USER.username && password === DEMO_USER.password) ||
        (registered && username === registered.username && password === registered.password);
      if (!valid) {
        const err = document.getElementById('loginError');
        err.style.display = 'block';
        err.textContent = 'Invalid username or password';
      } else {
        sessionStorage.setItem('hotel_logged_in', 'true');
        window.location.href = 'dashboard.html';
      }
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const username = document.getElementById('regUser').value.trim();
      const password = document.getElementById('regPass').value.trim();
      if (!name || !username || !password) {
        document.getElementById('registerError').style.display = 'block';
        document.getElementById('registerError').textContent = 'All fields are required.';
        return;
      }
      saveRegisteredUser(username, password);
      document.getElementById('registerSuccess').style.display = 'block';
      document.getElementById('registerSuccess').textContent = 'Registration successful. You can now login.';
      document.getElementById('registerError').style.display = 'none';
    });
  }
}

/* ---------- Logout ---------- */

function setupLogoutButtons() {
  const logoutBtns = document.querySelectorAll('#logoutBtn, #logoutBtn2, #logoutBtn3');
  logoutBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        sessionStorage.removeItem('hotel_logged_in');
        window.location.href = 'index.html';
      });
    }
  });
}

/* ---------- Rooms Table ---------- */

function populateRoomsTable() {
  const table = document.querySelector('#roomsTable tbody');
  if (!table) return;
  table.innerHTML = '';
  roomsData.forEach((r, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${r.type} (${r.id})</td>
      <td>RM ${r.price.toFixed(2)}</td>
      <td>${r.occupancy}</td>
      <td><span class="badge ${statusBadgeClass(r.status)} badge-status">${r.status}</span></td>
    `;
    table.appendChild(tr);
  });
}

/* ---------- Rooms Page Cards ---------- */

function populateRoomCards() {
  const roomTypes = ["Standard", "Deluxe", "Suite", "Family"];
  roomTypes.forEach(type => {
    const container = document.getElementById(type.toLowerCase() + 'CardContainer');
    if (!container) return;
    const filtered = roomsData.filter(r => r.type === type);
    const availableCount = filtered.filter(r => r.status === 'Available').length;
    const tableBody = container.querySelector('tbody');
    if (tableBody) {
      tableBody.innerHTML = '';
      filtered.forEach((r, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${r.id}</td>
          <td>${r.status}</td>
          <td>${r.guest ? r.guest : '-'}</td>
        `;
        tableBody.appendChild(tr);
      });
    }
    const availSpan = document.getElementById(type.toLowerCase() + 'Availability');
    if (availSpan) availSpan.textContent = availableCount;
  });
}

/* ---------- Bookings Table ---------- */

function populateBookingsTable() {
  const table = document.querySelector('#bookingsTable tbody');
  const recent = document.querySelector('#recentBookingsTable tbody');
  if (table) {
    table.innerHTML = '';
    bookingsData.forEach((b, idx) => {
      const room = roomsData.find(r => r.id === b.roomId);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${b.guest}</td>
        <td>${room ? `${room.type} (${room.id})` : b.room}</td>
        <td>${b.source}</td>
        <td>${b.checkin}</td>
        <td>${b.checkout}</td>
        <td><span class="badge ${statusBadgeClass(b.status)} badge-status">${b.status}</span></td>
      `;
      table.appendChild(tr);
    });
  }

  if (recent) {
    recent.innerHTML = '';
    bookingsData.slice(0,4).forEach(b => {
      const room = roomsData.find(r => r.id === b.roomId);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${b.guest}</td>
        <td>${room ? `${room.type} (${room.id})` : b.room}</td>
        <td>${b.checkin}</td>
        <td>${b.checkout}</td>
        <td><span class="badge ${statusBadgeClass(b.status)} badge-status">${b.status}</span></td>
      `;
      recent.appendChild(tr);
    });
  }
}

/* ---------- Dashboard ---------- */

function populateDashboard() {
  const totalRooms = roomsData.length;
  const availableRooms = roomsData.filter(r => r.status === 'Available').length;
  const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD
  const todayBookings = bookingsData.filter(b => b.checkin === today || b.checkout === today).length;

  // Monthly revenue: sum of nights * price
  let revenue = 0;
  bookingsData.forEach(b => {
    // Match room by room name
    const room = roomsData.find(r => b.room.includes(r.id));
    if (!room) return; // skip if not found
    const checkin = new Date(b.checkin);
    const checkout = new Date(b.checkout);
    const nights = Math.max(1, Math.round((checkout - checkin) / (1000*60*60*24)));
    revenue += room.price * nights;
  });

  document.getElementById('totalRooms').textContent = totalRooms;
  document.getElementById('availableRooms').textContent = availableRooms;
  document.getElementById('todayBookings').textContent = todayBookings;
  document.getElementById('monthlyRevenue').textContent = 'RM ' + revenue.toFixed(2);
}

/* ---------- Chart: Booking Source Donut ---------- */

function renderBookingSourceChart() {
  const canvas = document.getElementById('bookingSourceChart');
  if (!canvas) return;

  const sources = {};
  bookingsData.forEach(b => {
    sources[b.source] = (sources[b.source] || 0) + 1;
  });

  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: Object.keys(sources),
      datasets: [{
        label: 'Booking Sources',
        data: Object.values(sources)
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } }
    }
  });
}

/* ---------- Chart: Room Occupancy Bar ---------- */

function renderRoomOccupancyChart() {
  const canvas = document.getElementById('roomChart');
  if (!canvas) return;

  const types = ["Standard","Deluxe","Suite","Family"];
  const occupancyCounts = types.map(t => roomsData.filter(r => r.type === t && r.status === 'Occupied').length);

  new Chart(canvas, {
  type: 'bar',
  data: {
    labels: types,
    datasets: [{
      label: 'Rooms Occupied',
      data: occupancyCounts,
      backgroundColor: ['#36A2EB','#FFCE56','#4BC0C0','#FF6384']
    }]
  },
  options: { 
    scales: { y: { beginAtZero:true, stepSize: 1 } },
    plugins: { legend: { display: false } } // <--- disable legend
  }
});
}

/* ---------- Helpers ---------- */

function statusBadgeClass(status) {
  const s = status.toLowerCase();
  if (s.includes('occupied') || s.includes('checked-in')) return 'status-occupied';
  if (s.includes('available') || s.includes('reserved')) return 'status-available';
  if (s.includes('maintenance') || s.includes('checked-out')) return 'status-maintenance';
  return 'status-info';
}

/* ---------- Bookings Filter ---------- */

function setupFilter() {
  const filterInput = document.getElementById('filterInput');
  if (!filterInput) return;

  filterInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const tbody = document.querySelector('#bookingsTable tbody');
    if (!tbody) return;

    Array.from(tbody.rows).forEach(row => {
      const guest = row.cells[1].textContent.toLowerCase();
      const room = row.cells[2].textContent.toLowerCase();
      row.style.display = (guest.includes(query) || room.includes(query)) ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Make sure this runs after the table is populated
  setupFilter();
});


/* ---------- Demo Add Room ---------- */

document.addEventListener('click', (ev) => {
  if (ev.target && ev.target.id === 'addRoomBtn') {
    const nextId = 200 + roomsData.length + 1;
    roomsData.push({ id: nextId, type: 'Standard', price: 220, occupancy: 2, status: 'Available', image: 'images/standard.jpeg' });
    populateRoomsTable();
    populateRoomCards();
    alert('Added a demo room. (This is only in-memory for demo purposes)');
  }
});

/* ---------- Tooltip Init ---------- */

document.addEventListener('DOMContentLoaded', () => {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(t => new bootstrap.Tooltip(t));

  // Initialize all pages
  requireAuth();
  setupAuthForms();
  setupLogoutButtons();
  populateRoomsTable();
  populateRoomsCards();
  populateBookingsTable();
  populateDashboard();
  setupFilter();
  renderBookingSourceChart();
  renderRoomOccupancyChart();
  populateRoomsCards();
  populateBookingStats();
});

/* ---------- Rooms Page: Populate Cards & Collapsible Tables ---------- */
function populateRoomsCards() {
  const types = ['Standard', 'Deluxe', 'Suite', 'Family'];

  types.forEach(type => {
    // Count available rooms of this type
    const availableCount = roomsData.filter(r => r.type === type && r.status.toLowerCase() === 'available').length;
    const availabilityEl = document.getElementById(`${type.toLowerCase()}Availability`);
    if (availabilityEl) availabilityEl.textContent = availableCount;

    // Populate collapsible table
    const tableBody = document.getElementById(`${type.toLowerCase()}RoomsTable`);
    if (!tableBody) return;
    tableBody.innerHTML = '';

    roomsData
      .filter(r => r.type === type)
      .forEach((r, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${r.id}</td>
          <td><span class="badge ${statusBadgeClass(r.status)}">${r.status}</span></td>
          <td>${r.guest ? r.guest : '-'}</td>
        `;
        tableBody.appendChild(tr);
      });
  });
}

// Call this on DOMContentLoaded for rooms page
document.addEventListener('DOMContentLoaded', () => {
  populateBookingStats();
});

function populateBookingStats() {
  const today = new Date().toISOString().slice(0, 10);

  const totalBookings = bookingsData.length;
  const checkinsToday = bookingsData.filter(b => b.checkin === today).length;
  const checkoutsToday = bookingsData.filter(b => b.checkout === today).length;
  const reservedBookings = bookingsData.filter(b => b.status.toLowerCase() === 'reserved').length;

  document.getElementById('totalBookings').textContent = totalBookings;
  document.getElementById('checkinsToday').textContent = checkinsToday;
  document.getElementById('checkoutsToday').textContent = checkoutsToday;
  document.getElementById('reservedBookings').textContent = reservedBookings;
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const monthlyCounts = Array(12).fill(0);

// Count bookings per month
bookingsData.forEach(b => {
  const date = new Date(b.checkin); // or checkout if you want
  const monthIndex = date.getMonth(); // 0 = Jan
  monthlyCounts[monthIndex]++;
});

// Render the chart
const canvas = document.getElementById('monthlyBookingChart'); // match HTML
if (canvas) {
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: months,       // all 12 months
      datasets: [{
        label: 'Bookings per Month',
        data: monthlyCounts,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#000000',   // <-- make the dots black
      pointBorderColor: '#000000',       // <-- black border for dots
      pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: { 
        legend: { display: false }, // disables legend
        tooltip: {
          titleColor: '#fff',
          bodyColor: '#fff',
          backgroundColor: 'rgba(0,0,0,0.7)' // optional for contrast
        }
      },
      scales: {
        x: { 
          ticks: { color: '#000000ff' },
          grid: { color: 'rgba(255,255,255,0.2)' }
        },
        y: { 
          beginAtZero: true,
          stepSize: 1,
          ticks: { color: '#000000ff' },
          grid: { color: 'rgba(255,255,255,0.2)' }
        }
      }
    }
  });
}
