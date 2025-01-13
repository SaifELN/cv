import http.server
import socketserver
import os

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # تحقق من وجود المسار المطلوب
        if self.path in ['/', '/about', '/contact']:
            self.path = 'index.html'
        # إعادة توجيه جميع الطلبات إلى index.html
        elif not os.path.exists(self.path.lstrip('/')):
            self.path = 'index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

PORT = 8000
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()
