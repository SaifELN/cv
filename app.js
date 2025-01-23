// Define routes
const routes = {
  '#/': 'pages/home.html',        // Default route
  '#/home': 'pages/home.html',
  '#/about': 'pages/about.html',
  '#/contact': 'pages/contact.html',
};

// Function to load content
async function loadContent(route) {
  const contentPath = routes[route] || 'pages/404.html'; // Fallback for unknown routes
  try {
    const response = await fetch(contentPath);
    if (!response.ok) throw new Error('Page not found');
    const content = await response.text();
    document.getElementById('app').innerHTML = content;
  } catch (error) {
    document.getElementById('app').innerHTML = '<h1>404 - Page Not Found</h1>';
  }
}

// Handle navigation
function handleNavigation(event) {
  event.preventDefault(); // Prevent default link behavior
  const path = event.target.getAttribute('href'); // Get the href attribute
  window.location.hash = path; // Update the URL hash
  loadContent(path); // Load the content
}

// Event listener for hash changes
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  loadContent(hash);
});

// Add event listeners to all navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', handleNavigation);
});

// Initial load
window.addEventListener('load', () => {
  const hash = window.location.hash || '#/'; // Default to home
  loadContent(hash);
});
