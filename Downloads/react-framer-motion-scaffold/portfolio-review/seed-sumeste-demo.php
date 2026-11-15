<?php
// Isolated screenshot database only; no production records or credentials.
$db = new mysqli('127.0.0.1', 'root', '', 'portfolio_demo', 3307);
$db->query('CREATE TABLE IF NOT EXISTS tbl_settings (id INT PRIMARY KEY)');
$db->query('CREATE TABLE IF NOT EXISTS tbl_hero_images (id INT PRIMARY KEY AUTO_INCREMENT, filename VARCHAR(255), sort_order INT DEFAULT 0)');
$db->query("CREATE TABLE IF NOT EXISTS tbl_admin_permissions (accID VARCHAR(255) PRIMARY KEY, permissions_csv TEXT, status VARCHAR(30), granted_by VARCHAR(255), full_name VARCHAR(255), position VARCHAR(100), created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, confirmed_at DATETIME NULL)");
$password = password_hash(getenv('PORTFOLIO_DEMO_PASSWORD'), PASSWORD_DEFAULT);
foreach (['admin' => 'Administrator', 'resident' => 'Resident', 'non-resident' => 'Visitor'] as $role => $name) {
  $id = 'portfolio-demo-' . $role;
  $email = $role . '@example.com';
  $stmt = $db->prepare('INSERT INTO tbl_useracc (accID,email,password,account_role) VALUES (?,?,?,?)');
  $stmt->bind_param('ssss', $id,$email,$password,$role); $stmt->execute();
  $stmt = $db->prepare("INSERT INTO tbl_userinfo (accID,account_role_csv,firstname,lastname,email,userStatus) VALUES (?,?,'Demo',?,?,'approved')");
  $stmt->bind_param('ssss', $id,$role,$name,$email); $stmt->execute();
}
echo "Three demonstration accounts created in the isolated database.\n";
