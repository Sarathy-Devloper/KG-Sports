const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function main() {
  console.log('Generating password hashes...');
  const pass123 = await hashPassword('password123');
  const pass456 = await hashPassword('password456');
  const pass789 = await hashPassword('password789');

  console.log('\nHashed Passwords:');
  console.log(`'password123' hash: ${pass123}`);
  console.log(`'password456' hash: ${pass456}`);
  console.log(`'password789' hash: ${pass789}`);
  console.log('\nCopy these into your SQL INSERT statements.');
}

main();