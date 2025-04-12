// scripts/audit-to-html.js
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("npm-audit.json", "utf-8"));
const advisories = data.vulnerabilities;

let html = `
<html>
<head><title>NPM Audit Report</title></head>
<body>
<h2>NPM Audit Report</h2>
<table border="1" cellpadding="5" cellspacing="0">
<tr><th>Package</th><th>Severity</th><th>Title</th><th>URL</th></tr>
`;

for (const [pkg, vuln] of Object.entries(advisories)) {
  html += `<tr>
    <td>${pkg}</td>
    <td>${vuln.severity}</td>
    <td>${vuln.title}</td>
    <td><a href="${vuln.url}" target="_blank">${vuln.url}</a></td>
  </tr>`;
}

html += "</table></body></html>";

fs.writeFileSync("npm-audit-report.html", html);
console.log("HTML report generated.");
