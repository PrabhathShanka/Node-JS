//create the server
const http = require("http");
const server = http.createServer((req, resp) => {
  //   console.log("server up and running on port 3000");
  const url = req.url;
  const method = req.method;
  if (url === "/calc") {
    resp.setHeader("Content-Type", "text/html");
    resp.write("<html lang='en'>");
    resp.write("<head><title>My calculator</title></head>");
    resp.write("<body>");
    resp.write(
      "<form method='POST' action='/add'><input type='number' name='num1'> &nbsp <input type='number' name='num2'> &nbsp <button type='submit'>Add</button></form>"
    );
    resp.write("</body>");
    resp.write("</html>");
    resp.end();
  }

  if (url === "/add" && method === "POST") {
    resp.setHeader("Content-Type", "text/html");
    resp.write("<html lang='en'>");
    resp.write("<head><title>My calculator</title></head>");
    resp.write("<body>");
    resp.write("<h1> Done! </h1>");
    resp.write("</body>");
    resp.write("</html>");
    resp.end();
  }
});
server.listen(3000);
