async function navigate(path) {
    let content;
    switch (path) {
        case '/':
            content = (await import('./home.js')).default;
            app.innerHTML = content;
            break;
        case '/about':
            content = (await import('./about.js')).default;
            app.innerHTML = content;
            break;
        case '/contact':
            content = (await import('./contact.js')).default;
            app.innerHTML = content;
            break;
        default:
            app.innerHTML = '<h1>404</h1><p>الصفحة غير موجودة.</p>';
            break;
    }
}

const app = document.getElementById('app');

window.addEventListener('popstate', () => {
    navigate(window.location.pathname);
});

document.body.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        window.history.pushState({}, '', path);
        navigate(path);
    }
});

navigate(window.location.pathname);
